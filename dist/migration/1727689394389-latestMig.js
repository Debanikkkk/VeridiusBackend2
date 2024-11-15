"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestMig1727689394389 = void 0;
class LatestMig1727689394389 {
    constructor() {
        this.name = 'LatestMig1727689394389';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "description" character varying(64)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "description" character varying(17) NOT NULL`);
    }
}
exports.LatestMig1727689394389 = LatestMig1727689394389;
//# sourceMappingURL=1727689394389-latestMig.js.map