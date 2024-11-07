import { serviceTicketStatus } from '../../entity/ServiceTickets';
import { ResUser } from './ResUser';

export interface ResServiceTicket {
  date?: Date;
  id?: number;
  service_ticket_number?: string;
  status?: serviceTicketStatus;
  technician?: ResUser;
}
