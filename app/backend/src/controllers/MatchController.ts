import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

async function findMatches(req: Request, res: Response) {
  const { inProgress } = req.query;
  if (typeof inProgress === 'string') {
    const inProgressMatches = await MatchService.allInProgress(inProgress);
    return res.status(200).json(inProgressMatches);
  }
  const allMatches = await MatchService.findAllMatches();
  return res.status(200).json(allMatches);
}

export default {
  findMatches,
};
