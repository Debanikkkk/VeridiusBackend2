import { ResVehicle } from './ResVehicle';

export interface ResVehicleInsurance {
  coverageDetails?: object;
  endDate?: Date;
  id?: number;
  policyNumber?: string;
  providerName?: string;
  startDate?: Date;
  vehicle?: ResVehicle;
}
