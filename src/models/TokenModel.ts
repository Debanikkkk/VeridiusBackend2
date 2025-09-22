import { Permission } from "../entity/Permission";

export interface JWTTokenData {
  id: number;
  // oem: number;
  // workshop?: number;
  // workshopGroup?: number;
  // region?: number;
  // subOem?: number;
  // pincode?: number;
  // role_id?: number;
  role: { id: number; permissions:string };
}
