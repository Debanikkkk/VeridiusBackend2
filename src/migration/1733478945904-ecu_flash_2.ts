import { MigrationInterface, QueryRunner } from "typeorm";

export class EcuFlash21733478945904 implements MigrationInterface {
    name = 'EcuFlash21733478945904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_flash" ADD "flash_file_path" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ecu_flash" ADD "status" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_flash" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "ecu_flash" DROP COLUMN "flash_file_path"`);
    }

}
