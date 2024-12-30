import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ecu_attributes')
export class ECUAttributeList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  attribute_name?: string;

  @Column({ type: 'varchar', length: 255 })
  attribute_value?: string;

  @Column({ type: 'boolean' })
  status?: boolean;

  @Column({ type: 'boolean' })
  is_active?: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
