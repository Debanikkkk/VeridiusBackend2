import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LoginPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  // @Column({ type: 'varchar', length: 1, nullable: true })
  // startCharacter?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetHeader?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vehicleRegNo?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  imei?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firmwareVersion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  protocolVersion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  device_type?: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitude?: number;

  // @Column({ type: 'varchar', length: 1, nullable: true })
  // latitudeDir?: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitude?: number;

  // @Column({ type: 'varchar', length: 1, nullable: true })
  // longitudeDir?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  checksum?: string;
}
