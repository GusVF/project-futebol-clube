import { Router } from 'express';
import LearderBoardController from '../controllers/LearderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => LearderBoardController.getAllStats(req, res));

export default leaderBoardRouter;
