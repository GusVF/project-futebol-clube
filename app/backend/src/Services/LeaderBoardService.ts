import { matchesAttributes } from '../database/models/MatchesModel';
import MatchService from './MatchService';
import TeamsService from './TeamsService';

export default class LeaderBoardService {
  public static async getAllStats() {
    const teams = await TeamsService.findAll();

    return Promise.all(teams.map(async (team) => {
      const matchStats = await MatchService.findMatchById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.getTotalPoints(matchStats),
        totalGames: matchStats.length,
        totalVictories: this.getTotalVictories(matchStats),
        totalDraws: this.getTotalDraws(matchStats),
        totalLosses: this.getTotalLosses(matchStats),
        goalsFavor: this.getGoalsFavor(matchStats),
        goalsOwn: this.getGoalsOwn(matchStats),
      };
    }));
  }

  public static getTotalPoints(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 0 : acc + curr.homeTeamGoals), 0);
  }

  public static getTotalVictories(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 0 : acc + 1), 0);
  }

  public static getTotalDraws(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc + 0), 0);
  }

  public static getTotalLosses(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc + 0), 0);
  }

  public static getGoalsFavor(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (acc + curr.homeTeamGoals), 0);
  }

  public static getGoalsOwn(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (acc + curr.awayTeamGoals), 0);
  }
}
