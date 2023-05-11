import { Request, Response } from 'express';
import TeamsService from '../Services/TeamsService';

async function findAll(_req: Request, res: Response) {
  const allTeams = await TeamsService.findAll();
  return res.status(200).json(allTeams);
}

export default {
  findAll,
};
