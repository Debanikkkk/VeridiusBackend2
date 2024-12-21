import { MigrationInterface, QueryRunner } from 'typeorm';

export class RolePermissionAssigment1734697248905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      
INSERT INTO permission (name, description, type)
VALUES
('viewtechnician', 'Permission to view technician data', 'user'),
('managetechnician', 'Permission to manage technician data', 'user'),
('viewadmin', 'Permission to view admin data', 'user'),
('manageadmin', 'Permission to manage admin data', 'user'),
('viewnavmatic_user', 'Permission to view navmatic user data', 'user'),
('managenavmatic_user', 'Permission to manage navmatic user data', 'user'),
('viewelm_user', 'Permission to view ELM user data', 'user'),
('manageelm_user', 'Permission to manage ELM user data', 'user');


WITH super_admin_role AS (
    SELECT id AS role_id FROM role WHERE name = 'super_admin'
),
permission_list AS (
    SELECT id AS permission_id FROM permission
    WHERE name IN (
        'viewtechnician', 'managetechnician',
        'viewadmin', 'manageadmin',
        'viewnavmatic_user', 'managenavmatic_user',
        'viewelm_user', 'manageelm_user'
    )
)

INSERT INTO role_permission (role_id, permission_id)
SELECT super_admin_role.role_id, permission_list.permission_id
FROM super_admin_role, permission_list;

            `);
  }

  //eslint-disable-next-line
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
