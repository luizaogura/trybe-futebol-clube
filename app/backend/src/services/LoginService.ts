import { compareSync } from 'bcryptjs';
import Token from '../auth/Token';
import User from '../database/models/User';

class LoginService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      return undefined;
    }
    const token = Token.generateToken(email);
    return { token };
  }

  public static async role(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return undefined;
    }
    return { role: user.role };
  }
}

export default LoginService;
