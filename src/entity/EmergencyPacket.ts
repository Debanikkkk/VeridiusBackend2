import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EmergencyPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 1 })
  startCharacter?: string;

  @Column({ type: 'varchar', length: 50 })
  packetHeader?: string;

  @Column({ type: 'varchar', length: 50 })
  version?: string;

  @Column({ type: 'varchar', length: 50 })
  vendorId?: string;

  @Column({ type: 'varchar', length: 10 })
  messageType?: string;

  @Column({ type: 'varchar', length: 15 })
  deviceId?: string;

  @Column({ type: 'varchar', length: 2 })
  packetType?: string;

  @Column({ type: 'varchar', length: 14 })
  date?: string;

  @Column({ type: 'varchar', length: 1 })
  gps?: string;

  @Column({ type: 'float' })
  latitude?: number;

  @Column({ type: 'varchar', length: 1 })
  latitudeDirection?: string;

  @Column({ type: 'float' })
  longitude?: number;

  @Column({ type: 'varchar', length: 1 })
  longitudeDirection?: string;

  @Column({ type: 'int' })
  altitude?: number;

  @Column({ type: 'int' })
  speed?: number;

  @Column({ type: 'int' })
  distance?: number;

  @Column({ type: 'varchar', length: 1 })
  provider?: string;

  @Column({ type: 'varchar', length: 15 })
  vehicleRegNo?: string;

  @Column({ type: 'varchar', length: 15 })
  replyNumber?: string;

  @Column({ type: 'varchar', length: 1 })
  checksum?: string;

  @Column({ type: 'varchar', length: 10 })
  crc?: string;
}
