import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class VehicleInsurance {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_insurances)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle?: Vehicle;

  @Column()
  policy_number?: string;

  @Column()
  provider_name?: string;

  @Column()
  start_date?: Date;

  @Column()
  end_date?: Date;

  @Column({ type: 'jsonb', nullable: true })
  coverage_details?: object;
}
