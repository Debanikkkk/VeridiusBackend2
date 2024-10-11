"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameSizeInc1718969362285 = void 0;
class NameSizeInc1718969362285 {
    constructor() {
        this.name = 'NameSizeInc1718969362285';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "name" character varying(256)`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "name" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.NameSizeInc1718969362285 = NameSizeInc1718969362285;
//# sourceMappingURL=1718969362285-name_size_inc.js.map