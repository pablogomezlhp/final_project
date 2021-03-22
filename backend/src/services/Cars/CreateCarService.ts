import { getRepository,getConnection } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import Car from '../../models/Car';
import User from '../../models/User';

interface Request {
    driver_id: string;
    model: string;
    vehicle_registration: string;
    year: number;
    default_car:boolean;
    color: string;
}

class CreateCarService {
  public async execute({
    model,
    vehicle_registration,
    year,
    color,
    default_car,
    driver_id
  }: Request): Promise<Car> {
    const carsRepository = getRepository(Car);
    const usersRepository = getRepository(User);

    const checkCarsExists = await carsRepository.findOne({
      where: { vehicle_registration, driver_id },
    });

    const checkUserExists = await usersRepository.findOne({
        where: { id: driver_id },
    });

    if (checkCarsExists) {
      throw new AppError('This car was already registered.');
    }

    if (!checkUserExists) {
        throw new AppError('User not registered.');
    }

    if(default_car) {
      const checkCarsDefault = await carsRepository.find({
          where: { driver_id },
      });

      if(checkCarsDefault) {
          await getConnection()
              .createQueryBuilder()
              .update(Car)
              .set({ default_car: false})
              .where("driver_id = :driver_id", { driver_id })
              .execute();
      }
  }

    const car = carsRepository.create({
        model,
        vehicle_registration,
        color,
        year,
        default_car:true,
        driver_id,
        // driver: checkUserExists

    });

    await carsRepository.save(car);

    return car;
  }
}

export default CreateCarService;
