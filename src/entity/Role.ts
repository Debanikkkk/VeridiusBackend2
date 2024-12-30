import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
@Unique(['name', 'created_by'])
export class Role {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
  })
  name?: string;

  // @Column({ unique: true, nullable: true })
  // created_by?: string;

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

  @ManyToOne(() => User, (user) => user.role, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by?: Promise<User>;

  @Column({
    nullable: true,
    default: true,
  })
  status?: boolean;
}
