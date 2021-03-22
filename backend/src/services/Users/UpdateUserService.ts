import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';

import AppError from '../../errors/AppError';
import User from '../../models/User';

interface Request {
  user_id: string;
  username: string;
  password:string;
  mobile:string;
}

class UpdateUserService {
  public async execute({ user_id, username, password, mobile }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar', 401);
    }

    user.username = username;
    user.password = password;
    user.mobile = mobile;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
