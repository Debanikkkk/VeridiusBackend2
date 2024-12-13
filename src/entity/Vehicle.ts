import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { VehicleModel } from './VehicleModel';
import { VehicleSubModel } from './VehicleSubModel';
import { VehicleSegment } from './VehicleSegment';
import { VehicleVersion } from './VehicleVersion';
import { VehicleOwner } from './VehicleOwner';
import { VehiclePartsReplacement } from './VehiclePartsReplacement';
import { VehicleInsurance } from './VehicleInsurance';
import { Dealer } from './Dealer';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  vin?: string;

  @Column({ unique: true })
  engine_number?: string;

  @Column()
  vehicle_number?: string;

  @Column()
  color?: string;

  @Column()
  manufacture_year?: number;

  @Column()
  transmission_type?: string;

  @ManyToOne(() => VehicleModel, (model) => model.vehicles)
  @JoinColumn({ name: 'vehicle_model_id' })
  vehicle_model?: VehicleModel;

  @ManyToOne(() => VehicleSubModel, (subModel) => subModel.vehicles)
  @JoinColumn({ name: 'vehicle_sub_id' })
  vehicle_sub_model?: VehicleSubModel;

  @ManyToOne(() => VehicleSegment, (segment) => segment.vehicles)
  @JoinColumn({ name: 'vehicle_segment_id' })
  vehicle_segment?: VehicleSegment;

  @ManyToOne(() => VehicleVersion, (version) => version.vehicles)
  @JoinColumn({ name: 'vehicle_version_id' })
  vehicle_version?: VehicleVersion;

  @Column()
  mileage?: number;

  @ManyToOne(() => VehicleOwner, (owner) => owner.vehicles)
  @JoinColumn({ name: 'vehicle_owner_id' })
  vehicle_owner?: VehicleOwner;

  @OneToMany(() => VehiclePartsReplacement, (replacement) => replacement.vehicle)
  vehicle_parts_replacements?: VehiclePartsReplacement[];

  @OneToMany(() => VehicleInsurance, (insurance) => insurance.vehicle)
  vehicle_insurances?: VehicleInsurance[];

  @ManyToOne(() => Dealer, (dealer) => dealer.vehicles)
  @JoinColumn({ name: 'dealer_id' })
  dealer?: Dealer;
}
