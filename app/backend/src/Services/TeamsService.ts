import TeamsModel, { teamsAttributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async findAll(): Promise<teamsAttributes[]> {
    const allTeams = await TeamsModel.findAll();
    return allTeams;
  }

  public static async findById(id: number): Promise<teamsAttributes> {
    const teamById = await TeamsModel.findByPk(id);
    if (!teamById) {
      throw new Error('Team not found');
    }
    return teamById;
  }
}
