import { MigrationInterface, QueryRunner } from "typeorm";

export class DbFix1732260127204 implements MigrationInterface {
    name = 'DbFix1732260127204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_monitoring_packet" DROP COLUMN "startCharacter"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_monitoring_packet" ADD "startCharacter" character varying(1) NOT NULL`);
    }

}
