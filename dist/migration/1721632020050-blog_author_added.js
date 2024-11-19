"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAuthorAdded1721632020050 = void 0;
class BlogAuthorAdded1721632020050 {
    constructor() {
        this.name = 'BlogAuthorAdded1721632020050';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_author" character varying(1024)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_author"`);
    }
}
exports.BlogAuthorAdded1721632020050 = BlogAuthorAdded1721632020050;
//# sourceMappingURL=1721632020050-blog_author_added.js.map