import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Device } from './Device';

export enum DongleStatus {
  AVAILABLE = 'Available',
  ASSIGNED = 'Assigned',
  DEFECTIVE = 'Defective',
}

@Entity()
export class Dongle {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  dongle_serial_number?: string;

  @Column()
  model?: string;

  @Column()
  manufacture_date?: Date;

  @Column()
  firmware_version?: string;

  @Column({
    type: 'enum',
    enum: DongleStatus,
    default: DongleStatus.AVAILABLE,
  })
  status?: DongleStatus;

  @OneToOne(() => Device, (device) => device.dongle, { nullable: true })
  @JoinColumn({ name: 'assigned_device_id' })
  assigned_device?: Device | null;

  @Column()
  firmware_updated_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
