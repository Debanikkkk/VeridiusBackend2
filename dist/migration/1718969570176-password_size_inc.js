"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSizeInc1718969570176 = void 0;
class PasswordSizeInc1718969570176 {
    constructor() {
        this.name = 'PasswordSizeInc1718969570176';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying(108)`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog_n_tags" DROP CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_n_tags" ADD CONSTRAINT "FK_08b6bc95f1e1260feebede63b8b" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.PasswordSizeInc1718969570176 = PasswordSizeInc1718969570176;
//# sourceMappingURL=1718969570176-password_size_inc.js.map