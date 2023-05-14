import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../Middlewares/UserMiddleware';

const userRouter = Router();

userRouter.get('/', UserMiddleware.ValidateUser, UserController.userLogin);

export default userRouter;
