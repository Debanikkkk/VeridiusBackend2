import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmergencyPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  startCharacter?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetHeader?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  version?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  messageType?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  deviceId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetType?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  date?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gps?: string;

  @Column({ type: 'float', nullable: true })
  latitude?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latitudeDirection?: string;

  @Column({ type: 'float', nullable: true })
  longitude?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  longitudeDirection?: string;

  @Column({ type: 'int', nullable: true })
  altitude?: number;

  @Column({ type: 'int', nullable: true })
  speed?: number;

  @Column({ type: 'int', nullable: true })
  distance?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  provider?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vehicleRegNo?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  replyNumber?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  checksum?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  crc?: string;
}
