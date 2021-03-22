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

@Entity('cards')
class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_number: string;

  @Column()
  cvc_number: string;

  @Column()
  expiry_date: string;

  @Column()
  name_card: string;

  @Column()
  driver_id: string;

  @ManyToOne(() => User, user => user.card, { eager: true })
  @JoinColumn({ name: 'driver_id'})
  driver: User;

  @Column()
  name: string;

  @Column()
  default_card: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Card;
