import { MigrationInterface, QueryRunner } from "typeorm";

export class Serviceticketchanges1730885155222 implements MigrationInterface {
    name = 'Serviceticketchanges1730885155222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "created_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updated_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."service_ticket_status_enum" AS ENUM('open', 'closed', 'new')`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" "public"."service_ticket_status_enum" NOT NULL DEFAULT 'new'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."service_ticket_status_enum"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updated_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "created_on" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
