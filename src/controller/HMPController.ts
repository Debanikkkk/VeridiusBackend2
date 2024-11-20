import { Body, Controller, Post } from 'tsoa';
import { AppDataSource } from '../data-source';
import { HealthMonitoringPacket } from '../entity/HealthMonitoringPakcet';
import { ReqHMP } from '../models/req/ReqHMP';
// import { ResHMP } from '../models/res/ResHMP';

export class HMPController extends Controller {
  private hmprepository = AppDataSource.getRepository(HealthMonitoringPacket);

  @Post()
  public async saveHmp(@Body() request: ReqHMP) {
    const {
      analogInput1Status,
      analogInput2Status,
      batteryPercentage,
      checksum,
      dataUpdateRateWhenIgnitionOff,
      dataUpdateRateWhenIgnitionOn,
      digitalInputStatus,
      endCharacter,
      firmwareVersion,
      header,
      imei,
      lowBatteryThresholdPercentage,
      memoryPercentage1,
      memoryPercentage2,
      //   startCharacter,
      vendorId,
      version,
    } = request;

    const hmpToSave: HealthMonitoringPacket = {
      analogInput1Status: analogInput1Status,
      analogInput2Status: analogInput2Status,
      batteryPercentage: batteryPercentage,
      checksum: checksum,
      dataUpdateRateWhenIgnitionOff: dataUpdateRateWhenIgnitionOff,
      dataUpdateRateWhenIgnitionOn: dataUpdateRateWhenIgnitionOn,
      digitalInputStatus: digitalInputStatus,
      endCharacter: endCharacter,
      firmwareVersion: firmwareVersion,
      header: header,
      // id:id,
      imei: imei,
      lowBatteryThresholdPercentage: lowBatteryThresholdPercentage,
      memoryPercentage1: memoryPercentage1,
      memoryPercentage2: memoryPercentage2,
      //   startCharacter: startCharacter,
      vendorId: vendorId,
      version: version,
    };

    const hmpSaver = Object.assign(new HealthMonitoringPacket(), hmpToSave);
    const savedHMP = await this.hmprepository.save(hmpSaver);

    return savedHMP;
  }
}
