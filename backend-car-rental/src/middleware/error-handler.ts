import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔴 Uncaught error:', err);

  res.status(500).json({
    message: 'Something went wrong',
    error: process.env.NODE_ENV === 'development' ? (err.message || err) : undefined,
  });
};