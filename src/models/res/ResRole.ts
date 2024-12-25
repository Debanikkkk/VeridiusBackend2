import { ResPermission } from './ResPermission';
import { ResUser } from './ResUser';

export interface ResRole {
  id?: number;
  name?: string;
  description?: string;
  createdBy?: ResUser;
  permissions?: ResPermission[];
  // subRole?: ResRole[],
}
