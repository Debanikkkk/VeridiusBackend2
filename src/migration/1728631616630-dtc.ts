import { MigrationInterface, QueryRunner } from "typeorm";

export class Dtc1728631616630 implements MigrationInterface {
    name = 'Dtc1728631616630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dtc" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "severity" character varying, CONSTRAINT "UQ_b02ca9fc06592e35344cfa16009" UNIQUE ("code"), CONSTRAINT "PK_3dc68f9057c76aaedb27a9fbb64" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dtc"`);
    }

}
