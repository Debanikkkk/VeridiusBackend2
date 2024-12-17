import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Firmware } from './Firmware';
import { User } from './User';
export enum file_type {
  FSQ = 'FSQ',
  JSON = 'JSON',
  BIN = 'BIN',
}
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  file_description?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.files, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  created_by?: User;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @Column({
    type: 'enum',
    enum: file_type,
  })
  file_type?: file_type;

  @ManyToOne(() => Firmware, (firmware) => firmware.files, { nullable: true })
  @JoinColumn({ name: 'firmware_id' })
  firmware?: Firmware;
}
