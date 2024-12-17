import { file_type } from '../../entity/File';
// import { Firmware } from '../../entity/Firmware';
import { ResFiles } from './ResFiles';
import { ResUser } from './ResUser';

export interface ResFirmware {
  created_by?: ResUser;
  // ecus?:,
  files?: ResFiles;
  firmwareType?: file_type;
  firmwareVersion?: string;
  id?: number;
}
