import { ResFirmware } from './ResFirmware';

export interface ResVehicle {
  id: number; // ID of the vehicle
  name: string; // Name of the vehicle
  // vehicleModel?: { id: number; name: string }; // Minimal details of the associated vehicle model
  // vehicleSubModel?: { id: number; name: string }; // Minimal details of the associated vehicle submodel
  // vehicleVariant?: { id: number; name: string }; // Minimal details of the associated vehicle variant
  // oem?: { id: number; name: string }; // Minimal details of the associated OEM
  // ecus?: { id: number; ecuName: string }[]; // Array of associated ECUs with minimal details
  serviceTicket?: { id: number; serviceTicketNumber: string }; // Details of the associated service ticket
  createdAt?: Date; // Creation timestamp (if applicable)
  updatedAt?: Date; // Update timestamp (if applicable)
  firmware?: ResFirmware;
}
