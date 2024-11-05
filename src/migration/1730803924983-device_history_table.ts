import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceHistoryTable1730803924983 implements MigrationInterface {
    name = 'DeviceHistoryTable1730803924983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_history" ("id" SERIAL NOT NULL, "device_id" integer NOT NULL, "name" character varying(64) NOT NULL, "mac_address" character varying(17) NOT NULL, "dongle_id" integer NOT NULL, CONSTRAINT "PK_e7b12f40c596560b264d9cd68f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "device_history"`);
    }

}
