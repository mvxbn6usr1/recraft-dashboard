import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AppError } from './error.middleware';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from header
    const token = extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      throw new AppError(401, 'Authentication required');
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload.sub) {
      throw new AppError(401, 'Invalid token');
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, 'Authentication required');
    }

    // TODO: Implement role-based authorization when roles are added to the user model
    next();
  }; 