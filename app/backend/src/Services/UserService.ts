// O campo email deve receber um email válido. Ex: tfc@projeto.com;
// O campo password deve ter mais de 6 caracteres.
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UsersModel';
import JwtToken from './JwtToken';

export default class UserService {
  public static async userLogin(email: string, password: string)
    : Promise<string | { message: string }> {
    const userLogin = await UserModel.findOne({ where: { email } });
    if (userLogin?.email !== email) {
      return { message: 'Invalid email or password' };
    }
    const passwordValidation = await bcrypt.compare(password, userLogin.password);
    if (!passwordValidation) {
      return { message: 'Invalid email or password' };
    }
    return JwtToken.generateToken({ email: userLogin.email, password: userLogin.password });
  }

  public static async userRole(email: string): Promise<string | { message: string }> {
    const userRole = await UserModel.findOne({ where: { email } });
    if (userRole?.email !== email) {
      return { message: 'Token must be a valid token' };
    }
    return userRole.dataValues.role;
  }
}
