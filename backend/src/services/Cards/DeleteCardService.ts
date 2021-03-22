import { getRepository } from 'typeorm'
import AppError from '../../errors/AppError';
import Card from '../../models/Card';

interface Request {
  driver_id:string;
  id:string
}

class DeleteCarService {
  public async execute({id,driver_id}: Request): Promise<void> {
    const cardRepository = getRepository(Card);

    const card = await cardRepository.findOne({
        where: {id , driver_id},
    });

    if(!card) {
      throw new AppError('Card does not exist',401);
    }

    await cardRepository.remove(card);

  }
}

export default DeleteCarService;
