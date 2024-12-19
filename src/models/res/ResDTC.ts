import { ResDtcDataset } from './ResDTCDataset';

export interface ResDTC {
  createdAt?: Date;
  description?: string;
  dtcDataset?: ResDtcDataset[];
  id?: number;
  isActive?: boolean;
  name?: string;
  updatedAt?: Date;
}
