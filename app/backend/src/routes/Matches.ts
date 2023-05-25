import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import ValidateToken from '../middlewares/ValidateToken';

const MatchesRouter = Router();

MatchesRouter.get('/', MatchesController.findAll);
MatchesRouter.patch('/:id', ValidateToken.TokenVerify, MatchesController.updateMatch);
MatchesRouter.patch('/:id/finish', ValidateToken.TokenVerify, MatchesController.finishMatch);
MatchesRouter.post('/', ValidateToken.TokenVerify, MatchesController.createMatch);

export default MatchesRouter;
