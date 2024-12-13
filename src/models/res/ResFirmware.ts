import { ResUser } from './ResUser';

export interface ResFirmware {
  id?: number;
  firmwareVersion?: string;
  file?: string;
  createdAt?: Date;
  updatedAt?: Date;
  uploadedBy?: ResUser;
  isActive?: boolean;
  vehicleId?: number | null;
}
