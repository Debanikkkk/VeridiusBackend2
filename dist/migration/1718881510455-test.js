"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1718881510455 = void 0;
class Test1718881510455 {
    constructor() {
        this.name = 'Test1718881510455';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Test1718881510455 = Test1718881510455;
//# sourceMappingURL=1718881510455-test.js.map