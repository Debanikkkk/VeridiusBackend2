import { permType } from '../../entity/Permission';
import { ResRole } from './ResRole';

export interface ResPermission {
  id?: number;
  description?: string;
  type: permType;
  name?: string;
  roles?: ResRole[];
}
