import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
// import { Vehicle } from './Vehicle'; // Import the Vehicle entity
import { ECU } from './ECU';

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

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  uploaded_by?: string;

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

  @OneToMany(
    () => ECU,
    (ecu) => {
      ecu.firmware;
    },
    { nullable: true },
  )
  ecus?: ECU[];
}
