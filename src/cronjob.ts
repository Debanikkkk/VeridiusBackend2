// src/cron/statusUpdater.ts
import cron from 'node-cron';
// import { MyEntity, Status } from '../models/MyEntity';
import { ServiceTicket } from './entity/ServiceTickets';
import { serviceTicketStatus } from './entity/ServiceTickets';
import { AppDataSource } from './data-source';
console.log('the cron job is being entered******');
const updateStatusCron = cron.schedule('*/20 * * * * *', async () => {
  console.log('Cron job triggered at:', new Date().toISOString());

  try {
    const entityRepository = AppDataSource.getRepository(ServiceTicket);
    const result = await entityRepository
      .createQueryBuilder()
      .update(ServiceTicket)
      .set({ status: serviceTicketStatus.closed })
      .where('status = :status', { status: serviceTicketStatus.open })
      .andWhere("updatedAt <= NOW() - INTERVAL '20 seconds'") // Adjust for DB if needed
      .printSql() // Print SQL query to confirm format
      .execute();

    console.log(`Updated ${result.affected} records from open to closed.`);
  } catch (error) {
    console.error('Error updating records:', error);
  }
});

export { updateStatusCron };
