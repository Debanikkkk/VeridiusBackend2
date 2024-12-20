// // import { Controller, Get, Path, Route, Tags } from 'tsoa';
// // import { AppDataSource } from '../data-source';
// // import { ECU } from '../entity/ECU';
// // import { Device } from '../entity/Device';

// import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
// import { AppDataSource } from '../data-source';
// import { ECU } from '../entity/ECU';
// import { ReqECU } from '../models/req/ReqECU';
// import { ResECU } from '../models/res/ResECU';
// // import { write } from 'fs';
// import { In } from 'typeorm';
// import { DtcDataset } from '../entity/DTCDataset';
// import { PIDDataset } from '../entity/PIDDataset';
// import { NegativeResponseCode } from '../entity/NegativeCode';
// import { Vehicle } from '../entity/Vehicle';
// import { ResDtcDataset } from '../models/res/ResDTCDataset';
// import { ResNegativeResponseCode } from '../models/res/ResNegativeResponse';
// import { ResPIDDataset } from '../models/res/ResPIDDataset';
// import { ResFirmware } from '../models/res/ResFirmware';
// import { ResVehicle } from '../models/res/ResVehicle';

// // // import { ReqECU } from '../models/req/ReqECU';
// // // import { In } from 'typeorm';
// // import { Vehicle } from '../entity/Vehicle';
// // import { ServiceTicket } from '../entity/ServiceTickets';
// // import { User } from '../entity/User';

// // @Route('/ecu')
// // @Tags('ECU')
// // export class EcuController extends Controller {
// //   private ecurepository = AppDataSource.getRepository(ECU);
// //   private devicerepositroy = AppDataSource.getRepository(Device);
// //   private vehiclerepository = AppDataSource.getRepository(Vehicle);
// //   private serviceticketrepository = AppDataSource.getRepository(ServiceTicket);
// //   private userrepository = AppDataSource.getRepository(User);
// //   // private repoi

// //   /**
// //    * get device imei using ecu
// //    * @summary  get device imei using ecu
// //    */
// //   @Get('macaddressFromIMEI/{macAdd}')
// //   public async getDeviceIMEIusingECU(@Path() macAdd: string) {
// //     const ecu = await this.ecurepository.findOne({
// //       where: {
// //         mac_id: macAdd,
// //         // mac_address: macAdd,
// //       },
// //     });

// //     if (!ecu) {
// //       return Promise.reject(new Error('THE DEVICE WASN NOT FOUND'));
// //     }
// //     console.log('ecu found', ecu);

// //     const vehicle = await this.vehiclerepository.findOne({
// //       where: {
// //         ecu: {
// //           id: ecu.id,
// //         },
// //       },
// //       relations: {
// //         service_ticket: true,
// //       },
// //     });

// //     if (!vehicle) {
// //       return Promise.reject(new Error('THE VEHICLE WASN NOT FOUND'));
// //     }
// //     console.log('vehicle found', vehicle);
// //     const service_ticket = await this.serviceticketrepository.findOne({
// //       where: {
// //         id: (await vehicle.service_ticket)?.id,
// //       },
// //       relations: {
// //         technician: true,
// //       },
// //     });

// //     if (!service_ticket) {
// //       return Promise.reject(new Error('THE SERVICE TICKET WASN NOT FOUND'));
// //     }

// //     const user = await this.userrepository.findOne({
// //       where: {
// //         id: (await service_ticket.technician)?.id,
// //       },
// //       relations: {
// //         device: true,
// //       },
// //     });

// //     if (!user) {
// //       return Promise.reject(new Error('THE USER WASN NOT FOUND'));
// //     }

// //     const device = await this.devicerepositroy.findOne({
// //       where: {
// //         id: user.device?.id,
// //       },
// //     });

// //     if (!device) {
// //       return Promise.reject(new Error('THE DEVCICE WASN NOT FOUND'));
// //     }
// //     return device;
// //   }

// //   // @Post()
// //   // public async saveEcu(@Body() req: ReqECU) {
// //   //   const { mac_address, name, vehicle } = req;
// //   //   const vehicleArr: Vehicle[] = [];
// //   //   if (vehicle) {
// //   //     const db_vehicle = await this.vehiclerepository.find({
// //   //       where: {
// //   //         id: In(vehicle),
// //   //       },
// //   //     });

