import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

export enum serviceTicketStatus {
  open = 'open',
  closed = 'closed',
  new = 'new',
}

@Entity()
export class ServiceTicket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date?: Date;

  @CreateDateColumn({
    name: 'createdAt',
  })
  created_on?: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updated_on?: Date;

  @Column({
    type: 'enum',
    enum: serviceTicketStatus,
    default: serviceTicketStatus.new,
  })
  status?: serviceTicketStatus;

  @Column({
    length: 17,
  })
  service_ticket_number?: string;

  @OneToOne(
    () => User,
    (user) => {
      user.service_ticket;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false },
  )
  @JoinColumn({ name: 'technician_id' })
  technician?: Promise<User>;
}
