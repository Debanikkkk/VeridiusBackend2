import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './Device';
import { Role } from './Role';
import { ServiceTicket } from './ServiceTickets';
import { Trip } from './Trip';
import { Firmware } from './Firmware';
import { File } from './File';

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
    nullable: true,
    default: true,
  })
  status?: boolean;

  @Column({
    length: 64,
  })
  email?: string;

  @OneToOne(
    () => Device,
    (device) => {
      device.assigned_to;
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

  @OneToMany(
    () => File,
    (file) => {
      file.created_by;
    },
    { nullable: true },
  )
  files?: File[];

  @OneToOne(
    () => ServiceTicket,
    (service_ticket) => {
      service_ticket.technician;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  // @JoinColumn({name: 'service_ticket_id'})
  service_ticket?: Promise<ServiceTicket>;

  @OneToMany(
    () => Trip,
    (trip) => {
      trip.user;
    },
    { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  trips?: Promise<Trip[]>;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_hierarchy',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'under_user_id', referencedColumnName: 'id' },
  })
  is_under?: Promise<User[]>;

  @OneToMany(
    () => Firmware,
    (firmware) => {
      firmware.created_by;
    },
    { nullable: true },
  )
  firmwares?: Firmware[];
}
