import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicMig1758691751943 implements MigrationInterface {
    name = 'BasicMig1758691751943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episode" ("id" SERIAL NOT NULL, "title" character varying, "episode_desc" character varying, "file" character varying, "thumbnail" character varying, "season_id" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "password" character varying(16) NOT NULL, "address" character varying(64) NOT NULL, "phone_number" character varying(64) NOT NULL, "status" boolean DEFAULT true, "email" character varying(64) NOT NULL, "role_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."show_rating_enum" AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated', 'Not Rated')`);
        await queryRunner.query(`CREATE TYPE "public"."show_show_type_enum" AS ENUM('Movies', 'TV Shows')`);
        await queryRunner.query(`CREATE TABLE "show" ("id" SERIAL NOT NULL, "title" character varying, "tile_img" character varying, "desc_img" character varying, "description" character varying, "date" TIMESTAMP DEFAULT now(), "rating" "public"."show_rating_enum", "show_type" "public"."show_show_type_enum", "publisher_id" integer, CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "title" character varying, "season_no" integer, "season_desc" character varying, "date" TIMESTAMP DEFAULT now(), "show_id" integer, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_n_permission" ("permission_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_e8dd17b0dd3b310c0417757a29d" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dac48bc8a6fe615770b55a0dae" ON "role_n_permission" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_d8790eefed71394952672828c1c" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_05160c4d8108794a9dad485423e" FOREIGN KEY ("publisher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_a5177235001e471bbd7637584d1" FOREIGN KEY ("show_id") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_dac48bc8a6fe615770b55a0dae8" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_dac48bc8a6fe615770b55a0dae8"`);
        await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_7a7f0caf590828c621c8608eb56"`);
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_a5177235001e471bbd7637584d1"`);
        await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT "FK_05160c4d8108794a9dad485423e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_d8790eefed71394952672828c1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dac48bc8a6fe615770b55a0dae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a7f0caf590828c621c8608eb5"`);
        await queryRunner.query(`DROP TABLE "role_n_permission"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "show"`);
        await queryRunner.query(`DROP TYPE "public"."show_show_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."show_rating_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "episode"`);
    }

}
