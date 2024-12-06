import { MigrationInterface, QueryRunner } from "typeorm";

export class DeviceDongleConnStatusDefaultFalse1733466077162 implements MigrationInterface {
    name = 'DeviceDongleConnStatusDefaultFalse1733466077162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ALTER COLUMN "dongle_conn_status" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ALTER COLUMN "dongle_conn_status" DROP DEFAULT`);
    }

}
