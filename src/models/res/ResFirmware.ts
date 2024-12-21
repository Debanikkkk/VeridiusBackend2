// import { file_type } from '../../entity/File';
import { firmware_management } from '../../entity/Firmware';
// import { Firmware } from '../../entity/Firmware';
import { ResFiles } from './ResFiles';
import { ResUser } from './ResUser';

export interface ResFirmware {
  createdBy?: ResUser;
  // ecus?:,
  files?: ResFiles[];
  firmwareType?: firmware_management;
  firmwareVersion?: string;
  id?: number;
}
