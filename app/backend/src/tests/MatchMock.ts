import MatchesModel from '../database/models/MatchesModel';

interface MatchReturnAtributes extends MatchesModel {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}

const mockmatches = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const mockFinishedmatches = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const mockNewMatch = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 2,
  "awayTeamGoals": 4,
  "inProgress": false,
} as MatchReturnAtributes;

const sameIdsMockmatches = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const badIdMockmatches = {
  "id": 1,
  "homeTeamId": 100,
  "homeTeamGoals": 1,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as MatchReturnAtributes;

const mockmatchesLeaderboard = [{
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 5,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
},
];

interface MatchLeaderBoardAtt extends MatchesModel {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: "100.00"
}

const matchTeamStatsHome = {
  "name": "Santos",
  "totalPoints": 9,
  "totalGames": 3,
  "totalVictories": 3,
  "totalDraws": 0,
  "totalLosses": 0,
  "goalsFavor": 9,
  "goalsOwn": 3,
  "goalsBalance": 6,
  "efficiency": "100.00"
} as MatchLeaderBoardAtt;

const matchTeamStatsAway = {
  "name": "Palmeiras",
  "totalPoints": 6,
  "totalGames": 2,
  "totalVictories": 2,
  "totalDraws": 0,
  "totalLosses": 0,
  "goalsFavor": 7,
  "goalsOwn": 0,
  "goalsBalance": 7,
  "efficiency": "100.00"
} as MatchLeaderBoardAtt;

export default {
  mockmatches,
  mockFinishedmatches,
  mockNewMatch,
  mockmatchesLeaderboard,
  sameIdsMockmatches,
  badIdMockmatches,
  matchTeamStatsHome,
  matchTeamStatsAway,
}

export { MatchReturnAtributes, MatchLeaderBoardAtt }