// //   //     if (!vehicle) {
// //   //       return Promise.reject(new Error('THE VEHILCE FROM THE DB WAS NOT FOUND'));
// //   //     }

// //   //     vehicleArr.push(...db_vehicle);
// //   //   }

// //   //   const ecuToSave: ECU = {
// //   //     // mac_address: mac_address,
// //   //     // name: name,
// //   //     // vehicle: Promise.resolve(vehicleArr),

// //   //   };

// //   //   const ecuSaver = Object.assign(new ECU(), ecuToSave);
// //   //   const savedEcu = await this.ecurepository.save(ecuSaver);

// //   //   return savedEcu;
// //   // }
// // }
// @Route('/ecu')
// @Tags('ECU')
// export class EcuController extends Controller {
//   private vehiclerepository = AppDataSource.getRepository(Vehicle);
//   private ecurepository = AppDataSource.getRepository(ECU);
//   private dtcdatasetrepository = AppDataSource.getRepository(DtcDataset);
//   private piddatasetrepository = AppDataSource.getRepository(PIDDataset);
//   private negativeresponserepository = AppDataSource.getRepository(NegativeResponseCode);
//   @Post()
//   public async saveECU(@Body() req: ReqECU): Promise<ResECU> {
//     const {
//       isActive,
//       clearDtcFnIndex,
//       createdAt,
//       dtcDataset,
//       ecuName,
//       id,
//       iorTestIndex,
//       macId,
//       negativeResponses,
//       pidDataset,
//       protocol,
//       readDataFnIndex,
//       readDtcFcIndex,
//       rxHeader,
//       seedkeyalgoFnIndex,
//       txHeader,
//       updatedAt,
//       vehicles,
//       writeDataFnIndex,
//     } = req;

//     // const dtcDatasetArr: DtcDataset[]=[]
//     const piddatasetArr: PIDDataset[] = [];
//     const negativeResArr: NegativeResponseCode[] = [];

//     const dtcDatasetArr: DtcDataset[] = [];

//     if (dtcDataset) {
//       const db_dtc_dataset = await this.dtcdatasetrepository.find({
//         where: {
//           id: In(dtcDataset),
//         },
//       });
//       if (!db_dtc_dataset) {
//         return Promise.reject(new Error('THERE WAS A PROBLEM IN FETCHING THE DTC'));
//       }

//       dtcDatasetArr.push(...db_dtc_dataset);
//     }

//     if (pidDataset) {
//       const db_pid_dataset = await this.piddatasetrepository.find({
//         where: {
//           id: In(pidDataset),
//         },
//       });

//       if (!db_pid_dataset) {
//         return Promise.reject(new Error('THIS PID DATASET WAS NOT FOUND'));
//       }

//       piddatasetArr.push(...db_pid_dataset);
//     }

//     if (negativeResponses) {
//       const db_negres = await this.negativeresponserepository.find({
//         where: {
//           id: In(negativeResponses),
//         },
//       });
//       if (!db_negres) {
//         return Promise.reject(new Error('THERE WAS A PRONBELM IN RETREIVINV THE NEGATIVE RESPONSES'));
//       }

//       negativeResArr.push(...negativeResArr);
//     }
//     const vehicleArr;
//     let db_vehicle;
//     if (vehicles) {
//       const db_vehicle = await this.vehiclerepository.findOne({
//         where: {
//           id: In(vehicles),
//         },
//       });
//       if (!db_vehicle) {
//         return Promise.reject(new Error('THIS VEHICLE WAS NOT FOUND'));
//       }
//     }
//     const saveECU: ECU = {
//       clear_dtc_fn_index: clearDtcFnIndex,
//       created_at: createdAt,
//       // dtc_dataset,
//       dtc_datasets: dtcDatasetArr,
//       ecu_name: ecuName,
//       id: id,
//       ior_test_index: iorTestIndex,
//       is_active: isActive,
//       mac_id: macId,
//       negative_responses: negativeResArr,
//       // pid_dataset,
//       pid_datasets: piddatasetArr,
//       protocol: protocol,
//       read_data_fn_index: readDataFnIndex,
//       read_dtc_fc_index: readDtcFcIndex,
//       rx_header: rxHeader,
//       seedkey_algo_fn_index: seedkeyalgoFnIndex,
//       tx_header: txHeader,
//       updated_at: updatedAt,
//       vehicle: db_vehicle,
//       write_data_fn_index: writeDataFnIndex,
//     };

