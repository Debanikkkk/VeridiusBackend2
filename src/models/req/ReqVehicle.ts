// export interface ReqVehicle {
//   ecu?: number[];
//   name?: string;
//   service_ticket?: number;
// }
export interface ReqVehicle {
  id?: number; // Optional for update operations
  name?: string; // Name of the vehicle
  vehicleModelId?: number; // ID of the associated vehicle model
  vehicleSubModelId?: number; // ID of the associated vehicle submodel
  vehicleVariantId?: number; // ID of the associated vehicle variant
  oemId?: number; // ID of the associated OEM
  ecu?: number[]; // Array of IDs for associated ECUs
  serviceTicketId?: number; // ID of the associated service ticket
  firmware?: number;
}
