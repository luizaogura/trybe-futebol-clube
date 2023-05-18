import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();

teamRouter.get('/', (req, res) => TeamController.findAll(req, res));
teamRouter.get('/:id', (req, res) => TeamController.findById(req, res));

export default teamRouter;
