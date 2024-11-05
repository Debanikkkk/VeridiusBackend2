import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceRelationMap1730790559281 implements MigrationInterface {
    name = 'DeviceRelationMap1730790559281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_ae7154510495c7ddda951b07a07" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD "dongle_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_4e45895a2aec400786bb56ed0a9" UNIQUE ("dongle_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_ae7154510495c7ddda951b07a07" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9" FOREIGN KEY ("dongle_id") REFERENCES "dongle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_4e45895a2aec400786bb56ed0a9"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "dongle_id"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "user_id"`);
    }

}
