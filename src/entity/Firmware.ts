import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './Vehicle'; // Import the Vehicle entity

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

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.firmwares, { nullable: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle?: Vehicle;
}
