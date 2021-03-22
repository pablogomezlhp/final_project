import { getRepository } from 'typeorm';
import moment from 'moment';

import AppError from '../../errors/AppError';
import Order from '../../models/Order';
import Reservation from '../../models/Reservation';

interface Request {
    driver_id: string;
    id: string;
    duration:number;
}

class UpdateOrderService {
  public async execute({ driver_id, id, duration }: Request): Promise<Order> {
    const orderRepository = getRepository(Order);
    const reservationRepository = getRepository(Reservation);

    const order = await orderRepository.findOne({
        where: {
            driver_id,
            id
        }
    });

    if (!order) {
      throw new AppError('Order does not exist', 401);
    }

    const reservation = await reservationRepository.findOne({
        where: {
            id: order.reservation_id
        }
    });

    if (!reservation) {
        throw new AppError('Reservation does not exist', 401);
    }

    const end_reservation = moment(reservation.end_reservation).add(duration, 'm').toDate();

    reservation.end_reservation = end_reservation;

    await reservationRepository.save(reservation);

    return order;
  }
}

export default UpdateOrderService;
