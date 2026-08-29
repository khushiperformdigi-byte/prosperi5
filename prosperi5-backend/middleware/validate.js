import { ZodError } from 'zod';
import { AppError } from '../utils/errors.js';

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError('Validation failed', 400, error.flatten().fieldErrors)
        );
      }
      return next(error);
    }
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.validatedQuery = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError('Invalid query parameters', 400, error.flatten().fieldErrors)
        );
      }
      return next(error);
    }
  };
}
