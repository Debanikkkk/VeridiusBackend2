import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceConnStatusAddFlashFileNameChange1733466011291 implements MigrationInterface {
    name = 'DeviceConnStatusAddFlashFileNameChange1733466011291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_flash" RENAME COLUMN "flashFileName" TO "flash_file_name"`);
        await queryRunner.query(`ALTER TABLE "device" ADD "dongle_conn_status" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "dongle_conn_status"`);
        await queryRunner.query(`ALTER TABLE "ecu_flash" RENAME COLUMN "flash_file_name" TO "flashFileName"`);
    }

}
