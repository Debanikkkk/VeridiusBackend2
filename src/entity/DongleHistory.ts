import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DongleHistory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  dongle_id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @Column()
  device_id?: number;

  @Column()
  user_id?: number;
  //   @OneToOne(
  //     () => Device,
  //     (device) => {
  //       device.dongle;
  //     },
  //     { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true },
  //   )
  //   device?: Promise<Device> | null;
}
