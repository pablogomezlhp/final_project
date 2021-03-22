import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
  } from 'typeorm';

import User from './User';
import Reservation from './Reservation';
import Car from './Car';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    order_number: number;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    driver_id: string;

    @ManyToOne(() => User, user => user.order, { eager: true })
    @JoinColumn({ name: 'driver_id'})
    driver: User;

    @Column()
    reservation_id: string;

    @OneToOne(() => Reservation, reservation => reservation.order, { eager: true })
    @JoinColumn({ name: 'reservation_id'})
    reservation: Reservation;

    @Column()
    car_id: string;

    @OneToOne(() => Car, car => car.order, { eager: true })
    @JoinColumn({ name: 'car_id'})
    car: Car;

    @Column()
    active: Boolean;

    @Column()
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;
