import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './Device';
import { Role } from './Role';
import { ServiceTicket } from './ServiceTickets';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @Column({
    length: 16,
  })
  password?: string;

  @Column({
    length: 64,
  })
  address?: string;

  @Column({
    length: 64,
  })
  phone_number?: string;

  @Column({
    length: 64,
  })
  email?: string;

  @OneToOne(
    () => Device,
    (device) => {
      device.user;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'device_id' })
  device?: Device | null;

  @ManyToOne(
    () => Role,
    (role) => {
      role.users;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({
    name: 'role_id',
  })
  role?: Promise<Role>;

  @OneToOne(
    () => ServiceTicket,
    (service_ticket) => {
      service_ticket.technician;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false },
  )
  // @JoinColumn({name: 'service_ticket_id'})
  service_ticket?: Promise<ServiceTicket>;
}
