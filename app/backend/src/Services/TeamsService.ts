import TeamsModel, { teamsAttributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async findAll(): Promise<teamsAttributes[]> {
    const allTeams = await TeamsModel.findAll();
    return allTeams;
  }
}
