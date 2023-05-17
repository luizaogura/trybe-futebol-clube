import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async findAll(_req: Request, res: Response) {
    const allTeams = await TeamService.findAll();
    try {
      return res.status(200).json(allTeams);
    } catch (err) {
      res.status(500);
    }
  }
}

export default TeamController;
