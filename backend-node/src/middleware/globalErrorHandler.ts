import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const globalErrorHandler = (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message,
    errorStack: process.env.NODE_ENV === 'development' ? err.stack : '',
  });
};

export default globalErrorHandler;
