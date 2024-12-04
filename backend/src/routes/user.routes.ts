import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../index.js';
import { AppError } from '../middleware/error.middleware.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { hashPassword, comparePasswords } from '../utils/auth.js';

const router = Router();

// Validation schemas
const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
  }),
});

const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(8),
  }),
});

// Get current user profile
router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
router.patch(
  '/me',
  authenticate,
  validateRequest(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body;

      // Check if email is taken
      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser && existingUser.id !== req.user!.id) {
          throw new AppError(400, 'Email already in use');
        }
      }

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          name,
          email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Update password
router.patch(
  '/me/password',
  authenticate,
  validateRequest(updatePasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
      });

      if (!user) {
        throw new AppError(404, 'User not found');
      }

      // Verify current password
      const isPasswordValid = await comparePasswords(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        throw new AppError(401, 'Current password is incorrect');
      }

      // Update password
      const hashedPassword = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { password: hashedPassword },
      });

      res.json({
        status: 'success',
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete account
router.delete('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.user.delete({
      where: { id: req.user!.id },
    });

    res.json({
      status: 'success',
      message: 'Account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router; 