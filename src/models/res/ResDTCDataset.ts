export interface ResDtcDataset {
  id?: number; // Dataset ID
  name?: string; // Dataset name
  description?: string; // Dataset description
  isActive?: boolean; // Whether the dataset is active
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Update timestamp
  // dtcs?: ResDTC[]; // Array of associated DTCs with minimal details
  // ecus?: ResECU[]; // Array of associated ECUs with minimal details
}
