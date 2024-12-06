import { MigrationInterface, QueryRunner } from "typeorm";

export class EcuFlashDefaultTrue1733479312222 implements MigrationInterface {
    name = 'EcuFlashDefaultTrue1733479312222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_flash" ALTER COLUMN "status" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_flash" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
