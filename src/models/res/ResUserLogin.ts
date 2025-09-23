// import { ResPermission } from './ResPermission';

interface UserLoginRole {
  id?: number|null;
  role_name?: string|null;
  role_description?: string|null;
}
export interface ResUserLogin {
  // roles: ResRole;
  email: string;
  // permissions?: ResPermission[];
  role: UserLoginRole | null;
  token?: string;
}
