import { firmware_management } from '../../entity/Firmware';
import { ResUser } from '../res/ResUser';

export interface ReqFirmware {
  file?: string;
  firmwareType?: firmware_management;
  firmwareVersion?: string;
  isActive?: boolean;
  uploadedBy?: ResUser;
}
