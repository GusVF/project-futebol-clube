import { Request, Response } from 'express';
import TeamsService from '../Services/TeamsService';

async function findAll(_req: Request, res: Response) {
  const allTeams = await TeamsService.findAll();
  if (!allTeams) {
    return res.status(500).json({ message: 'Request Error' });
  }
  return res.status(200).json(allTeams);
}

export default {
  findAll,
};
