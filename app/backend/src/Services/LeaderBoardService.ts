import { matchesAttributes } from '../database/models/MatchesModel';
import MatchService from './MatchService';
import TeamsService from './TeamsService';
import LeaderBoardInterface from '../interfaces/LeaderBoardInterface';

export default class LeaderBoardService {
  public static async getAllStatsById(value: string) {
    const allTeams = await TeamsService.findAll();

    return Promise.all(allTeams.map(async (team) => {
      const matchStats = value === 'home' ? await MatchService.findHomeTeamById(team.id)
        : await MatchService.findAwayTeamById(team.id);
      return {
        name: team.teamName,
        totalPoints: value === 'home' ? this.getTotalHomePoints(matchStats)
          : this.getTotalAwayPoints(matchStats),
        totalGames: matchStats.length,
        totalVictories: this.getTotalVictories(matchStats, value),
        totalDraws: this.getTotalDraws(matchStats, value),
        totalLosses: this.getTotalLosses(matchStats, value),
        goalsFavor: this.getGoalsFavor(matchStats, value),
        goalsOwn: this.getGoalsOwn(matchStats, value),
        goalsBalance: this.getGoalsBalance(matchStats, value),
        efficiency: this.getEfficiency(matchStats, value),
      };
    }));
  }

  public static async allTeamsStats(value: LeaderBoardInterface[]) {
    const teams = await TeamsService.findAll();
    const result = teams.map((team) => {
      const allTeams = value.filter((t) => t.name === team.teamName);
      return { name: team.teamName,
        totalPoints: allTeams.reduce((acc, curr) => acc + curr.totalPoints, 0),
        totalGames: allTeams.reduce((acc, curr) => acc + curr.totalGames, 0),
        totalVictories: allTeams.reduce((acc, curr) => acc + curr.totalVictories, 0),
        totalDraws: allTeams.reduce((acc, curr) => acc + curr.totalDraws, 0),
        totalLosses: allTeams.reduce((acc, curr) => acc + curr.totalLosses, 0),
        goalsFavor: allTeams.reduce((acc, curr) => acc + curr.goalsFavor, 0),
        goalsOwn: allTeams.reduce((acc, curr) => acc + curr.goalsOwn, 0),
        goalsBalance: allTeams.reduce((acc, curr) => acc + curr.goalsBalance, 0),
        efficiency: (((allTeams.reduce((acc, curr) => acc + curr.totalPoints, 0)
            / (allTeams.reduce((acc, curr) => acc + curr.totalGames, 0) * 3)) * 100)
          .toFixed(2)) };
    });
    const finalResult = await this.sortAllStats(result);
    return finalResult;
  }

  public static getTotalHomePoints(matchStats: matchesAttributes[]) {
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

  public static getTotalAwayPoints(matchStats: matchesAttributes[]) {
    const result = matchStats.reduce((acc, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) {
        return acc;
      }
      if (curr.awayTeamGoals > curr.homeTeamGoals) {
        const points = acc + 3;
        return points;
      }
      return acc + 1;
    }, 0);
    return result;
  }

  public static getTotalVictories(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      return matchStats.reduce((acc, el) => (el.homeTeamGoals > el.awayTeamGoals
        ? acc + 1 : acc), 0);
    }
    return matchStats.reduce((acc, el) => (el.awayTeamGoals > el.homeTeamGoals
      ? acc + 1 : acc), 0);
  }

  public static getTotalDraws(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      return matchStats.reduce((acc, curr) =>
        (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc + 0), 0);
    }
    return matchStats.reduce((acc, curr) =>
      (curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc + 0), 0);
  }

  public static getTotalLosses(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      return matchStats.reduce((acc, curr) =>
        (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc + 0), 0);
    }
    return matchStats.reduce((acc, curr) =>
      (curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc + 0), 0);
  }

  public static getGoalsFavor(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      return matchStats.reduce((acc, curr) =>
        (acc + curr.homeTeamGoals), 0);
    }
    return matchStats.reduce((acc, curr) =>
      (acc + curr.awayTeamGoals), 0);
  }

  public static getGoalsOwn(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      return matchStats.reduce((acc, curr) =>
        (acc + curr.awayTeamGoals), 0);
    }
    return matchStats.reduce((acc, curr) =>
      (acc + curr.homeTeamGoals), 0);
  }

  public static getGoalsBalance(matchStats: matchesAttributes[], anyTeam: string) {
    if (anyTeam === 'home') {
      const goalsBalance = matchStats.reduce((acc, curr) =>
        acc + (curr.homeTeamGoals - curr.awayTeamGoals), 0);
      return goalsBalance;
    }
    const goalsBalance = matchStats.reduce((acc, curr) =>
      acc + (curr.awayTeamGoals - curr.homeTeamGoals), 0);
    return goalsBalance;
  }

  public static getEfficiency(matchStats: matchesAttributes[], anyTeam: string) {
    let totalPoints;
    if (anyTeam === 'home') {
      totalPoints = this.getTotalHomePoints(matchStats);
    } else {
      totalPoints = this.getTotalAwayPoints(matchStats);
    }
    const totalGames = matchStats.length;
    const result = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return result;
  }

  public static async sortAllStats(anyTeam: string | LeaderBoardInterface[]) {
    const sortAllStats = typeof anyTeam === 'string'
      ? await this.getAllStatsById(anyTeam)
      : anyTeam;
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
