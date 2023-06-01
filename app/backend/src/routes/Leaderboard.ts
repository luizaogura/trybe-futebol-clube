import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get('/home', LeaderboardController.findAllHome);
LeaderboardRouter.get('/away', LeaderboardController.findAllAway);

export default LeaderboardRouter;
