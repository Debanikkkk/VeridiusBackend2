import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  @Column({
    length: 64,
    nullable: true,
  })
  description?: string;

  @ManyToMany(
    () => Permission,
    (permissions) => {
      permissions.role;
    },
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false },
  )
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions?: Promise<Permission[]>;

  @OneToMany(() => User, (user) => user.role, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  users?: Promise<User[]>;

  // @ManyToMany(()=>(Role), (role)=>(role.role), {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
  // @JoinTable({
  //     name:'role_role',
  //     joinColumn:{name: 'role_id'},
  //     inverseJoinColumn:{name:'sub_role_id'}
  // })
  // sub_role?: Promise<Role[]>

  // @ManyToMany(()=>(Role), (role)=>(role.role), {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
  // @JoinTable({
  //     name:'role_role',
  //     joinColumn:{name: 'sub_role_id'},
  //     inverseJoinColumn:{name:'role_id'}
  // })
  // role?: Promise<Role[]>
}
