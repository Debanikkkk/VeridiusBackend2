import { ResParameter } from './ResParameter';
import { ResPIDDataset } from './ResPIDDataset';

export interface ResPID {
  active?: boolean;
  bitCoded?: boolean;
  bytePosition?: number;
  createdAt?: Date;
  description?: string;
  id?: number;
  lengthBytes?: number;
  longName?: string;
  max?: number;
  min?: number;
  offset?: number;
  parameters?: ResParameter[];
  pidCode?: string;
  pidDatasets?: ResPIDDataset[];
  read?: boolean;
  resolution?: number;
  shortName?: string;
  totalLength?: number;
  unit?: string;
  updatedAt?: Date;
  write?: boolean;
}
