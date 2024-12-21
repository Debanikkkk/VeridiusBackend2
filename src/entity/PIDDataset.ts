import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { PID } from './PID'; // Import the PID entity
import { ECU } from './ECU';
import { MessageType } from './MessageType';

@Entity('pid_dataset')
export class PIDDataset {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  // Many-to-many relationship with PID
  @ManyToMany(() => PID, (pid) => pid.pid_datasets, { nullable: true })
  @JoinTable({
    name: 'pid_dataset_pid',
    joinColumn: { name: 'pid_dataset_id' },
    inverseJoinColumn: { name: 'pid_id' },
  })
  pids?: PID[];

  @ManyToMany(() => ECU, (ecu) => ecu.pid_datasets, { nullable: true })
  @JoinTable({
    name: 'ecu_pid_dataset',
    joinColumn: { name: 'pid_dataset_id' },
    inverseJoinColumn: { name: 'ecu_id' },
  })
  ecus?: ECU[];

  @ManyToMany(
    () => MessageType,
    (messageType) => {
      messageType.pid_datasets;
    },
    { nullable: true },
  )
  @JoinTable({
    name: 'message_type_pid_dataset',
    joinColumn: { name: 'pid_dataset_id' },
    inverseJoinColumn: { name: 'message_type_id' },
  })
  message_types?: MessageType[];
}
