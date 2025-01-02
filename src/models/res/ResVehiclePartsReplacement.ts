// import { VehiclePartsReplacement } from '../../entity/VehiclePartsReplacement';
import { ResUser } from './ResUser';
import { ResVehicle } from './ResVehicle';

export interface ResVehiclePartsReplacement {
  cost?: number;
  id?: number;
  partName?: string;
  partNumber?: string;
  //   replacedBy?: string;
  technician?: ResUser;
  replacementDate?: Date;
  vehicle?: ResVehicle;
  warrantyExpiry?: Date;
  replacedAt?: Date;
}
