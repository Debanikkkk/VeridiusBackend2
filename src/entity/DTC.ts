import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { DtcDataset } from './DTCDataset';

@Entity('dtc')
export class DTC {
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

  @ManyToMany(() => DtcDataset)
  @JoinTable({
    name: 'dtc_dataset_dtc', // Optional: this table holds the many-to-many relationship
    joinColumn: { name: 'dtc_id' },
    inverseJoinColumn: { name: 'dtc_dataset_id' },
  })
  dtc_dataset?: DtcDataset[];
}
