export interface ReqHMP {
  analogInput1Status: number;
  analogInput2Status: number;
  batteryPercentage: number;
  checksum: string;
  dataUpdateRateWhenIgnitionOff: number;
  dataUpdateRateWhenIgnitionOn: number;
  digitalInputStatus: string;
  // endCharacter: string;
  firmwareVersion: string;
  header: string;
  // id,
  imei: string;
  lowBatteryThresholdPercentage: number;
  memoryPercentage1: number;
  memoryPercentage2: number;
  //   startCharacter: string;
  vendorId: string;
  version: string;
}
