import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../Middlewares/UserMiddleware';
import TokenMiddleware from '../Middlewares/TokenMiddleware';

const userRouter = Router();

userRouter.post(
  '/',
  (req, res, next) => UserMiddleware
    .ValidateUser(req, res, next),

  (req, res) => UserController.userLogin(req, res),
);
userRouter.get(
  '/',
  (req, res, next) => TokenMiddleware(req, res, next),

  (req, res) => UserController.userRole(req, res),
);

export default userRouter;
