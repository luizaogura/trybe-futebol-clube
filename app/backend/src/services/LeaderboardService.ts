import MatchesService from './MatchesService';
import Team from '../database/models/Team';

interface LeaderboardAttributes {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

interface MatchAttributes {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

class LeaderboardService {
  private static _goalsFavor: number;
  private static _goalsOwned: number;
  private static _totalPoints: number;
  private static _totalGames: number;

  constructor() {
    LeaderboardService._goalsFavor = 0;
    LeaderboardService._goalsOwned = 0;
  }

  public static async findAll(team: string): Promise<LeaderboardAttributes[]> {
    const allTeams = await Team.findAll();
    const allMatches = await MatchesService.finishedMatches();

    const all = allTeams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: LeaderboardService.totalPoints(team, id, allMatches),
      totalGames: LeaderboardService.totalGames(team, id, allMatches),
      totalVictories: LeaderboardService.totalVictories(team, id, allMatches),
      totalDraws: LeaderboardService.totalDraws(team, id, allMatches),
      totalLosses: LeaderboardService.totalLosses(team, id, allMatches),
      goalsFavor: LeaderboardService.goalsFavor(team, id, allMatches),
      goalsOwn: LeaderboardService.goalsOwn(team, id, allMatches),
      goalsBalance: LeaderboardService.goalsBalance(),
      efficiency: LeaderboardService.efficiency(),
    })).sort((a, b) => LeaderboardService.sort(a, b));
    return all;
  }

  public static totalPoints(team: string, id: number, allMatches: MatchAttributes[]): number {
    let total = 0;
    if (team === 'home') {
      allMatches.filter(({ homeTeamId }) => homeTeamId === id)
        .forEach(({ homeTeamGoals, awayTeamGoals }) => {
          if (homeTeamGoals > awayTeamGoals) total += 3;
          if (homeTeamGoals === awayTeamGoals) total += 1;
        });
      LeaderboardService._totalPoints = total;
      return total;
    }
    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (awayTeamGoals > homeTeamGoals) total += 3;
        if (homeTeamGoals === awayTeamGoals) total += 1;
      });
    LeaderboardService._totalPoints = total;
    return total;
  }

  public static totalGames(team: string, id: number, allMatches: MatchAttributes[]): number {
    if (team === 'home') {
      const total = allMatches.filter(({ homeTeamId }) => homeTeamId === id).length;
      LeaderboardService._totalGames = total;
      return total;
    }
    const total = allMatches.filter(({ awayTeamId }) => awayTeamId === id).length;
    LeaderboardService._totalGames = total;
    return total;
  }

  public static totalVictories(team: string, id: number, allMatches: MatchAttributes[]): number {
    if (team === 'home') {
      return allMatches.filter(({ homeTeamId, homeTeamGoals, awayTeamGoals,
      }) => homeTeamId === id && homeTeamGoals > awayTeamGoals).length;
    }
    return allMatches.filter(({ awayTeamId, homeTeamGoals, awayTeamGoals,
    }) => awayTeamId === id && awayTeamGoals > homeTeamGoals).length;
  }

  public static totalDraws(team: string, id: number, allMatches: MatchAttributes[]): number {
    if (team === 'home') {
      return allMatches.filter(({ homeTeamId, homeTeamGoals, awayTeamGoals,
      }) => homeTeamId === id && homeTeamGoals === awayTeamGoals).length;
    }
    return allMatches.filter(({ awayTeamId, homeTeamGoals, awayTeamGoals,
    }) => awayTeamId === id && homeTeamGoals === awayTeamGoals).length;
  }

  public static totalLosses(team: string, id: number, allMatches: MatchAttributes[]): number {
    if (team === 'home') {
      return allMatches.filter(({ homeTeamId, homeTeamGoals, awayTeamGoals,
      }) => homeTeamId === id && homeTeamGoals < awayTeamGoals).length;
    }
    return allMatches.filter(({ awayTeamId, homeTeamGoals, awayTeamGoals,
    }) => awayTeamId === id && awayTeamGoals < homeTeamGoals).length;
  }

  public static goalsFavor(team: string, id: number, allMatches: MatchAttributes[]): number {
    let total = 0;
    if (team === 'home') {
      allMatches.filter(({ homeTeamId }) => homeTeamId === id)
        .forEach(({ homeTeamGoals }) => {
          total += homeTeamGoals;
        });
      LeaderboardService._goalsFavor = total;
      return total;
    }
    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ awayTeamGoals }) => {
        total += awayTeamGoals;
      });
    LeaderboardService._goalsFavor = total;
    return total;
  }

  public static goalsOwn(team: string, id: number, allMatches: MatchAttributes[]): number {
    let total = 0;
    if (team === 'home') {
      allMatches.filter(({ homeTeamId }) => homeTeamId === id)
        .forEach(({ awayTeamGoals }) => {
          total += awayTeamGoals;
        });
      LeaderboardService._goalsOwned = total;
      return total;
    }
    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ homeTeamGoals }) => {
        total += homeTeamGoals;
      });
    LeaderboardService._goalsOwned = total;
    return total;
  }

  public static goalsBalance() {
    return LeaderboardService._goalsFavor - LeaderboardService._goalsOwned;
  }

  public static efficiency(): number {
    return +(
      (LeaderboardService._totalPoints / (LeaderboardService._totalGames * 3)) * 100).toFixed(2);
  }

  public static sort(a: LeaderboardAttributes, b: LeaderboardAttributes): number {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  }
}

export default LeaderboardService;
