import { MigrationInterface, QueryRunner } from 'typeorm';

export class SuperAdminActual1734590045727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` INSERT INTO "role" (name, description) VALUES('super_admin','the super admin');`);
    await queryRunner.query(` INSERT INTO "role" (name, description) VALUES('technician','technician which uses the application on mobile device');`);
    await queryRunner.query(
      ` INSERT INTO "role" (name, description) VALUES('navmatic_user','user of omni navmatic, single person telematics user');`,
    );
    await queryRunner.query(` INSERT INTO "role" (name, description) VALUES('elm_user','user of ELM module of omni');`);
    await queryRunner.query(
      ` INSERT INTO "user" (name, password, address, phone_number, email, role_id) VALUES('Navian','N@v1g0', 'omni-backend-server', '12345', 'superuser123@omni.com', (select id from role where name='super_admin'));`,
    );
  }
  //eslint-disable-next-line
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
