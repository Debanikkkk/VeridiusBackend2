"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentImgNullableTrue1719985046668 = void 0;
class ContentImgNullableTrue1719985046668 {
    constructor() {
        this.name = 'ContentImgNullableTrue1719985046668';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "content_img" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "content_img" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.ContentImgNullableTrue1719985046668 = ContentImgNullableTrue1719985046668;
//# sourceMappingURL=1719985046668-content_img_nullable_true.js.map