import { ResPIDDataset } from './ResPIDDataset';

export interface ResMessageType {
  createdAt?: Date;
  id?: number;
  name?: string;
  pidDatasets?: ResPIDDataset[];
  updatedAt?: Date;
}
