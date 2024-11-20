import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ReqLoginPacket } from '../models/req/ReqLoginPacket';
import { LoginPacket } from '../entity/LoginPacket';
@Tags('Login Packet')
@Route('/loginpacket')
export class LoginPacketController extends Controller {
  private loginpacketrepository = AppDataSource.getRepository(LoginPacket);

  @Post()
  public async saveLoginPacket(@Body() req: ReqLoginPacket) {
    const { checksum, deviceType, version, firmwareVersion, imei, latitude, longitude, packetHeader, protocolVersion, vehicleRegNo, vendorId } = req;

    const loginpack: LoginPacket = {
      checksum: checksum,
      device_type: deviceType,
      firmwareVersion: firmwareVersion,
      imei: imei,
      latitude: latitude,
      longitude: longitude,
      packetHeader: packetHeader,
      version: version,
      protocolVersion: protocolVersion,
      vehicleRegNo: vehicleRegNo,
      vendorId: vendorId,
    };
    const loginPacketToSave = Object.assign(new LoginPacket(), loginpack);
    const savedLoginPacket = await this.loginpacketrepository.save(loginPacketToSave);

    return savedLoginPacket;
  }
}
