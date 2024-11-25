import { Body, Controller, Post } from 'tsoa';
import { AppDataSource } from '../data-source';
import { TrackingPacket } from '../entity/TrackingPacket';
import { ReqTrackingPacket } from '../models/req/ReqTrackingPacket';

export class TrackingPacketController extends Controller {
  private trackingpacketrepository = AppDataSource.getRepository(TrackingPacket);

  @Post()
  public async saveTrackingPacket(@Body() req: ReqTrackingPacket) {
    // Create a new TrackingPacket instance
    const trackingPacket = this.trackingpacketrepository.create({
      startCharacter: req.startCharacter,
      version: req.version,
      packetHeader: req.packetHeader,
      vendorId: req.vendorId,
      firmwareVersion: req.firmwareVersion,
      packetType: req.packetType,
      messageId: req.messageId,
      packetStatus: req.packetStatus,
      imei: req.imei,
      vehicleRegNo: req.vehicleRegNo,
      gpsFix: req.gpsFix,
      date: req.date,
      time: req.time,
      latitude: req.latitude,
      latitudeDir: req.latitudeDir,
      longitude: req.longitude,
      longitudeDir: req.longitudeDir,
      speed: req.speed,
      heading: req.heading,
      noOfSatellites: req.noOfSatellites,
      altitude: req.altitude,
      pdop: req.pdop,
      hdop: req.hdop,
      networkOperatorName: req.networkOperatorName,
      ignitionStatus: req.ignitionStatus,
      mainPowerStatus: req.mainPowerStatus,
      mainInputVoltage: req.mainInputVoltage,
      internalBatteryVoltage: req.internalBatteryVoltage,
      emergencyStatus: req.emergencyStatus,
      tamperAlert: req.tamperAlert,
      gsmSignalStrength: req.gsmSignalStrength,
      mccServing: req.mccServing,
      mncServing: req.mncServing,
      lacServing: req.lacServing,
      cellIdServing: req.cellIdServing,
      gsmSignalStrengthNmr1stNeighbour: req.gsmSignalStrengthNmr1stNeighbour,
      lacNmr1stNeighbour: req.lacNmr1stNeighbour,
      cellIdNmr1stNeighbour: req.cellIdNmr1stNeighbour,
      gsmSignalStrengthNmr2ndNeighbour: req.gsmSignalStrengthNmr2ndNeighbour,
      lacNmr2ndNeighbour: req.lacNmr2ndNeighbour,
      cellIdNmr2ndNeighbour: req.cellIdNmr2ndNeighbour,
      gsmSignalStrengthNmr3rdNeighbour: req.gsmSignalStrengthNmr3rdNeighbour,
      lacNmr3rdNeighbour: req.lacNmr3rdNeighbour,
      cellIdNmr3rdNeighbour: req.cellIdNmr3rdNeighbour,
      gsmSignalStrengthNmr4thNeighbour: req.gsmSignalStrengthNmr4thNeighbour,
      lacNmr4thNeighbour: req.lacNmr4thNeighbour,
      cellIdNmr4thNeighbour: req.cellIdNmr4thNeighbour,
      digitalInputStatus: req.digitalInputStatus,
      digitalOutputStatus: req.digitalOutputStatus,
      frameNumber: req.frameNumber,
      analogInput1: req.analogInput1,
      analogInput2: req.analogInput2,
      deltaDistance: req.deltaDistance,
      otaResponse: req.otaResponse,
      endCharacter: req.endCharacter,
      checksum: req.checksum,
    });

    // Save the TrackingPacket to the database

    const savedTP = await this.trackingpacketrepository.save(trackingPacket);
    return savedTP;
  }
}
