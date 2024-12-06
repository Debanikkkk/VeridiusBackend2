import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Dongle } from './Dongle';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @Column({
    nullable: true,
    default: false,
  })
  dongle_conn_status?: boolean;

  @Column({
    length: 17,
    nullable: true,
  })
  mac_address?: string;

  @Column({
    nullable: true,
    length: 15,
  })
  imei?: string;
  // @Column({
  //     type: 'geography',
  //     spatialFeatureType: 'point',
  //     srid: 4326
  // })
  // location?: string

  @OneToOne(
    () => User,
    (user) => {
      user.device;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  // @JoinColumn({name: 'user_id'})
  user?: Promise<User> | null;

  @OneToOne(
    () => Dongle,
    (dongle) => {
      dongle.device;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  )
  @JoinColumn({ name: 'dongle_id' })
  dongle?: Dongle | null;
}
