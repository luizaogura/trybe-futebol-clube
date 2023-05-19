import Token from '../auth/generateToken';

export interface Login {
  email: string,
  password: string,
}

class UserService {
  static async login(login: Login) {
    const { email } = login;
    const token = Token.generateToken(email);
    return { token };
  }
}

export default UserService;
