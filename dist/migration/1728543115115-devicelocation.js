"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Devicelocation1728543115115 = void 0;
class Devicelocation1728543115115 {
    constructor() {
        this.name = 'Devicelocation1728543115115';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" ADD "location" geography(point,4326) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "location"`);
    }
}
exports.Devicelocation1728543115115 = Devicelocation1728543115115;
//# sourceMappingURL=1728543115115-devicelocation.js.map