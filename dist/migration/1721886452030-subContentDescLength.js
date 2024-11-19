"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubContentDescLength1721886452030 = void 0;
class SubContentDescLength1721886452030 {
    constructor() {
        this.name = 'SubContentDescLength1721886452030';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub_content" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "sub_content" ADD "description" character varying(4096)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sub_content" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "sub_content" ADD "description" character varying(1024) NOT NULL`);
    }
}
exports.SubContentDescLength1721886452030 = SubContentDescLength1721886452030;
//# sourceMappingURL=1721886452030-subContentDescLength.js.map