import { getRepository } from 'typeorm';
import moment from 'moment';
const orderid = require('order-id')('mysecret');
// import AppError from '../../errors/AppError';

import Order from '../../models/Order';
import Reservation from '../../models/Reservation';

interface Request {
  latitude: string;
  longitude: string;
  driver_id: string;
  price: number;
  car_id: string;
  duration: number;
}

class CreateUserService {
  public async execute({
    latitude,
    longitude,
    driver_id,
    price,
    car_id,
    duration,
  }: Request): Promise<Order> {
    const ordersRepository = getRepository(Order);
    const reservationsRepository = getRepository(Reservation);

    const start_reservation = moment(Date.now()).toDate();
    const end_reservation = moment(Date.now()).add(duration, 'm').toDate();

    // console.log("end_reservation", end_reservation, "duration", duration);

    const reservationCreated = reservationsRepository.create({
        start_reservation,
        end_reservation,
    });

    await reservationsRepository.save(reservationCreated);

    const order_number = orderid.generate();

    const order = ordersRepository.create({
        order_number,
        latitude,
        longitude,
        driver_id,
        active:true,
        price,
        car_id,
        reservation: reservationCreated
    });

    await ordersRepository.save(order);

    return order;
  }
}

export default CreateUserService;
