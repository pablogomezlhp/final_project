import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

import User from '../../models/User';



interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    // const user = await userRepository.findOne({
    //   where: { email },
    // });

    const user = await getRepository(User)
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.email = :email", { email })
    .getOne();
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    /** Metodo compare - Ele compara um password string, com um password com hash */
    // console.log("password", password, "user.password", user.password);
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
