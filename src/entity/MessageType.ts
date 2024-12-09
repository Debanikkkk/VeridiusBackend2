import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { MessageType } from './MessageType'; // Import the enum

enum MessageTypeEnum {}
@Entity('message')
export class MessageType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({
    type: 'enum',
    enum: MessageType, // Use the enum here
    nullable: true,
  })
  message_type?: MessageTypeEnum;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
