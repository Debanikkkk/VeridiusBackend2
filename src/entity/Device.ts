import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Device{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column({
        length: 17,
    })
    mac_address?: string

    @Column({
        type: 'geography',
        spatialFeatureType: 'point',
        srid: 4326
    })
    location?: string
    @OneToOne(()=>(User), (user)=>{user.device},  {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true})
    user?: Promise<User>
}