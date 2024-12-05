import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './Vehicle';
@Entity()
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @OneToMany(
    () => Vehicle,
    (vehicle) => {
      vehicle.vehicle_model;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  vehicle?: Promise<Vehicle[]>;
}
