"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDescriptionAdded1719995734029 = void 0;
class BlogDescriptionAdded1719995734029 {
    constructor() {
        this.name = 'BlogDescriptionAdded1719995734029';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_description" character varying(1024)`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_description"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.BlogDescriptionAdded1719995734029 = BlogDescriptionAdded1719995734029;
//# sourceMappingURL=1719995734029-blog_description_added.js.map