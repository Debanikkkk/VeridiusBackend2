import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
// import { Vehicle } from './Vehicle'; // Import the Vehicle entity
import { ECU } from './ECU';
import { User } from './User';
import { File } from './File';

export enum firmware_management {
  DEVOTA = 'DEVOTA',
  FOTA = 'FOTA',
}
@Entity('firmware_management')
export class Firmware {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firmware_version?: string;

  @Column({
    type: 'enum',
    enum: firmware_management,
    // default: firmware_management.,
  })
  firmware_type?: firmware_management;

  @ManyToOne(
    () => User,
    (user) => {
      user.firmwares;
    },
    { nullable: true },
  )
  @JoinColumn({ name: 'created_by' })
  created_by?: User;

  @OneToMany(
    () => ECU,
    (ecu) => {
      ecu.firmware;
    },
    { nullable: true },
  )
  ecus?: ECU[];

  @OneToMany(() => File, (file) => file.firmware, { nullable: true })
  files?: Promise<File[]>;
}
