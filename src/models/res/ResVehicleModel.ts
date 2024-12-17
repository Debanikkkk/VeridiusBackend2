import { ResOEM } from './ResOEM';
import { ResVehicleSegment } from './ResVehicleSegemnt';
import { ResVehicleVersion } from './ResVehicleVersion';

export interface ResVehicleModel {
  discontinuedYear?: Date;
  id?: number;
  launchYear?: Date;
  name?: string;
  oem?: ResOEM;
  vehicleSegment?: ResVehicleSegment;
  vehicleVersion?: ResVehicleVersion;
}
