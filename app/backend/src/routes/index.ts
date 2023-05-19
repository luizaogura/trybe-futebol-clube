import { Router } from 'express';
import Team from './Team';
import UserRouter from './User';

const router = Router();

router.use('/teams', Team);
router.use('/login', UserRouter);

export default router;
