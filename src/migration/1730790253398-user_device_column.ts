import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDeviceColumn1730790253398 implements MigrationInterface {
    name = 'UserDeviceColumn1730790253398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "device_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1" UNIQUE ("device_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "device_id"`);
    }

}
