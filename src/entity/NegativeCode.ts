import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
// import { EcuManagement } from './EcuManagement'; // Import the EcuManagement entity
import { ECU } from './ECU';

@Entity('negative_response_codes')
export class NegativeResponseCode {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  response_code?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToMany(() => ECU, (ecuManagement) => ecuManagement.negative_responses)
  @JoinTable({
    name: 'ecu_neg',
    joinColumn: { name: 'neg_id' },
    inverseJoinColumn: { name: 'ecu_id' },
  })
  ecus?: ECU[];
}
