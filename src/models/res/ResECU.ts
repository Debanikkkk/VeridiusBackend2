import { ResDtcDataset } from './ResDTCDataset';
import { ResFirmware } from './ResFirmware';
import { ResNegativeResponseCode } from './ResNegativeResponse';
import { ResPIDDataset } from './ResPIDDataset';
import { ResVehicle } from './ResVehicle';
// import { ResVehicle } from './ResVehicle';

export interface ResECU {
  id?: number;
  isActive?: boolean;
  macId?: string;
  ecuName?: string;
  protocol?: string;
  rxHeader?: string;
  txHeader?: string;
  dtcDataset?: ResDtcDataset[];
  pidDataset?: ResPIDDataset[];
  createdAt?: Date;
  updatedAt?: Date;
  negativeResponses?: ResNegativeResponseCode[]; // Array of IDs for associated NegativeResponseCode
  vehicles?: ResVehicle[];
  firmwares?: ResFirmware[];
}
