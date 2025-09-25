import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    name?: string

    @Column({nullable: true})
    description?: string

    @ManyToMany(()=>(Role), (role)=>{role.permissions}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
   @JoinTable({
       name: 'role_n_permission',
       joinColumn: { name:'permission_id' },
       inverseJoinColumn: { name: 'role_id' },
     })
    roles?: Role[]
}