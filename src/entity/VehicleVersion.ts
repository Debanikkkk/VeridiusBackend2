import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Vehicle } from './Vehicle';
import { VehicleSubModel } from './VehicleSubModel';
import { VehicleModel } from './VehicleModel';

@Entity()
export class VehicleVersion {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  //   @ManyToOne(() => VehicleModel, (model) => model.vehicle_versions)
  //   vehicle_model?: VehicleModel;

  @OneToMany(() => VehicleSubModel, (subModel) => subModel.vehicle_version)
  vehicle_sub_models?: VehicleSubModel[];

  @OneToMany(() => VehicleModel, (model) => model.vehicle_version)
  vehicle_models?: VehicleModel[];

  @Column()
  price?: number;

  @Column({
    // type: 'jsonb',
    nullable: true,
  })
  features?: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_version)
  vehicles?: Vehicle[];
}
