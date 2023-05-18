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
        goalsBalance: this.getGoalsBalance(matchStats),
        efficiency: this.getEficiency(matchStats),
      };
    }));
  }

  public static getTotalPoints(matchStats: matchesAttributes[]) {
    const result = matchStats.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc;
      }
      if (curr.homeTeamGoals > curr.awayTeamGoals) {
        const points = acc + 3;
        return points;
      }
      return acc + 1;
    }, 0);
    return result;
  }

  public static getTotalVictories(matchStats: matchesAttributes[]) {
    return matchStats.reduce((acc, curr) =>
      (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);
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

  public static getGoalsBalance(matchStats: matchesAttributes[]) {
    const goalsBalance = matchStats.reduce((acc, curr) =>
      acc + (curr.homeTeamGoals - curr.awayTeamGoals), 0);
    return goalsBalance;
  }

  public static getEficiency(matchStats: matchesAttributes[]) {
    const totalPoints = this.getTotalPoints(matchStats);
    const totalGames = matchStats.length;
    const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return result;
  }

  public static async sortAllStats() {
    const sortAllStats = await this.getAllStats();
    sortAllStats.sort((b, a) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.totalVictories === b.totalVictories) {
          if (a.goalsBalance === b.goalsBalance) {
            return a.goalsFavor - b.goalsFavor;
          }
          return a.goalsBalance - b.goalsBalance;
        }
        return a.totalVictories - b.totalVictories;
      }
      return a.totalPoints - b.totalPoints;
    }); return sortAllStats;
  }
}
