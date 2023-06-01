import { NextFunction, Request, Response } from 'express';
import Leaderboard from '../services/LeaderboardService';

class LeaderboardController {
  public static async findAllHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const allMatches = await Leaderboard.findAll('home');
      return res.status(200).json(allMatches);
    } catch (error) {
      return next(error);
    }
  }

  public static async findAllAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const allMatches = await Leaderboard.findAll('away');
      return res.status(200).json(allMatches);
    } catch (error) {
      return next(error);
    }
  }
}

export default LeaderboardController;
