import { MigrationInterface, QueryRunner } from "typeorm";

export class FileToFirmwareRelation1734347025058 implements MigrationInterface {
    name = 'FileToFirmwareRelation1734347025058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365"`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" DROP CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_1bf81b53a0a643f536e66755b62"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_f26846ba382cf13481c0686c08c"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_9642825b253339f1dd096c5e257"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_d19b1857794dac857a9e29b47d9"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c"`);
        await queryRunner.query(`CREATE TYPE "public"."file_file_type_enum" AS ENUM('FSQ', 'JSON', 'BIN')`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "file" character varying(255), "file_name" character varying(255), "file_description" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "file_type" "public"."file_file_type_enum" NOT NULL, "firmware_id" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "file"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" DROP COLUMN "file_description"`);
        await queryRunner.query(`ALTER TYPE "public"."firmware_management_firmware_type_enum" RENAME TO "firmware_management_firmware_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."firmware_management_firmware_type_enum" AS ENUM('DEVOTA', 'FOTA')`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ALTER COLUMN "firmware_type" TYPE "public"."firmware_management_firmware_type_enum" USING "firmware_type"::"text"::"public"."firmware_management_firmware_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."firmware_management_firmware_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_7f1b4e823d48a864ba999832ad2" FOREIGN KEY ("firmware_id") REFERENCES "firmware_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_1bf81b53a0a643f536e66755b62"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_d19b1857794dac857a9e29b47d9"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_f26846ba382cf13481c0686c08c"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_9642825b253339f1dd096c5e257"`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" DROP CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_7f1b4e823d48a864ba999832ad2"`);
        await queryRunner.query(`CREATE TYPE "public"."firmware_management_firmware_type_enum_old" AS ENUM('DEVOTA', 'DOTA')`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ALTER COLUMN "firmware_type" TYPE "public"."firmware_management_firmware_type_enum_old" USING "firmware_type"::"text"::"public"."firmware_management_firmware_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."firmware_management_firmware_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."firmware_management_firmware_type_enum_old" RENAME TO "firmware_management_firmware_type_enum"`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "file_description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "file_name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "file" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "firmware_management" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_file_type_enum"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
