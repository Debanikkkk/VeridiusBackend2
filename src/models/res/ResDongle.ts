import { DongleStatus } from '../../entity/Dongle';
import { ResDevice } from './ResDevice';

export interface ResDongle {
  assignedDevice?: ResDevice;
  createdAt?: Date;
  dongleSerialNumber?: string;
  firmwareUpdatedAt?: Date;
  firmwareVersion?: string;
  id?: number;
  isActive?: boolean;
  macAddress?: string;
  manufactureDate?: Date;
  // model?: ResVehicle;
  status?: DongleStatus;
  updatedAt?: Date;
}
