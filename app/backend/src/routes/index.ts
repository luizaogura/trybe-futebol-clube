import { Router } from 'express';
import Team from './Team';
import UserRouter from './User';
import MatchesRouter from './Matches';
import LeaderboardRouter from './Leaderboard';

const router = Router();

router.use('/teams', Team);
router.use('/login', UserRouter);
router.use('/matches', MatchesRouter);
router.use('/leaderboard', LeaderboardRouter);

export default router;
