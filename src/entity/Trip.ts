import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.trips)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column('float')
  startLatitude?: number;

  @Column('float')
  startLongitude?: number;

  @Column('float')
  endLatitude?: number;

  @Column('float')
  endLongitude?: number;

  @Column('float')
  tariff?: number;

  @Column({ default: 'unpaid' })
  paymentStatus?: string; // e.g., unpaid, pending, completed

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp?: Date;
}
