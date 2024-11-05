import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceRelationMapToUserRemoved1730790641641 implements MigrationInterface {
    name = 'DeviceRelationMapToUserRemoved1730790641641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "user_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_ae7154510495c7ddda951b07a07" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_ae7154510495c7ddda951b07a07" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
