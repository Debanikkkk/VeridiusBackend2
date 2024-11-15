import { permType } from '../../entity/Permission';

export interface ReqPermission {
  // id?: number,
  description?: string;
  type?: permType;
  name?: string;
  // role?: number[];
}
