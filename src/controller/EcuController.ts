import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ECU } from '../entity/ECU';
import { Device } from '../entity/Device';

import { ReqECU } from '../models/req/ReqECU';
import { In } from 'typeorm';
import { Vehicle } from '../entity/Vehicle';
import { ServiceTicket } from '../entity/ServiceTickets';
import { User } from '../entity/User';

@Route('/ecu')
@Tags('ECU')
export class EcuController extends Controller {
  private ecurepository = AppDataSource.getRepository(ECU);
  private devicerepositroy = AppDataSource.getRepository(Device);
  private vehiclerepository = AppDataSource.getRepository(Vehicle);
  private serviceticketrepository = AppDataSource.getRepository(ServiceTicket);
  private userrepository = AppDataSource.getRepository(User);
  // private repoi

  /**
   * get device imei using ecu
   * @summary  get device imei using ecu
   */
  @Get('macaddressFromIMEI/{macAdd}')
  public async getDeviceIMEIusingECU(@Path() macAdd: string) {
    const ecu = await this.ecurepository.findOne({
      where: {
        mac_address: macAdd,
      },
    });

    if (!ecu) {
      return Promise.reject(new Error('THE DEVICE WASN NOT FOUND'));
    }
    console.log('ecu found', ecu);

    const vehicle = await this.vehiclerepository.findOne({
      where: {
        ecu: {
          id: ecu.id,
        },
      },
      relations: {
        service_ticket: true,
      },
    });

    if (!vehicle) {
      return Promise.reject(new Error('THE VEHICLE WASN NOT FOUND'));
    }
    console.log('vehicle found', vehicle);
    const service_ticket = await this.serviceticketrepository.findOne({
      where: {
        id: (await vehicle.service_ticket)?.id,
      },
      relations: {
        technician: true,
      },
    });

    if (!service_ticket) {
      return Promise.reject(new Error('THE SERVICE TICKET WASN NOT FOUND'));
    }

    const user = await this.userrepository.findOne({
      where: {
        id: (await service_ticket.technician)?.id,
      },
      relations: {
        device: true,
      },
    });

    if (!user) {
      return Promise.reject(new Error('THE USER WASN NOT FOUND'));
    }

    const device = await this.devicerepositroy.findOne({
      where: {
        id: user.device?.id,
      },
    });

    if (!device) {
      return Promise.reject(new Error('THE DEVCICE WASN NOT FOUND'));
    }
    return device;
  }

  @Post()
  public async saveEcu(@Body() req: ReqECU) {
    const { mac_address, name, vehicle } = req;
    const vehicleArr: Vehicle[] = [];
    if (vehicle) {
      const db_vehicle = await this.vehiclerepository.find({
        where: {
          id: In(vehicle),
        },
      });

      if (!vehicle) {
        return Promise.reject(new Error('THE VEHILCE FROM THE DB WAS NOT FOUND'));
      }

      vehicleArr.push(...db_vehicle);
    }

    const ecuToSave: ECU = {
      mac_address: mac_address,
      name: name,
      vehicle: Promise.resolve(vehicleArr),
    };

    const ecuSaver = Object.assign(new ECU(), ecuToSave);
    const savedEcu = await this.ecurepository.save(ecuSaver);

    return savedEcu;
  }
}
