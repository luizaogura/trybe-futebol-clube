import * as jwt from 'jsonwebtoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
} as object;

class Token {
  static generateToken(email: string) {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ email }, secret, jwtConfig);
    return token;
  }
}

export default Token;
