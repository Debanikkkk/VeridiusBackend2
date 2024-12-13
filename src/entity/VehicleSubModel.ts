import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { Vehicle } from './Vehicle';

import { VehicleModel } from './VehicleModel';
import { VehicleVersion } from './VehicleVersion';

@Entity()
export class VehicleSubModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @ManyToOne(() => VehicleModel, (model) => model.vehicle_sub_models)
  @JoinColumn({ name: 'vehicle_model_id' })
  vehicle_model?: VehicleModel;

  @Column()
  engine_capacity?: string;

  @Column()
  fuel_efficiency?: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_sub_model)
  vehicles?: Vehicle[];

  @ManyToOne(() => VehicleVersion, (version) => version.vehicle_sub_models)
  @JoinColumn({ name: 'vehicle_version_id' })
  vehicle_version?: VehicleVersion;
}
