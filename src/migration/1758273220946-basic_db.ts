import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicDb1758273220946 implements MigrationInterface {
    name = 'BasicDb1758273220946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create base tables
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "password" character varying(16) NOT NULL, "address" character varying(64) NOT NULL, "phone_number" character varying(64) NOT NULL, "status" boolean DEFAULT true, "email" character varying(64) NOT NULL, "role_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        
        // Create the junction table with correct column name (permission_id instead of perimission_id)
        await queryRunner.query(`CREATE TABLE "role_n_permission" ("permission_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_e8dd17b0dd3b310c0417757a29d" PRIMARY KEY ("role_id", "permission_id"))`);
        
        // Create indexes
        await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_dac48bc8a6fe615770b55a0dae" ON "role_n_permission" ("role_id")`);
        
        // Add foreign key constraints
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_dac48bc8a6fe615770b55a0dae8" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_dac48bc8a6fe615770b55a0dae8"`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_7a7f0caf590828c621c8608eb56"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        
        // Drop indexes
        await queryRunner.query(`DROP INDEX "public"."IDX_dac48bc8a6fe615770b55a0dae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a7f0caf590828c621c8608eb5"`);
        
        // Drop tables
        await queryRunner.query(`DROP TABLE "role_n_permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }
}