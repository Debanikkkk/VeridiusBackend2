import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { PID } from './PID'; // Import the PID entity

@Entity('parameters')
export class Parameters {
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
  @ManyToMany(() => PID, (pid) => pid.parameters)
  @JoinTable({
    name: 'parameter_pid',
    joinColumn: { name: 'parameter_id' },
    inverseJoinColumn: { name: 'pid_id' },
  })
  pids?: PID[];
}
