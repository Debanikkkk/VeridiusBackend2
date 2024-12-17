import { ResUser } from './ResUser';

export interface ResFiles {
  createdAt?: Date;
  file?: string;
  fileDescription?: string;
  fileName?: string;
  //   firmware?: ResFirmware;
  id?: number;
  isActive?: boolean;
  updatedAt?: Date;
  uploadedBy?: ResUser;
}
