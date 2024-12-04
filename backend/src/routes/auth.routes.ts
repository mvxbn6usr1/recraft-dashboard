import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../index';
import { AppError } from '../middleware/error.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { hashPassword, comparePasswords, generateToken } from '../utils/auth';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

// Register new user
router.post(
  '/register',
  validateRequest(registerSchema),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AppError(400, 'User already exists');
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
        },
      });

      // Generate token
      const token = generateToken(user.id);

      res.status(201).json({
        status: 'success',
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Login user
router.post(
  '/login',
  validateRequest(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await comparePasswords(password, user.password);
      if (!isPasswordValid) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Generate token
      const token = generateToken(user.id);

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        status: 'success',
        data: {
          user: userWithoutPassword,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Request password reset
router.post(
  '/reset-password',
  validateRequest(resetPasswordSchema),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        // Return success even if user doesn't exist for security
        return res.json({
          status: 'success',
          message: 'If your email is registered, you will receive a reset link',
        });
      }

      // TODO: Implement actual password reset email sending
      // For now, just return success message
      res.json({
        status: 'success',
        message: 'If your email is registered, you will receive a reset link',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router; 