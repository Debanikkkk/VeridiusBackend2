import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './Vehicle';
import { VehicleModel } from './VehicleModel';

@Entity()
export class VehicleSegment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => VehicleModel, (model) => model.vehicle_segment)
  vehicle_models?: VehicleModel[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_segment)
  vehicles?: Vehicle[];
}
