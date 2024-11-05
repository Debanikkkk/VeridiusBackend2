import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceNDongle1730788858518 implements MigrationInterface {
    name = 'DeviceNDongle1730788858518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dongle" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_3a6bac875b9c23209433f8381e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_tickets" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL, CONSTRAINT "PK_bae2cfa32a1181e6339d559812e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service_tickets"`);
        await queryRunner.query(`DROP TABLE "dongle"`);
    }

}
