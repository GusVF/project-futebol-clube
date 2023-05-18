import TeamsModel from '../database/models/TeamsModel';
import MatchesModel, {
  matchesAttributes,
  matchesAttributesCreator,
} from '../database/models/MatchesModel';

export default class MatchService {
  public static async findMatchById(id: number): Promise<matchesAttributes[]> {
    const allMatches = await MatchesModel.findAll({ where: { homeTeamId: id, inProgress: false },
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
      ],
    });
    return allMatches;
  }

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

    if (matchId?.inProgress === false) {
      return { message: 'Match already finished' };
    }
    await MatchesModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  public static async updateMatchScore(
    id: number,
    awayTeamGoals: number,
    homeTeamGoals: number,
  ):Promise<matchesAttributes | { message: string }> {
    const matchId = await MatchesModel.findOne({ where: { id } });
    if (!matchId?.inProgress) {
      return { message: 'Match already finished' };
    }
    await MatchesModel
      .update({ awayTeamGoals, homeTeamGoals }, { where: { id } });
    return { message: 'Match score updated' };
  }

  public static async createNewMatch(
    match: matchesAttributesCreator,
  ):Promise<matchesAttributes | { message: string }> {
    const homeTeam = await MatchesModel.findOne({ where: { id: match.homeTeamId } });
    const awayTeam = await MatchesModel.findOne({ where: { id: match.awayTeamId } });

    if (!homeTeam || !awayTeam) {
      return { message: 'There is no team with such id!' };
    }
    const newMatch = await MatchesModel.create({ ...match, inProgress: true });
    return newMatch;
  }
}
