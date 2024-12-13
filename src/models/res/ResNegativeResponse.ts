import { ResECU } from './ResECU';

export interface ResNegativeResponseCode {
  id: number; // ID of the negative response code
  responseCode: string; // Response code of the negative response
  description?: string; // Description of the negative response
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
  ecus?: ResECU[]; // Array of associated ECUs with minimal details
}
