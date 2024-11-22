import { MigrationInterface, QueryRunner } from "typeorm";

export class DbFix21732260177618 implements MigrationInterface {
    name = 'DbFix21732260177618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_monitoring_packet" DROP COLUMN "endCharacter"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_monitoring_packet" ADD "endCharacter" character varying(1) NOT NULL`);
    }

}
