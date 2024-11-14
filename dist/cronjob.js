"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusCron = void 0;
// src/cron/statusUpdater.ts
const node_cron_1 = __importDefault(require("node-cron"));
// import { MyEntity, Status } from '../models/MyEntity';
const ServiceTickets_1 = require("./entity/ServiceTickets");
const ServiceTickets_2 = require("./entity/ServiceTickets");
const data_source_1 = require("./data-source");
console.log('the cron job is being entered******');
const updateStatusCron = node_cron_1.default.schedule('0 * * * *', async () => {
    console.log('Cron job triggered at:', new Date().toISOString());
    try {
        const entityRepository = data_source_1.AppDataSource.getRepository(ServiceTickets_1.ServiceTicket);
        const result = await entityRepository
            .createQueryBuilder()
            .update(ServiceTickets_1.ServiceTicket)
            .set({ status: ServiceTickets_2.serviceTicketStatus.closed })
            .where('status = :status', { status: ServiceTickets_2.serviceTicketStatus.open })
            .andWhere("updatedAt <= NOW() - INTERVAL '20 seconds'") // Adjust for DB if needed
            .printSql() // Print SQL query to confirm format
            .execute();
        console.log(`Updated ${result.affected} records from open to closed.`);
    }
    catch (error) {
        console.error('Error updating records:', error);
    }
});
exports.updateStatusCron = updateStatusCron;
//# sourceMappingURL=cronjob.js.map