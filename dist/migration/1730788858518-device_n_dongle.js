"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceNDongle1730788858518 = void 0;
class DeviceNDongle1730788858518 {
    constructor() {
        this.name = 'DeviceNDongle1730788858518';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "dongle" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_3a6bac875b9c23209433f8381e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_tickets" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL, CONSTRAINT "PK_bae2cfa32a1181e6339d559812e" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "service_tickets"`);
        await queryRunner.query(`DROP TABLE "dongle"`);
    }
}
exports.DeviceNDongle1730788858518 = DeviceNDongle1730788858518;
//# sourceMappingURL=1730788858518-device_n_dongle.js.map