import { ResECU } from './ResECU';
import { ResVehicleModel } from './ResVehicleModel';
import { ResVehicleSegment } from './ResVehicleSegemnt';
import { ResVehicleSubmodel } from './ResVehicleSubmodel';
import { ResVehicleVersion } from './ResVehicleVersion';

export interface ResVehicle {
  color?: string;
  engineNumber?: string;
  id?: number;
  manufactureYear?: Date;
  mileage?: number;
  transmissionType?: string;
  vehicleModel?: ResVehicleModel;
  vehicleNumber?: string;
  vehicleSegment?: ResVehicleSegment;
  vehicleSubModel?: ResVehicleSubmodel;
  vehicleVersion?: ResVehicleVersion;
  vin?: string;
  ecus?: ResECU[];
}
