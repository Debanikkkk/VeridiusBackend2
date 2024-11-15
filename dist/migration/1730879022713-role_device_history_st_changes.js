"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDeviceHistoryStChanges1730879022713 = void 0;
class RoleDeviceHistoryStChanges1730879022713 {
    constructor() {
        this.name = 'RoleDeviceHistoryStChanges1730879022713';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "created_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updated_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "device_history" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "device_history" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device_history" ALTER COLUMN "dongle_id" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device_history" ALTER COLUMN "dongle_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "device_history" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "device_history" DROP COLUMN "updatedOn"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updated_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "created_on"`);
    }
}
exports.RoleDeviceHistoryStChanges1730879022713 = RoleDeviceHistoryStChanges1730879022713;
//# sourceMappingURL=1730879022713-role_device_history_st_changes.js.map