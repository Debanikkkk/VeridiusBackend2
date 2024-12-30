import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Dealer } from '../entity/Dealer';
import { ReqDealer } from '../models/req/ReqDealer';
import { ResDealer } from '../models/res/ResDealer';
import { Vehicle } from '../entity/Vehicle';
import { In } from 'typeorm';
import { ResVehicle } from '../models/res/ResVehicle';

@Tags('Dealer')
@Route('/dealer')
export class DealerController extends Controller {
  private dealerrep = AppDataSource.getRepository(Dealer);
  private vehiclerepository = AppDataSource.getRepository(Vehicle);

  @Post()
  public async saveDealer(@Body() req: ReqDealer): Promise<ResDealer> {
    const { contactInformation, location, name, vehicles } = req;

    const resVehicleArr: Vehicle[] = [];
    if (vehicles) {
      const vehicle = await this.vehiclerepository.find({
        where: {
          id: In(vehicles),
        },
      });

      if (!vehicle) {
        return Promise.reject(new Error('THE VEHICLES WERE NOT FOUND'));
      }

      resVehicleArr.push(...vehicle);
    }

    const savedealer: Dealer = {
      contact_information: contactInformation,
      //   id,
      location: location,
      name: name,
      vehicles: resVehicleArr,
    };

    const dealerSaver = Object.assign(new Dealer(), savedealer);
    const savedDealer = await this.dealerrep.save(dealerSaver);

    const resDealer: ResDealer = {
      contactInformation: savedDealer.contact_information,
      id: savedDealer.id,
      location: savedDealer.location,
      name: savedDealer.name,
    };
    const resVehicleArrr: ResVehicle[] = [];
    savedDealer.vehicles?.map((rd) => {
      const resVehicle: ResVehicle = {
        color: rd.color,
        engineNumber: rd.engine_number,
        id: rd.id,
        manufactureYear: rd.manufacture_year,
        mileage: rd.mileage,
        transmissionType: rd.transmission_type,
        vehicleNumber: rd.vehicle_number,
        vin: rd.vin,
      };
      resVehicleArrr.push(resVehicle);
    });
    return resDealer;
  }

  @Get('/{dealerId}')
  public async getOneDealer(@Path() dealerId: number) {
    const dealer = await this.dealerrep.findOne({
      where: {
        id: dealerId,
      },
      relations: {
        vehicles: true,
      },
    });

    if (!dealer) {
      return Promise.reject(new Error('THE DEALER WAS NOT FOUND'));
    }

    const resDealer: ResDealer = {
      contactInformation: dealer.contact_information,
      id: dealer.id,
      location: dealer.location,
      name: dealer.name,
      //   vehicles: ,
    };

    const resDealerArr: ResVehicle[] = [];
    dealer.vehicles?.map((dv) => {
      const resDealer: ResVehicle = {
        color: dv.color,
        // ecus,
        engineNumber: dv.engine_number,
        id: dv.id,
        manufactureYear: dv.manufacture_year,
        mileage: dv.mileage,
        transmissionType: dv.transmission_type,
        // vehicleModel: dv.,
        vehicleNumber: dv.vehicle_number,
        // vehicleSegment: dv.,
        // vehicleSubModel: dv.,
        // vehicleVersion: dv.ve,
        vin: dv.vin,
      };
      resDealerArr.push(resDealer);
    });

    resDealer.vehicles = resDealerArr;
    return resDealer;
  }
}
