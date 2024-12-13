// import { Body, Controller, Post, Route, Tags } from 'tsoa';
// import { AppDataSource } from '../data-source';
// import { Vehicle } from '../entity/Vehicle';
// import { ReqVehicle } from '../models/req/ReqVehicle';
// import { ECU } from '../entity/ECU';
// import { In } from 'typeorm';
// import { ServiceTicket } from '../entity/ServiceTickets';
// @Route('/vehicle')
// @Tags('Vehicle')
// export class VehicleController extends Controller {
//   private vehiclerepository = AppDataSource.getRepository(Vehicle);
//   private ecurepository = AppDataSource.getRepository(ECU);
//   private serviceticketrepository = AppDataSource.getRepository(ServiceTicket);
//   @Post()
//   public async saveVehicle(@Body() reqVechicle: ReqVehicle) {
//     const { ecu, name, service_ticket } = reqVechicle;
//     const ecuArr: ECU[] = [];
//     if (ecu) {
//       const ecus = await this.ecurepository.find({
//         where: {
//           id: In(ecu),
//         },
//       });

//       if (!ecu) {
//         return Promise.reject(new Error('ECUS NOT FOUND'));
//       }

//       ecuArr.push(...ecus);
//     }
//     const serviceTicket = await this.serviceticketrepository.findOne({
//       where: {
//         id: service_ticket,
//       },
//     });
//     if (!serviceTicket) {
//       return Promise.reject(new Error('SERVICE TICKET WAS NOT FOUND'));
//     }
//     const vehicleToSave: Vehicle = {
//       ecu: Promise.resolve(ecuArr),
//       name: name,
//       // oem: ,
//       service_ticket: Promise.resolve(serviceTicket),
//     };

//     const vehicleSaver = Object.assign(new Vehicle(), vehicleToSave);
//     const savedVehicle = await this.vehiclerepository.save(vehicleSaver);

//     return savedVehicle;
//   }
// }
