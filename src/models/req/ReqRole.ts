import { ResUser } from '../res/ResUser';

export interface ReqRole {
  created_by?: ResUser;
  description?: string;
  id?: number;
  name?: string;
}
