export interface JWTTokenData {
  id: number;
  // oem: number;
  // workshop?: number;
  // workshopGroup?: number;
  // region?: number;
  // subOem?: number;
  // pincode?: number;
  role: { permissions: string[] };
}
