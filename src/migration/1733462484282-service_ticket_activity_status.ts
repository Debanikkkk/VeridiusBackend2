import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTicketActivityStatus1733462484282 implements MigrationInterface {
    name = 'ServiceTicketActivityStatus1733462484282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "active" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "active"`);
    }

}
