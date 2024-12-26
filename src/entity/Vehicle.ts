import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';

import { VehicleModel } from './VehicleModel';
import { VehicleSubModel } from './VehicleSubModel';
import { VehicleSegment } from './VehicleSegment';
import { VehicleVersion } from './VehicleVersion';
import { VehicleOwner } from './VehicleOwner';
import { VehiclePartsReplacement } from './VehiclePartsReplacement';
import { VehicleInsurance } from './VehicleInsurance';
import { Dealer } from './Dealer';
import { ECU } from './ECU';
import { ServiceTicket } from './ServiceTickets';

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
  manufacture_year?: Date;

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

  @ManyToMany(
    () => ECU,
    (ecu) => {
      ecu.vehicle;
    },
    { nullable: true },
  )
  @JoinTable({
    name: 'ecu_vehicle',
    joinColumn: { name: 'vehicle_id' },
    inverseJoinColumn: { name: 'ecu_id' },
  })
  ecus?: Promise<ECU[]>;

  @Column()
  mileage?: number;

  @ManyToOne(() => VehicleOwner, (owner) => owner.vehicles, { nullable: true })
  @JoinColumn({ name: 'vehicle_owner_id' })
  vehicle_owner?: VehicleOwner;

  @OneToMany(() => VehiclePartsReplacement, (replacement) => replacement.vehicle, { nullable: true })
  vehicle_parts_replacements?: VehiclePartsReplacement[];

  @OneToMany(() => VehicleInsurance, (insurance) => insurance.vehicle, { nullable: true })
  vehicle_insurances?: VehicleInsurance[];

  @ManyToOne(() => Dealer, (dealer) => dealer.vehicles, { nullable: true })
  @JoinColumn({ name: 'dealer_id' })
  dealer?: Dealer;

  @OneToOne(
    () => ServiceTicket,
    (service_ticket) => {
      service_ticket.vehicle;
    },
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: true },
  )
  // @JoinColumn({ name: 'vehicle_id' })
  service_ticket?: Promise<ServiceTicket>;
}
