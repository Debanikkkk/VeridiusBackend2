"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceHistoryTable1730803924983 = void 0;
class DeviceHistoryTable1730803924983 {
    constructor() {
        this.name = 'DeviceHistoryTable1730803924983';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "device_history" ("id" SERIAL NOT NULL, "device_id" integer NOT NULL, "name" character varying(64) NOT NULL, "mac_address" character varying(17) NOT NULL, "dongle_id" integer NOT NULL, CONSTRAINT "PK_e7b12f40c596560b264d9cd68f5" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "device_history"`);
    }
}
exports.DeviceHistoryTable1730803924983 = DeviceHistoryTable1730803924983;
//# sourceMappingURL=1730803924983-device_history_table.js.map