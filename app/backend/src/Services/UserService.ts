// O campo email deve receber um email válido. Ex: tfc@projeto.com;
// O campo password deve ter mais de 6 caracteres.
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UsersModel';
import JwtToken from './JwtToken';

export default class UserService {
  public static async userLogin(email: string, password: string): Promise<string> {
    const userLogin = await UserModel.findOne({ where: { email } });
    if (userLogin?.password !== password || userLogin?.email !== email) {
      return ('Invalid email or password');
    }
    await bcrypt.compare(password, userLogin.password);
    return JwtToken.generateToken({ email: userLogin.email, password: userLogin.password });
  }
}
