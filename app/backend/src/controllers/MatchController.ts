import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

async function findAllMatches(_req: Request, res: Response) {
  const allMatches = await MatchService.findAllMatches();
  return res.status(200).json(allMatches);
}

export default {
  findAllMatches,
};
