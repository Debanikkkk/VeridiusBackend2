import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class DeviceHistory{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    device_id?: number


    @Column({
        length: 64,
    })
    name?: string

    @Column({
        length: 17,
    })
    mac_address?: string

    @Column()
    dongle_id?: number
}