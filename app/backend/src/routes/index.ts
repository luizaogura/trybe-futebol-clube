import { Router } from 'express';
import Team from './Team';

const router = Router();

router.use('/teams', Team);

export default router;
