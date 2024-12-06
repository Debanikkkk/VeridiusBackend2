import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTicketActivityStatusDefaultFalse1733462590137 implements MigrationInterface {
    name = 'ServiceTicketActivityStatusDefaultFalse1733462590137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" ALTER COLUMN "active" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" ALTER COLUMN "active" DROP DEFAULT`);
    }

}
