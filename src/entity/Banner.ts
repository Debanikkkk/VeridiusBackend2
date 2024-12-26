import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('banners')
export class Banners {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255 })
  product_name?: string;

  @Column({ length: 255 })
  product_tag?: string;

  @Column({ length: 255 })
  product_img?: string;

  @Column({})
  product_description?: string;

  @Column({ length: 512 })
  product_link?: string;

  @Column({ type: 'float' })
  rating?: number;

  @Column({ type: 'int' })
  priority?: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at?: Date;
}
