export interface ReqPIDDataset {
  id?: number; // Optional for update operations
  name?: string; // Name of the PID dataset
  description?: string; // Description of the PID dataset
  active?: boolean; // Whether the dataset is active
  pids?: number[]; // Array of associated PID IDs
  ecus?: number[]; // Array of associated ECU IDs
  messageTypes?: number[]; // Array of associated MessageType IDs
}
