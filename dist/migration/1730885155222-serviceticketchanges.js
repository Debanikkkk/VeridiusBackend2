"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serviceticketchanges1730885155222 = void 0;
class Serviceticketchanges1730885155222 {
    constructor() {
        this.name = 'Serviceticketchanges1730885155222';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "created_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updated_on"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."service_ticket_status_enum" AS ENUM('open', 'closed', 'new')`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" "public"."service_ticket_status_enum" NOT NULL DEFAULT 'new'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."service_ticket_status_enum"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "updated_on" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "created_on" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}
exports.Serviceticketchanges1730885155222 = Serviceticketchanges1730885155222;
//# sourceMappingURL=1730885155222-serviceticketchanges.js.map