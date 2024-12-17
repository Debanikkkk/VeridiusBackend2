import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ nullable: true })
  dongle_serial_number?: string;

  @Column({ unique: true, nullable: true })
  mac_address?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  manufacture_date?: Date;

  @Column({ nullable: true })
  firmware_version?: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: DongleStatus,
    default: DongleStatus.AVAILABLE,
  })
  status?: DongleStatus;

  @OneToOne(() => Device, (device) => device.dongle, { nullable: true })
  // @JoinColumn({ name: 'assigned_device_id' })
  assigned_device?: Device | null;

  @Column({ nullable: true })
  firmware_updated_at?: Date;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date;
}
