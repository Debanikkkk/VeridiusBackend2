import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class ECU {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 16,
  })
  name?: string;

  @Column({
    length: 16,
  })
  mac_address?: string;

  @ManyToMany(
    () => Vehicle,
    (vehicle) => {
      vehicle.oem;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinTable({
    name: 'vehicle_ecu',
    joinColumn: { name: 'ecu_id' },
    inverseJoinColumn: { name: 'vehicle_id' },
  })
  vehicle?: Promise<Vehicle[]>;
}
