import { DeviceStatus } from '../../entity/Device';
// import { ResDongle } from '../res/ResDongle';
// import { ResUser } from '../res/ResUser';

export interface ReqDevice {
  assignedTo?: number;
  createdAt?: Date;
  deviceName?: string;
  deviceType?: string;
  dongle?: number;
  // id?: number;
  imei?: string;
  osVersion?: string;
  registrationDate?: Date;
  serialNumber?: string;
  status?: DeviceStatus;
  updatedAt?: Date;
}
