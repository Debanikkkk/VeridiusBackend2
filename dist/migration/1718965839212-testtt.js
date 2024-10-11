"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testtt1718965839212 = void 0;
class Testtt1718965839212 {
    constructor() {
        this.name = 'Testtt1718965839212';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.Testtt1718965839212 = Testtt1718965839212;
//# sourceMappingURL=1718965839212-testtt.js.map