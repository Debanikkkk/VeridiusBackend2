"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrectionsNullableTrue1718798563928 = void 0;
class CorrectionsNullableTrue1718798563928 {
    constructor() {
        this.name = 'CorrectionsNullableTrue1718798563928';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "content" ("id" SERIAL NOT NULL, "title" character varying(4096) NOT NULL, "content" character varying(4096) NOT NULL, "content_img" character varying(1024) NOT NULL, "order" integer NOT NULL, "blog_id" integer, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_n_tags" ("blog_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_1bd24ba9ac55de7dda61d0520ad" PRIMARY KEY ("blog_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08b6bc95f1e1260feebede63b8" ON "blog_n_tags" ("blog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a71c5c48e4d63f8cd8fd1b7633" ON "blog_n_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blogTitle"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_image"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_title" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_subtitle" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_e986199e247e160cf7a40703a1e" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_a71c5c48e4d63f8cd8fd1b7633f" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_a71c5c48e4d63f8cd8fd1b7633f"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_e986199e247e160cf7a40703a1e"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_subtitle"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_title"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_image" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blogTitle" character varying(24) NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a71c5c48e4d63f8cd8fd1b7633"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08b6bc95f1e1260feebede63b8"`);
        await queryRunner.query(`DROP TABLE "blog_n_tags"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }
}
exports.CorrectionsNullableTrue1718798563928 = CorrectionsNullableTrue1718798563928;
//# sourceMappingURL=1718798563928-corrections_nullable_true.js.map