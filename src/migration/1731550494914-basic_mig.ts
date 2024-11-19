import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicMig1731550494914 implements MigrationInterface {
    name = 'BasicMig1731550494914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dongle" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_3a6bac875b9c23209433f8381e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "mac_address" character varying(17) NOT NULL, "dongle_id" integer, CONSTRAINT "REL_4e45895a2aec400786bb56ed0a" UNIQUE ("dongle_id"), CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."permission_type_enum" AS ENUM('user', 'product')`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "description" character varying(64), "type" "public"."permission_type_enum", CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "description" character varying(64), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "password" character varying(16) NOT NULL, "address" character varying(64) NOT NULL, "phone_number" character varying(64) NOT NULL, "email" character varying(64) NOT NULL, "device_id" integer, "role_id" integer, CONSTRAINT "REL_0232591a0b48e1eb92f3ec5d0d" UNIQUE ("device_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."service_ticket_status_enum" AS ENUM('open', 'closed', 'new')`);
        await queryRunner.query(`CREATE TABLE "service_ticket" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."service_ticket_status_enum" NOT NULL DEFAULT 'new', "service_ticket_number" character varying(17) NOT NULL, "technician_id" integer NOT NULL, CONSTRAINT "REL_158977193099c0625411d5d208" UNIQUE ("technician_id"), CONSTRAINT "PK_ce829d561a217cafc769fcd8de6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dongle_history" ("id" SERIAL NOT NULL, "dongle_id" integer NOT NULL, "name" character varying(64) NOT NULL, "device_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9930b2ff4eafb6a084fed7609c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "device_history" ("id" SERIAL NOT NULL, "device_id" integer NOT NULL, "name" character varying(64) NOT NULL, "mac_address" character varying(17) NOT NULL, "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "dongle_id" integer, "user_id" integer, CONSTRAINT "PK_e7b12f40c596560b264d9cd68f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dtc" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "severity" character varying, CONSTRAINT "UQ_b02ca9fc06592e35344cfa16009" UNIQUE ("code"), CONSTRAINT "PK_3dc68f9057c76aaedb27a9fbb64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permission" ("permission_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_19a94c31d4960ded0dcd0397759" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e3a3ba47b7ca00fd23be4ebd6c" ON "role_permission" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d0a7155eafd75ddba5a701336" ON "role_permission" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9" FOREIGN KEY ("dongle_id") REFERENCES "dongle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_158977193099c0625411d5d2082" FOREIGN KEY ("technician_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_3d0a7155eafd75ddba5a7013368"`);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3a3ba47b7ca00fd23be4ebd6cf"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_158977193099c0625411d5d2082"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d0a7155eafd75ddba5a701336"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e3a3ba47b7ca00fd23be4ebd6c"`);
        await queryRunner.query(`DROP TABLE "role_permission"`);
        await queryRunner.query(`DROP TABLE "dtc"`);
        await queryRunner.query(`DROP TABLE "device_history"`);
        await queryRunner.query(`DROP TABLE "dongle_history"`);
        await queryRunner.query(`DROP TABLE "service_ticket"`);
        await queryRunner.query(`DROP TYPE "public"."service_ticket_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TYPE "public"."permission_type_enum"`);
        await queryRunner.query(`DROP TABLE "device"`);
        await queryRunner.query(`DROP TABLE "dongle"`);
    }

}
