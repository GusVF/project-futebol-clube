import { NextFunction, Request, Response } from 'express';
// import ValidationError from '../errors/ValidationError';
// import UserService from '../Services/UserService';

export default class UserMiddleware {
  public static ValidateUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
