import { DeviceStatus } from '../../entity/Device';
import { ResDongle } from './ResDongle';
import { ResUser } from './ResUser';

export interface ResDevice {
  assigned_to?: ResUser;
  created_at?: Date;
  device_name?: string;
  device_type?: string;
  dongle?: ResDongle;
  id?: number;
  os_version?: string;
  registration_date?: Date;
  serial_number?: string;
  status?: DeviceStatus;
  updated_at?: Date;
}
