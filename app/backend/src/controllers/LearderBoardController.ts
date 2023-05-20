import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';

async function getAllHomeStats(_req: Request, res: Response) {
  const matchStats = await LeaderBoardService.sortAllStats('home');
  return res.status(200).json(matchStats);
}

async function getAllAwayStats(_req: Request, res: Response) {
  const matchStats = await LeaderBoardService.sortAllStats('away');
  return res.status(200).json(matchStats);
}

async function getAllTeams(_req: Request, res: Response) {
  const homeTeams = await LeaderBoardService.sortAllStats('home');
  const awayTeams = await LeaderBoardService.sortAllStats('away');
  const allTeams = await LeaderBoardService.allTeamsStats([...homeTeams, ...awayTeams]);
  return res.status(200).json(allTeams);
}

export default {
  getAllHomeStats,
  getAllAwayStats,
  getAllTeams,
};
