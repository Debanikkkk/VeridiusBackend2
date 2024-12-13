import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsUnder1733907621973 implements MigrationInterface {
    name = 'UserIsUnder1733907621973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_1bf81b53a0a643f536e66755b62"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_d19b1857794dac857a9e29b47d9"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_9642825b253339f1dd096c5e257"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_f26846ba382cf13481c0686c08c"`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" DROP CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c"`);
        await queryRunner.query(`CREATE TABLE "user_hierarchy" ("user_id" integer NOT NULL, "under_user_id" integer NOT NULL, CONSTRAINT "PK_1b8a740c5b0c5cfb2b321cf95c7" PRIMARY KEY ("user_id", "under_user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aec31fe2f3988fd986f79fd559" ON "user_hierarchy" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5afacadda6136f307d606d8d43" ON "user_hierarchy" ("under_user_id") `);
        await queryRunner.query(`ALTER TABLE "user_hierarchy" ADD CONSTRAINT "FK_aec31fe2f3988fd986f79fd5593" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_hierarchy" ADD CONSTRAINT "FK_5afacadda6136f307d606d8d436" FOREIGN KEY ("under_user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" DROP CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_9642825b253339f1dd096c5e257"`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" DROP CONSTRAINT "FK_f26846ba382cf13481c0686c08c"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a"`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" DROP CONSTRAINT "FK_1bf81b53a0a643f536e66755b62"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_d19b1857794dac857a9e29b47d9"`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" DROP CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26"`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" DROP CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576"`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" DROP CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5"`);
        await queryRunner.query(`ALTER TABLE "user_hierarchy" DROP CONSTRAINT "FK_5afacadda6136f307d606d8d436"`);
        await queryRunner.query(`ALTER TABLE "user_hierarchy" DROP CONSTRAINT "FK_aec31fe2f3988fd986f79fd5593"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5afacadda6136f307d606d8d43"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aec31fe2f3988fd986f79fd559"`);
        await queryRunner.query(`DROP TABLE "user_hierarchy"`);
        await queryRunner.query(`ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
