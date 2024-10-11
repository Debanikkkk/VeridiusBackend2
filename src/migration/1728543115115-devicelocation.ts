import { MigrationInterface, QueryRunner } from "typeorm";

export class Devicelocation1728543115115 implements MigrationInterface {
    name = 'Devicelocation1728543115115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ADD "location" geography(point,4326) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "location"`);
    }

}
