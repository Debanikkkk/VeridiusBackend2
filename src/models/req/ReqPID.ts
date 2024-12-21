export interface ReqPID {
  active?: boolean;
  bitCoded?: boolean;
  bytePosition?: number;
  createdAt?: Date;
  description?: string;
  //   id?: number;
  lengthBytes?: number;
  longName?: string;
  max?: number;
  min?: number;
  offset?: number;
  parameters?: number[];
  pidCode?: string;
  pidDatasets?: number[];
  read?: boolean;
  resolution?: number;
  shortName?: string;
  totalLength?: number;
  unit?: string;
  updatedAt?: Date;
  write?: boolean;
}
