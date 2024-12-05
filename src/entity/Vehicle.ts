import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleModel } from './VehicleModel';
import { VehicleSubModel } from './VehicleSubModel';
import { VehicleVariant } from './VehicleVariant';
import { OEM } from './OEM';
import { ECU } from './ECU';
import { ServiceTicket } from './ServiceTickets';
// import { Serializable } from 'child_process';
@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @ManyToOne(
    () => VehicleModel,
    (vehicle_model) => {
      vehicle_model.vehicle;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'vehicle_model_id' })
  vehicle_model?: Promise<VehicleModel>;

  @ManyToOne(
    () => VehicleSubModel,
    (vehicle_sub_model) => {
      vehicle_sub_model.vehicle;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'vehicle_sub_model_id' })
  vehicle_sub_model?: Promise<VehicleSubModel>;

  @ManyToOne(
    () => VehicleVariant,
    (vehicle_variant) => {
      vehicle_variant.vehicle;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'vehicle_variant_id' })
  vehicle_variant?: Promise<VehicleVariant>;

  @ManyToOne(
    () => OEM,
    (oem) => {
      oem.vehicle;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'oem_id' })
  oem?: Promise<OEM>;

  @ManyToMany(
    () => ECU,
    (ecu) => {
      ecu.vehicle;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinTable({
    name: 'vehicle_ecu',
    joinColumn: { name: 'vehicle_id' },
    inverseJoinColumn: { name: 'ecu_id' },
  })
  ecu?: Promise<ECU[]>;

  @OneToOne(
    () => ServiceTicket,
    (service_ticket) => {
      service_ticket.vehicle;
    },
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'service_ticket_id' })
  service_ticket?: Promise<ServiceTicket>;
}
