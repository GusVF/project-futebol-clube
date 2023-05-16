import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();

matchRouter.get('/', MatchController.findAllMatches);

export default matchRouter;
