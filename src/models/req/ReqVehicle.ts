export interface ReqVehicle {
  color?: string;
  engineNumber?: string;
  // id?: number;
  ecus?: number[];
  manufactureYear?: Date;
  mileage?: number;
  transmissionType?: string;
  vehicleModel?: number;
  vehicleNumber?: string;
  vehicleSegment?: number;
  vehicleSubModel?: number;
  vehicleVersion?: number;
  vin?: string;
}
