import TeamsModel, { teamsAttributes } from '../database/models/TeamsModel';

export default class TeamsService {
  public static async findAll(): Promise<teamsAttributes[]> {
    const allTeams = await TeamsModel.findAll();
    return allTeams;
  }

  public static async findById(id: number): Promise<teamsAttributes | { message: string }> {
    const teamById = await TeamsModel.findByPk(id);
    if (!teamById) {
      return ({ message: 'Team not found' });
    }
    return teamById;
  }
}
