import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceLocationRemove1730790094111 implements MigrationInterface {
    name = 'DeviceLocationRemove1730790094111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "location"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ADD "location" geography(Point,4326) NOT NULL`);
    }

}
