import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleDeviceHistoryStChanges1730879022713 implements MigrationInterface {
    name = 'RoleDeviceHistoryStChanges1730879022713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "created_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updated_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "device_history" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "device_history" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device_history" ALTER COLUMN "dongle_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_history" ALTER COLUMN "dongle_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "device_history" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "device_history" DROP COLUMN "updatedOn"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updated_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "created_on"`);
    }

}
