export interface ReqECU {
  id?: number;
  vehicles?: number[]; // Assuming vehicleManagementId is the related vehicle ID in many-to-one relation
  isActive?: boolean;
  macId?: string;
  ecuName?: string;
  protocol?: string;
  dtcDataset?: number[];
  pidDataset?: number[];
  firmware?: number;
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
