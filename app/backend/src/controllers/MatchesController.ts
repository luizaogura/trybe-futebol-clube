import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  public static async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const filterMatches = await MatchesService.inProgress();
      return res.status(200).json(filterMatches);
    }
    if (inProgress === 'false') {
      const finished = await MatchesService.finishedMatches();
      return res.status(200).json(finished);
    }
    const matches = await MatchesService.findAll();
    return res.status(200).json(matches);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService
      .updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json({ message: 'updated match' });
  }

  static async createMatch(req:Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const newMatch = await MatchesService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    if (!newMatch) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(newMatch);
  }
}

export default MatchesController;
