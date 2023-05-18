import Team from '../database/models/Team';

class TeamService {
  public static async findAll(): Promise<Team[]> {
    const allTeams = await Team.findAll();
    return allTeams;
  }

  public static async findById(id: number): Promise<Team | null> {
    const idTeam = await Team.findByPk(id);
    return idTeam;
  }
}

export default TeamService;
