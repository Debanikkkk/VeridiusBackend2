import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
export enum jobCardStatus{
 open='open',
 closed='closed',
 new='new'
}
@Entity()
export class ServiceTicket{
@PrimaryGeneratedColumn()
id?: number

@Column({
    type: 'timestamp',
    default: ()=>'CURRENT_TIMESTAMP'
})
date?: Date

@Column()
status?: jobCardStatus

@Column({
    length: 17
})
service_ticket_number?: string

@OneToOne(()=>(User), (user)=>{user.service_ticket},  {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
@JoinColumn({name: 'technician_id'})
technician?: Promise<User>
}