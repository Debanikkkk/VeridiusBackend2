export interface ReqLoginPacket {
  checksum: string;
  firmwareVersion: string;
  imei: string;
  latitude: number;
  longitude: number;
  packetHeader: string;
  protocolVersion: string;
  vehicleRegNo: string;
  vendorId: string;
  deviceType: string;
}
