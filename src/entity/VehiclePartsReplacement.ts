import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Vehicle } from './Vehicle';
import { User } from './User';

@Entity()
export class VehiclePartsReplacement {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_parts_replacements)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle?: Vehicle;

  @Column()
  part_name?: string;

  @Column()
  part_number?: string;

  @Column()
  replacement_date?: Date;

  @Column()
  cost?: number;

  @CreateDateColumn({
    nullable: true,
  })
  replaced_at?: Date;
  @Column()
  warranty_expiry?: Date;

  // @Column()
  // replaced_by?: string;

  @ManyToOne(
    () => User,
    (user) => {
      user.vehicleparts;
    },
    { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn({ name: 'technician_id' })
  technician?: User;
}
