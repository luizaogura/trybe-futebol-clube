import { Router } from 'express';
import Team from './Team';
import UserRouter from './User';
import MatchesRouter from './Matches';

const router = Router();

router.use('/teams', Team);
router.use('/login', UserRouter);
router.use('/matches', MatchesRouter);

export default router;
