import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  username: string;
  email: string;
  password: string;
  mobile: string;
  role_ID: number;
}

class CreateUserService {
  public async execute({
    username,
    email,
    password,
    mobile,
    role_ID,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      username,
      email,
      mobile,
      password: hashedPassword,
      role_ID,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
