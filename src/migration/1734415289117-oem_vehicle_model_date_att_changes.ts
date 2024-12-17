import { MigrationInterface, QueryRunner } from 'typeorm';

export class OemVehivleModelDateAttChanges1734415289117 implements MigrationInterface {
  name = 'OemVehivleModelDateAttChanges1734415289117';

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
    await queryRunner.query(
      `ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_bc92530a3bb4ba6548f5ccbc87c" FOREIGN KEY ("dtc_dataset_id") REFERENCES "dtc_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_dtc_dataset" ADD CONSTRAINT "FK_d19b1857794dac857a9e29b47d9" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_9642825b253339f1dd096c5e257" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_pid_dataset" ADD CONSTRAINT "FK_f26846ba382cf13481c0686c08c" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_1bf81b53a0a643f536e66755b62" FOREIGN KEY ("neg_id") REFERENCES "negative_response_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "ecu_neg" ADD CONSTRAINT "FK_48c783f58fdae9de1ff18e4b84a" FOREIGN KEY ("ecu_id") REFERENCES "ecu_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message_type_pid_dataset" ADD CONSTRAINT "FK_ca5c06787d05e2c4aab60413d3c" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_9eff1d7cfde8b0520f7f3863365" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pid_dataset_pid" ADD CONSTRAINT "FK_42e3cc1aecf0dd92ae884bb6e26" FOREIGN KEY ("pid_dataset_id") REFERENCES "pid_dataset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_6bd37757d1cd557bcbf985dd3e5" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "parameter_pid" ADD CONSTRAINT "FK_f3cc4d1b98879c5f935bbe52576" FOREIGN KEY ("pid_id") REFERENCES "pid"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
