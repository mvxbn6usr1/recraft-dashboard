import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors,
    });
  }

  // Log unexpected errors
  console.error('Unexpected error:', err);

  // Don't leak error details in production
  const message = env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  res.status(500).json({
    status: 'error',
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new AppError(404, `Route ${req.originalUrl} not found`);
  next(err);
}; 