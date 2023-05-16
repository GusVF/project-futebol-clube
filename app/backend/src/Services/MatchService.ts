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
}
