"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusAddedToBlog1721627422159 = void 0;
class StatusAddedToBlog1721627422159 {
    constructor() {
        this.name = 'StatusAddedToBlog1721627422159';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" ADD "status" boolean DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "status"`);
    }
}
exports.StatusAddedToBlog1721627422159 = StatusAddedToBlog1721627422159;
//# sourceMappingURL=1721627422159-status_added_to_blog.js.map