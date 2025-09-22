import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable: true})
    name?: string

    @Column({nullable: true})
    description?: string

    @ManyToMany(()=>(Permission), (permission)=>{permission.roles}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
   @JoinTable({
       name: 'role_n_permission',
       joinColumn: { name:'role_id' },
       inverseJoinColumn: { name: 'permission_id' },
     })
    permissions?: Permission[]

    @OneToMany(()=>(User), (user)=>{user.role}, {nullable:true})
    users?: User[]

}