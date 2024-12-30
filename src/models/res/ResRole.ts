import { ResPermission } from './ResPermission';
import { ResUser } from './ResUser';

export interface ResRole {
  id?: number;
  name?: string;
  description?: string;
  createdBy?: ResUser;
  status?: boolean;
  permissions?: ResPermission[];
  // subRole?: ResRole[],
}
