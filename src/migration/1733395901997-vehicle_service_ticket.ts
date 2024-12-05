import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleServiceTicket1733395901997 implements MigrationInterface {
    name = 'VehicleServiceTicket1733395901997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "vehicle_id" integer`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD CONSTRAINT "UQ_f55b83f763efe2c429c5987c47b" UNIQUE ("vehicle_id")`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_f55b83f763efe2c429c5987c47b" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_f55b83f763efe2c429c5987c47b"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP CONSTRAINT "UQ_f55b83f763efe2c429c5987c47b"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "vehicle_id"`);
    }

}
