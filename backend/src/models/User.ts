import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import Car from './Car';
import Order from './Order';
import Card from './Card';
import Credit from './Credit';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ select: false })
  password: string;

  @Column()
  role_ID: number;

  @OneToMany(() => Car, car => car.driver)
  car: Car;

  @OneToMany(() => Card, card => card.driver)
  card: Card;

  @OneToOne(() => Credit, credit => credit.driver)
  credit: Credit;

  @OneToMany(() => Order, order => order.driver)
  order: Order;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