//     const ecuSaver = Object.assign(new ECU(), saveECU);
//     const savedECU = await this.ecurepository.save(ecuSaver);

//     const resEcu: ResECU = {
//       createdAt: savedECU.created_at,
//       //   dtcDataset: savedECU.dtc_datasets,
//       ecuName: savedECU.ecu_name,
//       id: savedECU.id,
//       isActive: savedECU.is_active,
//       macId: savedECU.mac_id,
//       //   negativeResponses: savedECU.negative_responses,
//       //   pidDataset: savedECU.pid_datasets,
//       //   firmwares,
//       //   vehicles,
//       protocol: savedECU.protocol,
//       rxHeader: savedECU.rx_header,
//       txHeader: savedECU.tx_header,
//       updatedAt: savedECU.updated_at,
//       //   vehicle: savedECU.vehicle,
//     };

//     const resDtcDatasetArr: ResDtcDataset[] = [];
//     const resNegresArr: ResNegativeResponseCode[] = [];
//     const resPidDatasetArr: ResPIDDataset[] = [];
//     // const resFirmwareArr: ResFirmware[] = [];
//     const resVehicle: ResVehicle[] = [];

//     savedECU.dtc_datasets?.map((dtc) => {
//       const resDtc: ResDtcDataset = {
//         createdAt: dtc.created_at,
//         description: dtc.description,
//         // dtcs: dtc.d,
//         // ecus: dtc.,
//         id: dtc.id,
//         isActive: dtc.is_active,
//         name: dtc.name,
//         updatedAt: dtc.updated_at,
//       };

//       resDtcDatasetArr.push(resDtc);
//     });
//     savedECU.negative_responses?.map((nr) => {
//       const resNegres: ResNegativeResponseCode = {
//         createdAt: nr.created_at,
//         id: nr.id,
//         responseCode: nr.response_code,
//         updatedAt: nr.updated_at,
//         description: nr.description,
//         // ecus: nr.,
//       };

//       resNegresArr.push(resNegres);
//     });

//     saveECU.pid_datasets?.map((pd) => {
//       const resPid: ResPIDDataset = {
//         active: pd.active,
//         createdAt: pd.created_at,
//         id: pd.id,
//         updatedAt: pd.updated_at,
//         description: pd.description,
//         // ecus,
//         // messageTypes,
//         name: pd.name,
//       };
//       resPidDatasetArr.push(resPid);
//     });

//     (await savedECU.vehicle)?.map((vh) => {
//       const resVehicle: ResVehicle = {
//         color: vh.color,
//         engineNumber: vh.engine_number,
//         id: vh.id,
//         manufactureYear: vh.manufacture_year,
//         mileage: vh.mileage,
//         transmissionType: vh.transmission_type,
//         vehicleNumber: vh.vehicle_number,
//         vin: vh.vin,
//       };

//     });
//     resEcu.pidDataset = resPidDatasetArr;
//     resEcu.negativeResponses = resNegresArr;
//     resEcu.dtcDataset = resDtcDatasetArr;

//     return resEcu;
//   }
//   @Get()
//   public async getAllECU() {
//     const ecus = await this.ecurepository.find({
//       relations: {
//         dtc_datasets: true,
//         negative_responses: true,
//         pid_datasets: true,
//       },
//     });

//     if (!ecus) {
//       return Promise.reject(new Error('THE ECUS  WERE NOT FOUND'));
//     }

//     const ecuArr: ResECU[] = [];

//     for (const ecu of ecus) {
//       ecuArr.push({
//         createdAt: ecu.created_at,
//         dtcDataset: ecu.dtc_datasets,
//         ecuName: ecu.ecu_name,
//         id: ecu.id,
//         isActive: ecu.is_active,
//         macId: ecu.mac_id,
//         // negativeResponses: ecu.negative_responses,
//         // pidDataset: ecu.pid_datasets,
//         protocol: ecu.protocol,
//         rxHeader: ecu.rx_header,
//         txHeader: ecu.tx_header,
//         updatedAt: ecu.updated_at,
//         // vehicle: ecu.vehicle,
//       });
//     }

//     return ecuArr;
//   }
// }
