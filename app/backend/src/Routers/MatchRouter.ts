import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenMiddleware from '../Middlewares/TokenMiddleware';

const matchRouter = Router();

matchRouter.get('/', MatchController.findMatches);

matchRouter.patch(
  '/:id/finish',
  (req, res, next) => TokenMiddleware(req, res, next),
  (req, res) => MatchController.finishMatch(req, res),
);

export default matchRouter;
