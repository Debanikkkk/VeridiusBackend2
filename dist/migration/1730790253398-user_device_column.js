"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeviceColumn1730790253398 = void 0;
class UserDeviceColumn1730790253398 {
    constructor() {
        this.name = 'UserDeviceColumn1730790253398';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "device_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1" UNIQUE ("device_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1" FOREIGN KEY ("device_id") REFERENCES "device"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0232591a0b48e1eb92f3ec5d0d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_0232591a0b48e1eb92f3ec5d0d1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "device_id"`);
    }
}
exports.UserDeviceColumn1730790253398 = UserDeviceColumn1730790253398;
//# sourceMappingURL=1730790253398-user_device_column.js.map