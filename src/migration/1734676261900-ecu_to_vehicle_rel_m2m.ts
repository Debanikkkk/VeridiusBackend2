import { MigrationInterface, QueryRunner } from "typeorm";

export class EcuToVehicleRelM2m1734676261900 implements MigrationInterface {
    name = 'EcuToVehicleRelM2m1734676261900'

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
        await queryRunner.query(`CREATE TABLE "ecu_vehicle" ("ecu_id" integer NOT NULL, "vehicle_id" integer NOT NULL, CONSTRAINT "PK_46def9ab4267ec22eba4ebd4226" PRIMARY KEY ("ecu_id", "vehicle_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1c6fa054164e63e9a2f2e87e9d" ON "ecu_vehicle" ("ecu_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3bf40806a51152651ba2387559" ON "ecu_vehicle" ("vehicle_id") `);
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
        await queryRunner.query(`ALTER TABLE "ecu_vehicle" ADD CONSTRAINT "FK_1c6fa054164e63e9a2f2e87e9d2" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_vehicle" ADD CONSTRAINT "FK_3bf40806a51152651ba23875595" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ecu_vehicle" DROP CONSTRAINT "FK_3bf40806a51152651ba23875595"`);
        await queryRunner.query(`ALTER TABLE "ecu_vehicle" DROP CONSTRAINT "FK_1c6fa054164e63e9a2f2e87e9d2"`);
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
        await queryRunner.query(`DROP INDEX "public"."IDX_3bf40806a51152651ba2387559"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c6fa054164e63e9a2f2e87e9d"`);
        await queryRunner.query(`DROP TABLE "ecu_vehicle"`);
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
