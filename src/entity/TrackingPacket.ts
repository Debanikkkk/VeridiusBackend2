import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrackingPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 1, nullable: true })
  startCharacter?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  version?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetHeader?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firmwareVersion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetType?: string;

  @Column({ type: 'int', nullable: true })
  messageId?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  packetStatus?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  imei?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  vehicleRegNo?: string;

  @Column({ type: 'int', nullable: true })
  gpsFix?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  date?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  time?: string;

  @Column({ type: 'float', nullable: true })
  latitude?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  latitudeDir?: string;

  @Column({ type: 'float', nullable: true })
  longitude?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  longitudeDir?: string;

  @Column({ type: 'float', nullable: true })
  speed?: number;

  @Column({ type: 'float', nullable: true })
  heading?: number;

  @Column({ type: 'int', nullable: true })
  noOfSatellites?: number;

  @Column({ type: 'int', nullable: true })
  altitude?: number;

  @Column({ type: 'float', nullable: true })
  pdop?: number;

  @Column({ type: 'float', nullable: true })
  hdop?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  networkOperatorName?: string;

  @Column({ type: 'int', nullable: true })
  ignitionStatus?: number;

  @Column({ type: 'int', nullable: true })
  mainPowerStatus?: number;

  @Column({ type: 'float', nullable: true })
  mainInputVoltage?: number;

  @Column({ type: 'float', nullable: true })
  internalBatteryVoltage?: number;

  @Column({ type: 'int', nullable: true })
  emergencyStatus?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tamperAlert?: string;

  @Column({ type: 'int', nullable: true })
  gsmSignalStrength?: number;

  @Column({ type: 'int', nullable: true })
  mccServing?: number;

  @Column({ type: 'int', nullable: true })
  mncServing?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lacServing?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cellIdServing?: string;

  @Column({ type: 'int', nullable: true })
  gsmSignalStrengthNmr1stNeighbour?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lacNmr1stNeighbour?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cellIdNmr1stNeighbour?: string;

  @Column({ type: 'int', nullable: true })
  gsmSignalStrengthNmr2ndNeighbour?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lacNmr2ndNeighbour?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cellIdNmr2ndNeighbour?: string;

  @Column({ type: 'int', nullable: true })
  gsmSignalStrengthNmr3rdNeighbour?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lacNmr3rdNeighbour?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cellIdNmr3rdNeighbour?: string;

  @Column({ type: 'int', nullable: true })
  gsmSignalStrengthNmr4thNeighbour?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lacNmr4thNeighbour?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cellIdNmr4thNeighbour?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  digitalInputStatus?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  digitalOutputStatus?: string;

  @Column({ type: 'int', nullable: true })
  frameNumber?: number;

  @Column({ type: 'float', nullable: true })
  analogInput1?: number;

  @Column({ type: 'float', nullable: true })
  analogInput2?: number;

  @Column({ type: 'int', nullable: true })
  deltaDistance?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  otaResponse?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  endCharacter?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  checksum?: string;
}
