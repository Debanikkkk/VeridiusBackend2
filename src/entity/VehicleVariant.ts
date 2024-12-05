import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './Vehicle';
@Entity()
export class VehicleVariant {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @OneToMany(
    () => Vehicle,
    (vehicle) => {
      vehicle.vehicle_variant;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  vehicle?: Promise<Vehicle[]>;
}
