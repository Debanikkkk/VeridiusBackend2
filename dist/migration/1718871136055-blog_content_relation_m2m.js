"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogContentRelationM2m1718871136055 = void 0;
class BlogContentRelationM2m1718871136055 {
    constructor() {
        this.name = 'BlogContentRelationM2m1718871136055';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_e986199e247e160cf7a40703a1e"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`CREATE TABLE "blog_n_content" ("blog_id" integer NOT NULL, "content_id" integer NOT NULL, CONSTRAINT "PK_fa52255bb4ea973abce7d7f2fb0" PRIMARY KEY ("blog_id", "content_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a0897ec5efd2326c9ba6a27be8" ON "blog_n_content" ("blog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef5998128ebb36a36536620aab" ON "blog_n_content" ("content_id") `);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "blog_id"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_n_content" ADD CONSTRAINT "FK_a0897ec5efd2326c9ba6a27be87" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_n_content" ADD CONSTRAINT "FK_ef5998128ebb36a36536620aab5" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_content" DROP CONSTRAINT "FK_ef5998128ebb36a36536620aab5"`);
        await queryRunner.query(`ALTER TABLE "blog_n_content" DROP CONSTRAINT "FK_a0897ec5efd2326c9ba6a27be87"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "content" ADD "blog_id" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef5998128ebb36a36536620aab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a0897ec5efd2326c9ba6a27be8"`);
        await queryRunner.query(`DROP TABLE "blog_n_content"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_e986199e247e160cf7a40703a1e" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.BlogContentRelationM2m1718871136055 = BlogContentRelationM2m1718871136055;
//# sourceMappingURL=1718871136055-blog_content_relation_m2m.js.map