import { Router } from 'express';
import UserController from '../controllers/LoginController';
import { validadeEmail, validatePassword } from '../middlewares/ValidateLogin';
import ValidateToken from '../middlewares/ValidateToken';

const UserRouter = Router();

UserRouter.post(
  '/',
  validadeEmail,
  validatePassword,
  UserController.Login,
);

UserRouter.get('/role', ValidateToken.TokenVerify, UserController.role);

export default UserRouter;
