
import { ResRole } from './ResRole';


export interface ResUser {
  id?: number;
  name?: string;
  address?: string;
  password?: string;
  email?: string;
  status?: boolean;
  phone_number?: string;
  role?: ResRole;
}
