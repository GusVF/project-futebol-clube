import { Request, Response } from 'express';
import TeamsService from '../Services/TeamsService';

async function findAll(_req: Request, res: Response) {
  const allTeams = await TeamsService.findAll();
  return res.status(200).json(allTeams);
}

async function findById(req: Request, res: Response) {
  const { id } = req.params;
  const teamById = await TeamsService.findById(Number(id));
  if (!teamById) {
    return res.status(401).json(teamById);
  }
  return res.status(200).json(teamById);
}

export default {
  findAll,
  findById,
};
