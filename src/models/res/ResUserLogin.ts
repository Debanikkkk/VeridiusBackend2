import { ResPermission } from './ResPermission';

interface UserLoginRole {
  id: number;
  role_name: string;
  role_description: string;
}
export interface ResUserLogin {
  // roles: ResRole;
  name: string;
  permissions?: ResPermission[];
  role: UserLoginRole;
  token?: string;
}
