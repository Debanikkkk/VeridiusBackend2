"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPERIMENTALBlogContentRelation1718868036747 = void 0;
class EXPERIMENTALBlogContentRelation1718868036747 {
    constructor() {
        this.name = 'EXPERIMENTALBlogContentRelation1718868036747';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.EXPERIMENTALBlogContentRelation1718868036747 = EXPERIMENTALBlogContentRelation1718868036747;
//# sourceMappingURL=1718868036747-EXPERIMENTAL_blog_content_relation.js.map