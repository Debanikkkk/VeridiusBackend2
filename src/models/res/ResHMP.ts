export interface ResHMP {
  analogInput1Status?: number;
  analogInput2Status?: number;
  batteryPercentage?: number;
  checksum?: string;
  dataUpdateRateWhenIgnitionOff?: string;
  dataUpdateRateWhenIgnitionOn?: string;
  digitalInputStatus?: string;
  endCharacter?: string;
  firmwareVersion?: string;
  header?: string;
  id?: number;
  imei?: string;
  lowBatteryThresholdPercentage?: number;
  memoryPercentage1?: number;
  memoryPercentage2?: number;
  startCharacter?: string;
  vendorId?: string;
  version?: string;
}
