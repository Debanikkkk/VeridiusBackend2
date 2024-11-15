import { ResDevice } from './ResDevice';
import { ResRole } from './ResRole';
import { ResServiceTicket } from './ResServiceTicket';

export interface ResUser {
  id?: number;
  name?: string;
  address?: string;
  password?: string;
  email?: string;
  phone_number?: string;
  role?: ResRole;
  service_ticket?: ResServiceTicket;
  device?: ResDevice;
}
