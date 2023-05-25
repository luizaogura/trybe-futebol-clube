import { Request, Response, NextFunction } from 'express';

const validadeEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const testEmail = regex.test(email);
  if (!email || email === undefined) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!testEmail) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const min = 6;
  if (!password || password === undefined) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (password.length < min) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export {
  validadeEmail,
  validatePassword,
};
