export interface ReqLoginPacket {
  checksum: string;
  firmwareVersion: string;
  imei: string;
  latitude: number;
  // latitudeDir: string;
  longitude: number;
  // longitudeDir: string;
  packetHeader: string;
  protocolVersion: string;
  // startCharacter: string;
  vehicleRegNo: string;
  vendorId: string;
  deviceType: string;
}
