import { ResVehicleModel } from './ResVehicleModel';
import { ResVehicleVersion } from './ResVehicleVersion';

export interface ResVehicleSubmodel {
  engineCapacity?: string;
  fuelEfficiency?: string;
  id?: number;
  name?: string;
  vehicleModel?: ResVehicleModel;
  vehicleVersion?: ResVehicleVersion;
}
