import { DongleStatus } from '../../entity/Dongle';
// import { ResDevice } from '../res/ResDevice';

export interface ReqDongle {
  // assignedDevice: number;
  // createdAt: Date;
  dongleSerialNumber: string;
  firmwareUpdatedAt: Date;
  firmwareVersion: string;
  // id: number;
  macAddress: string;
  manufactureDate: Date;
  // model: ;
  status: DongleStatus;
  isActive: boolean;
  // updatedAt: Date;
}
