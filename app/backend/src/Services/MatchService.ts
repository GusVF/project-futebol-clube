import TeamsModel from '../database/models/TeamsModel';
import MatchesModel, { matchesAttributes } from '../database/models/MatchesModel';

export default class MatchService {
  public static async findAllMatches(): Promise<matchesAttributes[]> {
    const allMatches = await MatchesModel.findAll({
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
    const inProgressMatches = await MatchesModel.findAll({
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

  public static async finishMatch(id: number): Promise<matchesAttributes | { message: string }> {
    const matchId = await MatchesModel.findOne({ where: { id } });

    if (!matchId) {
      return { message: 'Id not found' };
    }
    if (matchId.inProgress === false) {
      return { message: 'Match already finished' };
    }
    // alterar no banco de dados inProgress === false
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
