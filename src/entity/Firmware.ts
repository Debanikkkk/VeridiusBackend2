import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { Vehicle } from './Vehicle'; // Import the Vehicle entity
import { ECU } from './ECU';
import { User } from './User';

export enum firmware_management {
  DEVOTA = 'DEVOTA',
  DOTA = 'DOTA',
}
@Entity('firmware_management')
export class Firmware {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firmware_version?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_description?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // uploaded_by?: string;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @Column({
    type: 'enum',
    enum: firmware_management,
    // default: firmware_management.,
  })
  firmware_type?: firmware_management;
  // @ManyToOne(() => Vehicle, (vehicle) => vehicle.firmwares, { nullable: true })
  // @JoinColumn({ name: 'vehicle_id' })
  // vehicle?: Vehicle;

  @ManyToOne(
    () => User,
    (user) => {
      user.firmwares;
    },
    { nullable: true },
  )
  @JoinColumn({ name: 'created_by' })
  created_by?: User;
  @OneToMany(
    () => ECU,
    (ecu) => {
      ecu.firmware;
    },
    { nullable: true },
  )
  ecus?: ECU[];
}
