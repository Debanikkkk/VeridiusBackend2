import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Firmware } from './Firmware';

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

  // @Column({ type: 'varchar', length: 255, nullable: true })
  // uploaded_by?: string;

  @Column({ type: 'boolean', default: true })
  is_active?: boolean;

  @ManyToOne(() => Firmware, (firmware) => firmware.files, { nullable: true })
  @JoinColumn({ name: 'firmware_id' })
  firmware?: Promise<Firmware>;
}
