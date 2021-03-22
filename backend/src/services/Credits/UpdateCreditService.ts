import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';
import Credit from '../../models/Credit';

interface Request {
    driver_id: string;
    balance:number;
    isPaid: Boolean
}

class UpdateCreditService {
  public async execute({ balance ,driver_id, isPaid }: Request): Promise<Credit> {
    const creditRepository = getRepository(Credit);

    const credit = await creditRepository.findOne({
        where: { driver_id },
    });

    if (!credit) {
      throw new AppError('Credit is not found', 401);
    }
    if(isPaid == true){
    credit.balance = balance;
    await creditRepository.save(credit);
    return credit;
    };
    credit.balance = credit.balance + balance;

    await creditRepository.save(credit);

    return credit;
  }
}

export default UpdateCreditService;
