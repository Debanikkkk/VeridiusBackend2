import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
enum jobCardStatus{
 open='open',
 closed='closed',
 new='new'
}
@Entity()
export class ServiceTickets{
@PrimaryGeneratedColumn()
id?: number

@Column({
    type: 'timestamp',
    default: ()=>'CURRENT_TIMESTAMP'
})
date?: Date

@Column()
status?: boolean

}