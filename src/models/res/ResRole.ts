import { ResPermission } from './ResPermission';
import { ResUser } from './ResUser';

export interface ResRole {
  id?: number;
  name?: string;
  description?: string;
  created_by?: ResUser;
  permissions?: ResPermission[];
  // subRole?: ResRole[],
}
