import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateUser from '../middlewares/validateUser';

const UserRouter = Router();

UserRouter.post('/', validateUser, UserController.Login);

export default UserRouter;
