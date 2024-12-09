export interface ReqECU {
  id?: number;
  vehicleManagementId?: number; // Assuming vehicleManagementId is the related vehicle ID in many-to-one relation
  active?: boolean;
  macId?: string;
  ecuName?: string;
  protocol?: string;
  dtcDataset?: string;
  pidDataset?: string;
  rxHeader?: string;
  txHeader?: string;
  readDtcFcIndex?: string;
  clearDtcFnIndex?: string;
  readDataFnIndex?: string;
  writeDataFnIndex?: string;
  seedkeyalgoFnIndex?: string;
  iorTestIndex?: string;
  negativeResponses?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
