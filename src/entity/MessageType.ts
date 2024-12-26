import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { PIDDataset } from './PIDDataset';

@Entity('message')
export class MessageType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => PIDDataset, (piddataset) => piddataset.message_types, { nullable: true })
  @JoinTable({
    name: 'message_type_pid_dataset',
    joinColumn: { name: 'message_type_id' },
    inverseJoinColumn: { name: 'pid_dataset_id' },
  })
  pid_datasets?: PIDDataset[];
}
