import { MigrationInterface, QueryRunner } from "typeorm";

export class EcuFlashFileContentRemove1733465064561 implements MigrationInterface {
    name = 'EcuFlashFileContentRemove1733465064561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ecu_flash" ("id" SERIAL NOT NULL, "flashFileName" character varying(128) NOT NULL, CONSTRAINT "PK_54ed903d052fb009f610cf84fa6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ecu_flash"`);
    }

}
