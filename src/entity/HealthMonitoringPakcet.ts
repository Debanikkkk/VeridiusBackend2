import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HealthMonitoringPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 1 })
  startCharacter?: string;

  @Column({ type: 'varchar', length: 50 })
  header?: string;

  @Column({ type: 'varchar', length: 50 })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50 })
  firmwareVersion?: string;

  @Column({ type: 'varchar', length: 15 })
  imei?: string;

  @Column({ type: 'int' })
  batteryPercentage?: number;

  @Column({ type: 'int' })
  lowBatteryThresholdPercentage?: number;

  @Column({ type: 'float' })
  memoryPercentage1?: number;

  @Column({ type: 'float' })
  memoryPercentage2?: number;

  @Column({ type: 'int' })
  dataUpdateRateWhenIgnitionOn?: number;

  @Column({ type: 'int' })
  dataUpdateRateWhenIgnitionOff?: number;

  @Column({ type: 'varchar', length: 4 })
  digitalInputStatus?: string;

  @Column({ type: 'float', nullable: true })
  analogInput1Status?: number;

  @Column({ type: 'float', nullable: true })
  analogInput2Status?: number;

  @Column({ type: 'varchar', length: 1 })
  endCharacter?: string;

  @Column({ type: 'varchar', length: 10 })
  checksum?: string;
}
