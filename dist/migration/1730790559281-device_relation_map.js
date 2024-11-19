"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRelationMap1730790559281 = void 0;
class DeviceRelationMap1730790559281 {
    constructor() {
        this.name = 'DeviceRelationMap1730790559281';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_ae7154510495c7ddda951b07a07" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD "dongle_id" integer`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_4e45895a2aec400786bb56ed0a9" UNIQUE ("dongle_id")`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_ae7154510495c7ddda951b07a07" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9" FOREIGN KEY ("dongle_id") REFERENCES "dongle"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_4e45895a2aec400786bb56ed0a9"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "FK_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_4e45895a2aec400786bb56ed0a9"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "dongle_id"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT "UQ_ae7154510495c7ddda951b07a07"`);
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "user_id"`);
    }
}
exports.DeviceRelationMap1730790559281 = DeviceRelationMap1730790559281;
//# sourceMappingURL=1730790559281-device_relation_map.js.map