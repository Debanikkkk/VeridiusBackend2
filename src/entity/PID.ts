import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { PIDDataset } from './PIDDataset';
import { Parameters } from './Parameters';
// import { PIDDataset } from './PIDDataset'; // Import the PIDDataset entity

@Entity('pid')
export class PID {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pid_code?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  long_name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  short_name?: string;

  @Column({ type: 'boolean', default: true })
  active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ type: 'int', nullable: true })
  total_length?: number;

  @Column({ type: 'int', nullable: true })
  byte_position?: number;

  @Column({ type: 'int', nullable: true })
  length_bytes?: number;

  @Column({ type: 'boolean', default: false })
  bit_coded?: boolean;

  @Column({ type: 'float', nullable: true })
  resolution?: number;

  @Column({ type: 'float', nullable: true })
  offset?: number;

  @Column({ type: 'float', nullable: true })
  min?: number;

  @Column({ type: 'float', nullable: true })
  max?: number;

  @Column({ type: 'boolean', default: false })
  read?: boolean;

  @Column({ type: 'boolean', default: false })
  write?: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string;

  // Many-to-many relationship with PIDDataset
  @ManyToMany(() => PIDDataset, (pidDataset) => pidDataset.pids)
  @JoinTable({
    name: 'pid_dataset_pid',
    joinColumn: { name: 'pid_id' },
    inverseJoinColumn: { name: 'pid_dataset_id' },
  })
  pid_datasets?: PIDDataset[];

  @ManyToMany(() => Parameters, (parameters) => parameters.pids)
  @JoinTable({
    name: 'parameter_pid',
    joinColumn: { name: 'pid_id' },
    inverseJoinColumn: { name: 'parameter_id' },
  })
  parameters?: Parameters[];
}
