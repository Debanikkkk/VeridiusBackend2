import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTicketEnum1730805581010 implements MigrationInterface {
    name = 'ServiceTicketEnum1730805581010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" boolean NOT NULL`);
    }

}
