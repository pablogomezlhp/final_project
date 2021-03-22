import { getRepository } from 'typeorm'
import AppError from '../../errors/AppError';
import Car from '../../models/Car';

interface Request {
  driver_id: string;
  id: string;
}

class DeleteCarService {
  public async execute({driver_id, id}: Request): Promise<void> {
    const carRepository = getRepository(Car);

    const car = await carRepository.findOne({
      where: {id, driver_id},
    });

    if(!car) {
      throw new AppError('Car does not exist',401);
    }

    await carRepository.remove(car);

  }
}

export default DeleteCarService;
