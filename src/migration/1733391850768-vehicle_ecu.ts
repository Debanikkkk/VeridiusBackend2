import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleEcu1733391850768 implements MigrationInterface {
    name = 'VehicleEcu1733391850768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicle_sub_model" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_96847565666288c6d9caf94e80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_variant" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_fd2ba146ee9910ab9d2a7981ae8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "oem" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, CONSTRAINT "PK_ae51876d163064f7eed0caed5dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ecu" ("id" SERIAL NOT NULL, "name" character varying(16) NOT NULL, "mac_address" character varying(16) NOT NULL, CONSTRAINT "PK_03c818ab8101f9c9bd5dadae030" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "vehicle_model_id" integer, "vehicle_sub_model_id" integer, "vehicle_variant_id" integer, "oem_id" integer, "service_ticket_id" integer, CONSTRAINT "REL_930540d66d3b8be7a733c1db0b" UNIQUE ("service_ticket_id"), CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_model" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_557870ce4ace117b16a56c42bda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_ecu" ("ecu_id" integer NOT NULL, "vehicle_id" integer NOT NULL, CONSTRAINT "PK_2df4c8aa7eae57e77e13336e418" PRIMARY KEY ("ecu_id", "vehicle_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1a17e66d1050ff89897564576" ON "vehicle_ecu" ("ecu_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b05d478d8aec6c5464665426fe" ON "vehicle_ecu" ("vehicle_id") `);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_d2f5c06191aab95d4549fc8a803" FOREIGN KEY ("vehicle_model_id") REFERENCES "vehicle_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_6ca4c0fa9804dab09c8c7f3e93a" FOREIGN KEY ("vehicle_sub_model_id") REFERENCES "vehicle_sub_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_44998c737ae8ca1c75cae0f8431" FOREIGN KEY ("vehicle_variant_id") REFERENCES "vehicle_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_431431bcdf697c3ae0dce460104" FOREIGN KEY ("oem_id") REFERENCES "oem"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_930540d66d3b8be7a733c1db0b3" FOREIGN KEY ("service_ticket_id") REFERENCES "service_ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle_ecu" ADD CONSTRAINT "FK_c1a17e66d1050ff898975645761" FOREIGN KEY ("ecu_id") REFERENCES "ecu"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vehicle_ecu" ADD CONSTRAINT "FK_b05d478d8aec6c5464665426fe2" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_ecu" DROP CONSTRAINT "FK_b05d478d8aec6c5464665426fe2"`);
        await queryRunner.query(`ALTER TABLE "vehicle_ecu" DROP CONSTRAINT "FK_c1a17e66d1050ff898975645761"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_930540d66d3b8be7a733c1db0b3"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_431431bcdf697c3ae0dce460104"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_44998c737ae8ca1c75cae0f8431"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_6ca4c0fa9804dab09c8c7f3e93a"`);
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_d2f5c06191aab95d4549fc8a803"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b05d478d8aec6c5464665426fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1a17e66d1050ff89897564576"`);
        await queryRunner.query(`DROP TABLE "vehicle_ecu"`);
        await queryRunner.query(`DROP TABLE "vehicle_model"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TABLE "ecu"`);
        await queryRunner.query(`DROP TABLE "oem"`);
        await queryRunner.query(`DROP TABLE "vehicle_variant"`);
        await queryRunner.query(`DROP TABLE "vehicle_sub_model"`);
    }

}
