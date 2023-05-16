import TeamsModel from '../database/models/TeamsModel';
import UserModel, { matchesAttributes } from '../database/models/MatchesModel';

export default class MatchService {
  public static async findAllMatches(): Promise<matchesAttributes[]> {
    const allMatches = await UserModel.findAll({
      include: [
        {
          attributes: { exclude: ['id'] },
          model: TeamsModel,
          as: 'homeTeam',
        },
        {
          attributes: { exclude: ['id'] },
          model: TeamsModel,
          as: 'awayTeam',
        },
      ] });
    return allMatches;
  }

  public static async allInProgress(inProgress: string | undefined): Promise<matchesAttributes[]> {
    const inProgressMatches = await UserModel.findAll({
      where: {
        inProgress: inProgress === 'true',
      },
      include: [
        {
          attributes: { exclude: ['id'] },
          model: TeamsModel,
          as: 'homeTeam',
        },
        {
          attributes: { exclude: ['id'] },
          model: TeamsModel,
          as: 'awayTeam',
        },
      ] });
    return inProgressMatches;
  }
}
