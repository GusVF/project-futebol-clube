import { Request, Response } from 'express';
import UserService from '../Services/UserService';

async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await UserService.userLogin(email, password);
  if (typeof token !== 'string') return res.status(401).json(token);
  return res.status(200).json({ token });
}

export default {
  userLogin,
};
