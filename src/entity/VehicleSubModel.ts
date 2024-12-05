import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './Vehicle';
@Entity()
export class VehicleSubModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @OneToMany(
    () => Vehicle,
    (vehicle) => {
      vehicle.vehicle_sub_model;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  vehicle?: Promise<Vehicle[]>;
}
