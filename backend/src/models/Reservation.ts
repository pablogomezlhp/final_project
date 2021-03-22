import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Order from './Order';

@Entity('reservations')
class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  start_reservation: Date;

  @Column()
  end_reservation: Date;

  @OneToMany(() => Order, order => order.reservation)
  order: Order;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reservation;
