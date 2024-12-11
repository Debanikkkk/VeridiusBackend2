import { ResDtcDataset } from './ResDTCDataset';
import { ResNegativeResponseCode } from './ResNegativeResponse';
import { ResPIDDataset } from './ResPIDDataset';
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
  // vehicle?: ResVehicle; // Assuming `vehicle` refers to an ID of a vehicle
}
