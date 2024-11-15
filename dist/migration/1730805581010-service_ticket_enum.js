"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTicketEnum1730805581010 = void 0;
class ServiceTicketEnum1730805581010 {
    constructor() {
        this.name = 'ServiceTicketEnum1730805581010';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD "status" boolean NOT NULL`);
    }
}
exports.ServiceTicketEnum1730805581010 = ServiceTicketEnum1730805581010;
//# sourceMappingURL=1730805581010-service_ticket_enum.js.map