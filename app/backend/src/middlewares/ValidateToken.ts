import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

export type EmailAuth = Request & {
  auth: {
    email: string
  }
};

export type AppPayload = {
  email: string,
  password: string
};

export default class ValidateToken {
  public static verify = (token: string): AppPayload => {
    const tokenDecoded = jwt.verify(token, secretKey);
    return tokenDecoded as AppPayload;
  };

  public static TokenVerify(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const decodedAuth = ValidateToken.verify(authorization);
      (req as EmailAuth).auth = { email: decodedAuth.email };
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
