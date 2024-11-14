"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinorDbChanges1730974048849 = void 0;
class MinorDbChanges1730974048849 {
    constructor() {
        this.name = 'MinorDbChanges1730974048849';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "dongle_history" ("id" SERIAL NOT NULL, "dongle_id" integer NOT NULL, "name" character varying(64) NOT NULL, "device_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_9930b2ff4eafb6a084fed7609c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."permission_type_enum" AS ENUM('user', 'product')`);
        await queryRunner.query(`ALTER TABLE "permission" ADD "type" "public"."permission_type_enum"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."permission_type_enum"`);
        await queryRunner.query(`DROP TABLE "dongle_history"`);
    }
}
exports.MinorDbChanges1730974048849 = MinorDbChanges1730974048849;
//# sourceMappingURL=1730974048849-minorDbChanges.js.map