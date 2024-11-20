import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrackingPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 1 })
  startCharacter?: string;

  @Column({ type: 'varchar', length: 50 })
  version?: string;

  @Column({ type: 'varchar', length: 50 })
  packetHeader?: string;

  @Column({ type: 'varchar', length: 50 })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50 })
  firmwareVersion?: string;

  @Column({ type: 'varchar', length: 2 })
  packetType?: string;

  @Column({ type: 'int' })
  messageId?: number;

  @Column({ type: 'varchar', length: 1 })
  packetStatus?: string;

  @Column({ type: 'varchar', length: 15 })
  imei?: string;

  @Column({ type: 'varchar', length: 20 })
  vehicleRegNo?: string;

  @Column({ type: 'int' })
  gpsFix?: number;

  @Column({ type: 'varchar', length: 8 })
  date?: string;

  @Column({ type: 'varchar', length: 6 })
  time?: string;

  @Column({ type: 'float' })
  latitude?: number;

  @Column({ type: 'varchar', length: 1 })
  latitudeDir?: string;

  @Column({ type: 'float' })
  longitude?: number;

  @Column({ type: 'varchar', length: 1 })
  longitudeDir?: string;

  @Column({ type: 'float' })
  speed?: number;

  @Column({ type: 'float' })
  heading?: number;

  @Column({ type: 'int' })
  noOfSatellites?: number;

  @Column({ type: 'int' })
  altitude?: number;

  @Column({ type: 'float' })
  pdop?: number;

  @Column({ type: 'float' })
  hdop?: number;

  @Column({ type: 'varchar', length: 20 })
  networkOperatorName?: string;

  @Column({ type: 'int' })
  ignitionStatus?: number;

  @Column({ type: 'int' })
  mainPowerStatus?: number;

  @Column({ type: 'float' })
  mainInputVoltage?: number;

  @Column({ type: 'float' })
  internalBatteryVoltage?: number;

  @Column({ type: 'int' })
  emergencyStatus?: number;

  @Column({ type: 'varchar', length: 1 })
  tamperAlert?: string;

  @Column({ type: 'int' })
  gsmSignalStrength?: number;

  @Column({ type: 'int' })
  mccServing?: number;

  @Column({ type: 'int' })
  mncServing?: number;

  @Column({ type: 'varchar', length: 4 })
  lacServing?: string;

  @Column({ type: 'varchar', length: 4 })
  cellIdServing?: string;

  @Column({ type: 'int' })
  gsmSignalStrengthNmr1stNeighbour?: number;

  @Column({ type: 'varchar', length: 4 })
  lacNmr1stNeighbour?: string;

  @Column({ type: 'varchar', length: 4 })
  cellIdNmr1stNeighbour?: string;

  @Column({ type: 'int' })
  gsmSignalStrengthNmr2ndNeighbour?: number;

  @Column({ type: 'varchar', length: 4 })
  lacNmr2ndNeighbour?: string;

  @Column({ type: 'varchar', length: 4 })
  cellIdNmr2ndNeighbour?: string;

  @Column({ type: 'int' })
  gsmSignalStrengthNmr3rdNeighbour?: number;

  @Column({ type: 'varchar', length: 4 })
  lacNmr3rdNeighbour?: string;

  @Column({ type: 'varchar', length: 4 })
  cellIdNmr3rdNeighbour?: string;

  @Column({ type: 'int' })
  gsmSignalStrengthNmr4thNeighbour?: number;

  @Column({ type: 'varchar', length: 4 })
  lacNmr4thNeighbour?: string;

  @Column({ type: 'varchar', length: 4 })
  cellIdNmr4thNeighbour?: string;

  @Column({ type: 'varchar', length: 4 })
  digitalInputStatus?: string;

  @Column({ type: 'varchar', length: 2 })
  digitalOutputStatus?: string;

  @Column({ type: 'int' })
  frameNumber?: number;

  @Column({ type: 'float' })
  analogInput1?: number;

  @Column({ type: 'float' })
  analogInput2?: number;

  @Column({ type: 'int' })
  deltaDistance?: number;

  @Column({ type: 'varchar', length: 50 })
  otaResponse?: string;

  @Column({ type: 'varchar', length: 1 })
  endCharacter?: string;

  @Column({ type: 'varchar', length: 20 })
  checksum?: string;
}
