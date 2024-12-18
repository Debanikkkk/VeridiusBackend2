import { MigrationInterface, QueryRunner } from 'typeorm';

export class SuperUser1734501868083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` INSERT INTO "role" (name, description) VALUES('superUser','the super user');`);
    await queryRunner.query(
      ` INSERT INTO "user" (name, password, address, phone_number, email) VALUES('superUser','su', 'omni-backend-server', '12345', 'superuser@omni.com');`,
    );
  }
  // eslint-disable-next-line
  public async down(__queryRunner: QueryRunner): Promise<void> {}
}
