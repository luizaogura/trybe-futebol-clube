import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

type EmailAuth = Request & {
  auth: {
    email: string
  }
};

class UserController {
  static async Login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(token);
  }

  public static async role(req: Request, res: Response) {
    const { email } = (req as EmailAuth).auth;
    const role = await LoginService.role(email);
    if (!role) {
      return res.status(401).json({ message: 'User not found' });
    }
    res.status(200).json(role);
  }
}

export default UserController;
