"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRelationMapToUserRemoved1730790641641 = void 0;
class DeviceRelationMapToUserRemoved1730790641641 {
    constructor() {
        this.name = 'DeviceRelationMapToUserRemoved1730790641641';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "user_id"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_ae7154510495c7ddda951b07a07" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_ae7154510495c7ddda951b07a07" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.DeviceRelationMapToUserRemoved1730790641641 = DeviceRelationMapToUserRemoved1730790641641;
//# sourceMappingURL=1730790641641-device_relation_map_to_user_removed.js.map