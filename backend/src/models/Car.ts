import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import User from './User';
import Order from './Order';

/**
 * Um para Um (OneToOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */

@Entity('cars')
class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    model: string;

    @Column()
    vehicle_registration: string;

    @Column()
    color: string;

    @Column()
    year: number;

    @Column()
    driver_id: string;

    @Column()
    default_car: boolean;

    @ManyToOne(() => User, user => user.car, { eager: true })
    @JoinColumn({ name: 'driver_id'})
    driver: User;

    @OneToMany(() => Order, order => order.reservation)
    order: Order;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Car;
