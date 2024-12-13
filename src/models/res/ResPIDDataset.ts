export interface ResPIDDataset {
  id: number; // ID of the PID dataset
  name?: string; // Name of the PID dataset
  description?: string; // Description of the PID dataset
  active: boolean; // Whether the dataset is active
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
  pids?: { id: number; pidName: string }[]; // Array of associated PIDs with minimal details
  ecus?: { id: number; ecuName: string }[]; // Array of associated ECUs with minimal details
  messageTypes?: { id: number; typeName: string }[]; // Array of associated MessageTypes with minimal details
}
