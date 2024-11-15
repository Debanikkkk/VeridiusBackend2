"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcontentAdded1721287104838 = void 0;
class SubcontentAdded1721287104838 {
    constructor() {
        this.name = 'SubcontentAdded1721287104838';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`CREATE TABLE "sub_content" ("id" SERIAL NOT NULL, "title" character varying(1024) NOT NULL, "description" character varying(1024) NOT NULL, "content_id" integer, CONSTRAINT "PK_ef8bf8993ea675c6841c687b6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub_content" ADD CONSTRAINT "FK_0c6e66efa29bdc1af2a77a73524" FOREIGN KEY ("content_id") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "sub_content" DROP CONSTRAINT "FK_0c6e66efa29bdc1af2a77a73524"`);
        await queryRunner.query(`DROP TABLE "sub_content"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.SubcontentAdded1721287104838 = SubcontentAdded1721287104838;
//# sourceMappingURL=1721287104838-subcontent_added.js.map