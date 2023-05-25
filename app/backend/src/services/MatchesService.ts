import Team from '../database/models/Team';
import Match from '../database/models/Match';

class MatchesService {
  public static async findAll() {
    const matches = await Match.findAll({
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  public static async inProgress() {
    const matches = await this.findAll();
    const inProgress = matches.filter((match) => match.inProgress === true);
    return inProgress;
  }

  public static async finishedMatches() {
    const matches = await this.findAll();
    const finished = matches.filter((match) => match.inProgress === false);
    return finished;
  }

  public static async finishMatch(id: number) {
    const matches = await Match.update({ inProgress: false }, { where: { id } });
    return matches;
  }

  public static async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const findHomeTeam = await Team.findByPk(homeTeamId);
    const findAwayTeam = await Team.findByPk(awayTeamId);

    if (!findHomeTeam || !findAwayTeam) {
      return undefined;
    }

    const newMatch = await Match.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}

export default MatchesService;
