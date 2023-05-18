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

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const idTeam = await TeamService.findById(Number(id));
    try {
      res.status(200).json(idTeam);
    } catch (err) {
      res.status(500);
    }
  }
}

export default TeamController;
