import { ResPID } from './ResPID';

export interface ResParameter {
  active?: boolean;
  created_at?: Date;
  description?: string;
  id?: number;
  name?: string;
  pids?: ResPID[];
  updated_at?: Date;
}
