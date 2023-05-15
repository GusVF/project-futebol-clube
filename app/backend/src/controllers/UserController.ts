import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { Authenticate } from '../Middlewares/TokenMiddleware';

async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await UserService.userLogin(email, password);
  if (typeof token !== 'string') return res.status(401).json(token);
  return res.status(200).json({ token });
}

async function userRole(req: Request, res: Response) {
  const { email } = (req as Authenticate).authorization;
  const role = await UserService.userRole(email);
  if (typeof role !== 'string') {
    return res.status(404).json(role);
  }
  return res.status(200).json({ role });
}

export default {
  userLogin,
  userRole,
};
