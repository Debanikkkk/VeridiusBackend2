export interface ReqDtcDataset {
  id?: number; // Optional for update operations
  name?: string; // Dataset name
  description?: string; // Dataset description
  isActive?: boolean; // Whether the dataset is active
  dtcs?: number[]; // Array of DTC IDs for association
  ecus?: number[]; // Array of ECU IDs for association
}
