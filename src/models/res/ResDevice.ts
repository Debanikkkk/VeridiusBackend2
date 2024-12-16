import { DeviceStatus } from '../../entity/Device';
import { ResDongle } from './ResDongle';
import { ResUser } from './ResUser';

export interface ResDevice {
  assignedTo?: ResUser;
  createdAt?: Date;
  deviceName?: string;
  deviceType?: string;
  dongle?: ResDongle;
  id?: number;
  osVersion?: string;
  registrationDate?: Date;
  serialNumber?: string;
  status?: DeviceStatus;
  updatedAt?: Date;
}
