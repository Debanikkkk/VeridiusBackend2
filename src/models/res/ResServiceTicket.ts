import { serviceTicketStatus } from '../../entity/ServiceTickets';
import { ResUser } from './ResUser';
import { ResVehicle } from './ResVehicle';

export interface ResServiceTicket {
  date?: Date;
  id?: number;
  service_ticket_number?: string;
  status?: serviceTicketStatus;
  technician?: ResUser;
  vehicle?: ResVehicle;
}
