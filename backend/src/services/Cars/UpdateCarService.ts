import { getRepository, getConnection } from 'typeorm';

import AppError from '../../errors/AppError';
import Car from '../../models/Car';

interface Request {
    driver_id: string;
    color: string;
    model:string;
    vehicle_registration:string;
    year:number;
    id:string
    default_car:boolean;
}

class UpdateCarService {
  public async execute({ id, color,year, model, vehicle_registration ,driver_id, default_car}: Request): Promise<Car> {
    const carRepository = getRepository(Car);

    const car = await carRepository.findOne({
        where: {id, driver_id},
    });

    if (!car) {
      throw new AppError('Car is not found', 401);
    }
    if(default_car) {
      const checkCarsDefault = await carRepository.find({
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

    car.year = year;
    car.model = model;
    car.color = color;
    car.vehicle_registration = vehicle_registration;
    car.default_car = default_car;

    await carRepository.save(car);

    return car;
  }
}

export default UpdateCarService;
