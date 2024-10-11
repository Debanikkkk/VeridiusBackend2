import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({
        length: 64,
    })
    name?: string

    @Column({
        length: 64,
        nullable: true
    })
    description?: string

    @ManyToMany(()=>(Role), (role)=>{role.permissions}, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
    @JoinTable({
        name: 'role_permission',
        joinColumn: {name: 'permission_id'},
        inverseJoinColumn:{name:'role_id'},
    })
    role?: Promise<Role[]>


}