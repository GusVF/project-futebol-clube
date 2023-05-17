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

async function finishMatch(req: Request, res: Response) {
  // const { authorization } = req.headers;
  const { id } = req.params;
  // if (!authorization) {
  //   return res.status(401).json({ message: 'Token not found' });
  // }

  // if (!id) {
  //   return res.status(401).json({ message: 'Id not found' });
  // }

  const result = await MatchService.finishMatch(Number(id));

  return res.status(200).json(result);
}

async function updateMatchScore(req: Request, res: Response) {
  const { id } = req.params;
  const { awayTeamGoals, homeTeamGoals } = req.body;
  const result = await MatchService.updateMatchScore(Number(id), awayTeamGoals, homeTeamGoals);
  if (!result) {
    return res.status(401).json(result);
  }
  return res.status(200).json(result);
}

async function createNewMatch(req: Request, res: Response) {
  const newMatch = await MatchService.createNewMatch(req.body);

  return res.status(201).json(newMatch);
}

export default {
  findMatches,
  finishMatch,
  updateMatchScore,
  createNewMatch,
};
