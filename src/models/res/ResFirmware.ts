export interface ResFirmware {
  id?: number;
  firmwareVersion?: string;
  file?: string;
  createdAt?: Date;
  updatedAt?: Date;
  uploadedBy?: string;
  isActive?: boolean;
  vehicleId?: number | null;
}
