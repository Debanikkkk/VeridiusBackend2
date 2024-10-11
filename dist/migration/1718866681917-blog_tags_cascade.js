"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTagsCascade1718866681917 = void 0;
class BlogTagsCascade1718866681917 {
    constructor() {
        this.name = 'BlogTagsCascade1718866681917';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.BlogTagsCascade1718866681917 = BlogTagsCascade1718866681917;
//# sourceMappingURL=1718866681917-blog_tags_cascade.js.map