import { Router } from 'express';
import LearderBoardController from '../controllers/LearderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => LearderBoardController.getAllHomeStats(req, res));

leaderBoardRouter.get('/away', (req, res) => LearderBoardController.getAllAwayStats(req, res));

leaderBoardRouter.get('/', (req, res) => LearderBoardController.getAllTeams(req, res));

export default leaderBoardRouter;
