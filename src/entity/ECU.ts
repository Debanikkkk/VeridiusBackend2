import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { NegativeResponseCode } from './NegativeCode';
import { Vehicle } from './Vehicle';
// import { NegativeResponseCode } from 'src/entity/NegativeResponseCode'; // Import the NegativeResponseCode entity

@Entity('ecu_management')
export class ECU {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mac_id?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ecu_name?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  protocol?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  dtc_dataset?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pid_dataset?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  rx_header?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tx_header?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  read_dtc_fc_index?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  clear_dtc_fn_index?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  read_data_fn_index?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  write_data_fn_index?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  seedkey_algo_fn_index?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ior_test_index?: string;

  @ManyToMany(() => NegativeResponseCode, (negativeResponseCode) => negativeResponseCode.ecus)
  @JoinTable({
    name: 'ecu_neg',
    joinColumn: { name: 'ecu_id' },
    inverseJoinColumn: { name: 'neg_id' },
  })
  negative_responses?: NegativeResponseCode[];

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.ecu, { nullable: true })
  @JoinColumn({
    name: 'vehicle_id',
  })
  vehicle?: Vehicle;
}
