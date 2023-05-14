import { NextFunction, Request, Response } from 'express';
// import ValidationError from '../errors/ValidationError';
// import UserService from '../Services/UserService';

export default class UserMiddleware {
  public static ValidateUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid e-mail' });
    }
    if (password < 6) {
      res.status(400).json({ message: 'Invalid password' });
    }
    next();
  }
}
