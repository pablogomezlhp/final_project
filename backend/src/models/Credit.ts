import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';

import User from './User';

@Entity('credits')
class Credit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  balance: number;

  @Column()
  driver_id: string;

  @OneToOne(() => User, user => user.credit, { eager: true })
  @JoinColumn({ name: 'driver_id'})
  driver: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Credit;
