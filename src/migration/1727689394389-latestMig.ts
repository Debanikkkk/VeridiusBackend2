import { MigrationInterface, QueryRunner } from "typeorm";

export class LatestMig1727689394389 implements MigrationInterface {
    name = 'LatestMig1727689394389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "description" character varying(64)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "description" character varying(17) NOT NULL`);
    }

}
