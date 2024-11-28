import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HealthMonitoringPacket {
  @PrimaryGeneratedColumn()
  id?: number;

  // @Column({ type: 'varchar', length: 1 , nullable: true})
  // startCharacter?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  header?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vendorId?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  version?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firmwareVersion?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  imei?: string;

  @Column({ type: 'int', nullable: true })
  batteryPercentage?: number;

  @Column({ type: 'int', nullable: true })
  lowBatteryThresholdPercentage?: number;

  @Column({ type: 'float', nullable: true })
  memoryPercentage1?: number;

  @Column({ type: 'float', nullable: true })
  memoryPercentage2?: number;

  @Column({ type: 'int', nullable: true })
  dataUpdateRateWhenIgnitionOn?: number;

  @Column({ type: 'int', nullable: true })
  dataUpdateRateWhenIgnitionOff?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  digitalInputStatus?: string;

  @Column({ type: 'float', nullable: true })
  analogInput1Status?: number;

  @Column({ type: 'float', nullable: true })
  analogInput2Status?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  checksum?: string;
}
