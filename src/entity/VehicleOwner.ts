import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class VehicleOwner {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  phone_number?: string;

  @Column()
  address?: string;

  @Column()
  purchase_date?: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_owner)
  vehicles?: Vehicle[];
}
