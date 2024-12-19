import { MigrationInterface, QueryRunner } from 'typeorm';

export class SuperUser1734506515016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` INSERT INTO "role" (name, description) VALUES('superUser','the super user');`);
    await queryRunner.query(
      ` INSERT INTO "user" (name, password, address, phone_number, email, role_id) VALUES('superUser','su', 'omni-backend-server', '12345', 'superuser@omni.com', (select id from role where name='superUser'));`,
    );
  }

  //eslint-disable-next-line
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
