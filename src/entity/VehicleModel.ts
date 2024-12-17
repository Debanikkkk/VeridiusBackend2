import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { OEM } from './OEM';
import { Vehicle } from './Vehicle';
import { VehicleSegment } from './VehicleSegment';
import { VehicleSubModel } from './VehicleSubModel';
import { VehicleVersion } from './VehicleVersion';

@Entity()
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @ManyToOne(() => OEM, (oem) => oem.vehicle_models)
  @JoinColumn({ name: 'oem_id' })
  oem?: OEM;

  @ManyToOne(() => VehicleVersion, (version) => version.vehicle_models)
  @JoinColumn({ name: 'vehicle_version_id' })
  vehicle_version?: VehicleVersion;

  @Column()
  launch_year?: Date;

  @Column({ nullable: true })
  discontinued_year?: Date;

  @ManyToOne(() => VehicleSegment, (segment) => segment.vehicle_models)
  @JoinColumn({ name: 'vehicle_segment_id' })
  vehicle_segment?: VehicleSegment;

  @OneToMany(() => VehicleSubModel, (subModel) => subModel.vehicle_model)
  vehicle_sub_models?: VehicleSubModel[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_model)
  vehicles?: Vehicle[];
}
