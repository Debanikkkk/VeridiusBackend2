import { firmware_management } from '../../entity/Firmware';
import { ResFiles } from './ResFiles';
// import { ResRole } from './ResRole';
import { ResUser } from './ResUser';

export interface ResFirmware {
  createdBy?: ResUser;
  // ecus?:,
  status?: boolean;
  files?: ResFiles[];
  // role?: ResRole;
  firmwareType?: firmware_management;
  firmwareVersion?: string;
  id?: number;
}
