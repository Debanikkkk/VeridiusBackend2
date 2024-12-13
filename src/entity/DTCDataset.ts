import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { DTC } from './DTC';
import { ECU } from './ECU';
// import { Dtc } from './Dtc'; // Make sure to import the DTC entity correctly

@Entity('dtc_dataset')
export class DtcDataset {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => DTC)
  @JoinTable({
    name: 'dtc_dataset_dtc', // Optional: this table holds the many-to-many relationship
    joinColumn: { name: 'dtc_dataset_id' },
    inverseJoinColumn: { name: 'dtc_id' },
  })
  dtcs?: DTC[];

  @ManyToMany(() => ECU, (ecu) => ecu.dtc_datasets)
  @JoinTable({
    name: 'ecu_dtc_dataset',
    joinColumn: { name: 'dtc_dataset_id' },
    inverseJoinColumn: { name: 'ecu_id' },
  })
  ecus?: ECU[];
}
