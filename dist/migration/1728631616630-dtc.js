"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dtc1728631616630 = void 0;
class Dtc1728631616630 {
    constructor() {
        this.name = 'Dtc1728631616630';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "dtc" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "severity" character varying, CONSTRAINT "UQ_b02ca9fc06592e35344cfa16009" UNIQUE ("code"), CONSTRAINT "PK_3dc68f9057c76aaedb27a9fbb64" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "dtc"`);
    }
}
exports.Dtc1728631616630 = Dtc1728631616630;
//# sourceMappingURL=1728631616630-dtc.js.map