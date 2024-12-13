import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Dongle } from './Dongle';
import { User } from './User'; // Assuming there's a User or Technician entity.

export enum DeviceStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
}

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true,
  })
  device_name?: string;

  @Column({
    nullable: true,
  })
  device_type?: string;

  @Column({
    nullable: true,
  })
  os_version?: string;

  @Column({ unique: true, nullable: true })
  serial_number?: string;

  @CreateDateColumn({
    nullable: true,
  })
  registration_date?: Date;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.ACTIVE,
  })
  status?: DeviceStatus;

  @OneToOne(() => Dongle, (dongle) => dongle.assigned_device, { nullable: true })
  @JoinColumn({ name: 'dongle_id' })
  dongle?: Dongle | null;

  @OneToOne(() => User, (user) => user.device, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to?: User | null;

  @CreateDateColumn({
    nullable: true,
  })
  created_at?: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at?: Date;
}
