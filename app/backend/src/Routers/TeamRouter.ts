import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamRouter = Router();

teamRouter.get('/', TeamsController.findAll);

export default teamRouter;
