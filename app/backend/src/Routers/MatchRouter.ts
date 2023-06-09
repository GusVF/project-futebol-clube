import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenMiddleware from '../Middlewares/TokenMiddleware';

const matchRouter = Router();

matchRouter.get('/', MatchController.findMatches);

matchRouter.post(
  '/',
  (req, res, next) => TokenMiddleware(req, res, next),
  (req, res) => MatchController.createNewMatch(req, res),
);

matchRouter.patch(
  '/:id/finish',
  (req, res, next) => TokenMiddleware(req, res, next),
  (req, res) => MatchController.finishMatch(req, res),
);
matchRouter.patch(
  '/:id',
  (req, res, next) => TokenMiddleware(req, res, next),
  (req, res) => MatchController.updateMatchScore(req, res),
);

export default matchRouter;
