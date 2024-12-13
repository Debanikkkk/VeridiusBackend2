import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicle } from './Vehicle';

@Entity()
export class Dealer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  location?: string;

  @Column({ type: 'jsonb', nullable: true })
  contact_information?: object;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.dealer)
  vehicles?: Vehicle[];
}
