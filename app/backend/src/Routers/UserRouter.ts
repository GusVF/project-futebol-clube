import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../Middlewares/UserMiddleware';

const userRouter = Router();

userRouter.post(
  '/',
  (req, res, next) => UserMiddleware
    .ValidateUser(req, res, next),

  (req, res) => UserController.userLogin(req, res),
);

export default userRouter;
