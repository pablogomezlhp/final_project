import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Credit from '../../models/Credit';
import User from '../../models/User';

interface Request {
  balance: number;
  driver_id: string;
}

class CreateCreditService {
  public async execute({
    balance,
    driver_id,
  }: Request): Promise<Credit> {
    const creditsRepository = getRepository(Credit);
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
        where: { id: driver_id },
    });

    if (!checkUserExists) {
        throw new AppError('User not registered.');
    }

    const credit = creditsRepository.create({
        balance,
        driver_id,
    });

    await creditsRepository.save(credit);

    return credit;
  }
}

export default CreateCreditService;
