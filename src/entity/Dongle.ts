import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Device } from "./Device";

@Entity()
export class Dongle{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    
    @OneToOne(()=>(Device), (device)=>{device.dongle},  {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
    device?: Promise<Device>
}