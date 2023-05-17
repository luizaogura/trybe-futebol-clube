import Team from '../database/models/Team';

class TeamService {
  public static async findAll(): Promise<Team[]> {
    const allTeams = await Team.findAll();
    return allTeams;
  }
}

export default TeamService;
