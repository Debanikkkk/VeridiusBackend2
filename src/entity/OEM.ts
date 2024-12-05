import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class OEM {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 16,
  })
  name?: string;

  @OneToMany(
    () => Vehicle,
    (vehicle) => {
      vehicle.oem;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  vehicle?: Promise<Vehicle[]>;
}
