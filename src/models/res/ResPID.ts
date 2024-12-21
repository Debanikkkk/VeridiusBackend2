import { ResParameter } from './ResParameter';
import { ResPIDDataset } from './ResPIDDataset';

export interface ResPID {
  active?: boolean;
  bit_coded?: boolean;
  byte_position?: number;
  created_at?: Date;
  description?: string;
  id?: number;
  length_bytes?: number;
  long_name?: string;
  max?: number;
  min?: number;
  offset?: number;
  parameters?: ResParameter[];
  pid_code?: string;
  pid_datasets?: ResPIDDataset[];
  read?: boolean;
  resolution?: number;
  short_name?: string;
  total_length?: number;
  unit?: string;
  updated_at?: Date;
  write?: boolean;
}
