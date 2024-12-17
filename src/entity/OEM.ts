import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VehicleModel } from './VehicleModel';

@Entity()
export class OEM {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  country?: string;

  @Column()
  founded_year?: Date;

  @Column()
  contact_information?: string;

  @Column()
  website?: string;

  @OneToMany(() => VehicleModel, (model) => model.oem)
  vehicle_models?: VehicleModel[];
}
