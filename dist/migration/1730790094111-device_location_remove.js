"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLocationRemove1730790094111 = void 0;
class DeviceLocationRemove1730790094111 {
    constructor() {
        this.name = 'DeviceLocationRemove1730790094111';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "location"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" ADD "location" geography(Point,4326) NOT NULL`);
    }
}
exports.DeviceLocationRemove1730790094111 = DeviceLocationRemove1730790094111;
//# sourceMappingURL=1730790094111-device_location_remove.js.map