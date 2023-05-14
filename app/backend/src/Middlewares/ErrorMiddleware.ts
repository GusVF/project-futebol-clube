import { NextFunction, Request, Response } from 'express';
import ValidationError from '../errors/ValidationError';

export default class ErrorMiddleware {
  static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    console.log(error);
    res.status(500).end();
  }
}
