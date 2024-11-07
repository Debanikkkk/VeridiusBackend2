import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dtc')
export class DTC {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  code?: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  severity?: string; // Optional: to indicate severity levels, if applicable
}
