import { MigrationInterface, QueryRunner } from "typeorm";

export class Geofence1733210667838 implements MigrationInterface {
    name = 'Geofence1733210667838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION postgis`);
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "radius"`);
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "tariff"`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "polygon" geometry(Polygon,4326) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "geofence" DROP COLUMN "polygon"`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "tariff" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "radius" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "longitude" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "geofence" ADD "latitude" double precision NOT NULL`);
        await queryRunner.query(`DROP EXTENSION postgis`);
    }

}
