import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class VehiclePartsReplacement {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_parts_replacements)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle?: Vehicle;

  @Column()
  part_name?: string;

  @Column()
  part_number?: string;

  @Column()
  replacement_date?: Date;

  @Column()
  cost?: number;

  @Column()
  warranty_expiry?: Date;

  @Column()
  replaced_by?: string;
}
