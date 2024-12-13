import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ecu_attributes')
export class ECUAttributeList {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  attributeName?: string;

  @Column({ type: 'varchar', length: 255 })
  attributeValue?: string;

  @Column({ type: 'boolean' })
  status?: boolean;

  @Column({ type: 'boolean' })
  isActive?: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
