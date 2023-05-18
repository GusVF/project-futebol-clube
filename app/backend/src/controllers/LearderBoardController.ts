import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';

async function getAllStats(_req: Request, res: Response) {
  const matchStats = await LeaderBoardService.sortAllStats();
  return res.status(200).json(matchStats);
}

export default {
  getAllStats,
};
