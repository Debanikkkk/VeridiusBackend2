import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Vehicle } from '../entity/Vehicle';
import { ReqVehicle } from '../models/req/ReqVehicle';
import { VehicleSubModel } from '../entity/VehicleSubModel';
import { VehicleModel } from '../entity/VehicleModel';
import { OEM } from '../entity/OEM';
import { VehicleSegment } from '../entity/VehicleSegment';
import { VehicleVersion } from '../entity/VehicleVersion';
import { ResVehicle } from '../models/res/ResVehicle';
import { ECU } from '../entity/ECU';
import { In } from 'typeorm';
import { ResECU } from '../models/res/ResECU';

@Route('/vehicle')
@Tags('Vehicle')
export class VehicleController extends Controller {
  private vehiclerepository = AppDataSource.getRepository(Vehicle);
  private vehiclesubmodelrepository = AppDataSource.getRepository(VehicleSubModel);
  private vehiclemodelrepository = AppDataSource.getRepository(VehicleModel);
  private oemrepository = AppDataSource.getRepository(OEM);
  private vehiclesegmentrepository = AppDataSource.getRepository(VehicleSegment);
  private vehicleversionrepository = AppDataSource.getRepository(VehicleVersion);
  private ecurepository = AppDataSource.getRepository(ECU);
  @Post()
  public async saveVehicle(@Body() req: ReqVehicle) {
    const {
      color,
      engineNumber,
      //   id,
      ecus,
      manufactureYear,
      mileage,
      transmissionType,
      vehicleModel,
      vehicleNumber,
      vehicleSegment,
      vehicleSubModel,
      vehicleVersion,
      vin,
    } = req;

    const ecuArr: ResECU[] = [];
    if (ecus) {
      const db_ecus = await this.ecurepository.find({
        where: {
          id: In(ecus),
        },
      });

      if (!db_ecus) {
        return Promise.reject(new Error('THESE ECUS WERE NOT FOUND'));
      }

      ecuArr.push(...db_ecus);
    }
    const vehicle_model_db = await this.vehiclemodelrepository.findOne({
      where: {
        id: vehicleModel,
      },
    });

    if (!vehicle_model_db) {
      return Promise.reject(new Error('THIS VEHICLE MODEL WAS NOT FOUND'));
    }

    const vehicle_segment_db = await this.vehiclesegmentrepository.findOne({
      where: {
        id: vehicleSegment,
      },
    });
    if (!vehicle_segment_db) {
      return Promise.reject(new Error('THIS VEHICLE SEGMENT WAS NOT FOUND'));
    }

    const vehicle_sub_model = await this.vehiclesubmodelrepository.findOne({
      where: {
        id: vehicleSubModel,
      },
    });

    if (!vehicle_sub_model) {
      return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
    }

    const vehicle_version_db = await this.vehicleversionrepository.findOne({
      where: {
        id: vehicleVersion,
      },
    });
    if (!vehicle_version_db) {
      return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
    }

    const vehicleToSave: Vehicle = {
      color: color,
      //   dealer:,
      engine_number: engineNumber,
      //   id: id,
      manufacture_year: manufactureYear,
      mileage: mileage,
      transmission_type: transmissionType,
      //   vehicle_insurances,
      vehicle_model: vehicle_model_db,
      vehicle_number: vehicleNumber,
      //   vehicle_owner,
      //   vehicle_parts_replacements: vehicel,
      vehicle_segment: vehicle_segment_db,
      vehicle_sub_model: vehicle_sub_model,
      vehicle_version: vehicle_version_db,
      vin: vin,
    };

    const vehicleSaver = Object.assign(new Vehicle(), vehicleToSave);
    const savedVehicle = await this.vehiclerepository.save(vehicleSaver);
    // const recu = savedVehicle.ecus;
    const resEcuArr: ResECU[] = [];

    const resVehicle: ResVehicle = {
      color: savedVehicle.color,
      engineNumber: savedVehicle.engine_number,
      id: savedVehicle.id,
      manufactureYear: savedVehicle.manufacture_year,
      mileage: savedVehicle.mileage,
      transmissionType: savedVehicle.transmission_type,
      vehicleModel: savedVehicle.vehicle_model,
      vehicleNumber: savedVehicle.vehicle_number,
      vehicleSegment: savedVehicle.vehicle_segment,
      vehicleSubModel: savedVehicle.vehicle_sub_model,
      vehicleVersion: savedVehicle.vehicle_version,
      vin: savedVehicle.vin,
      // ecus:
    };
    (await savedVehicle.ecus)?.map((e) => {
      const resEcuTemp: ResECU = {
        createdAt: e.created_at,
        // dtcDataset,
        ecuName: e.ecu_name,
        // firmwares: e.firmware,
        id: e.id,
        isActive: e.is_active,
        macId: e.mac_id,
        // negativeResponses,
        // pidDataset,

        protocol: e.protocol,
        rxHeader: e.rx_header,
        txHeader: e.tx_header,
        updatedAt: e.updated_at,
        // vehicles
      };
      resEcuArr.push(resEcuTemp);
    });
    resVehicle.ecus = resEcuArr;
    return resVehicle;
  }

  @Get('/{vehicleId}')
  public async getOneVehicle(@Path() vehicleId: number): Promise<ResVehicle> {
    const vehicle = await this.vehiclerepository.findOne({
      where: {
        id: vehicleId,
      },
      relations: {
        vehicle_model: true,
        vehicle_segment: true,
        vehicle_sub_model: true,
        vehicle_version: true,
        ecus: true,
      },
    });

    if (!vehicle) {
      return Promise.reject(new Error('THIS VEHICLE  WAS NOT FOUND'));
    }
    const vehicle_model_db = await this.vehiclemodelrepository.findOne({
      where: {
        id: vehicle.vehicle_model?.id,
      },
    });

    if (!vehicle_model_db) {
      return Promise.reject(new Error('THIS VEHICLE MODEL WAS NOT FOUND'));
    }

    const vehicle_segment_db = await this.vehiclesegmentrepository.findOne({
      where: {
        id: vehicle.vehicle_segment?.id,
      },
    });
    if (!vehicle_segment_db) {
      return Promise.reject(new Error('THIS VEHICLE SEGMENT WAS NOT FOUND'));
    }

    const vehicle_sub_model = await this.vehiclesubmodelrepository.findOne({
      where: {
        id: vehicle.vehicle_sub_model?.id,
      },
    });

    if (!vehicle_sub_model) {
      return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
    }

    const vehicle_version_db = await this.vehicleversionrepository.findOne({
      where: {
        id: vehicle.vehicle_version?.id,
      },
    });
    if (!vehicle_version_db) {
      return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
    }

    const resEcuArr: ResECU[] = [];
    const ecu_db = vehicle.ecus;
    const resVehicle: ResVehicle = {
      color: vehicle.color,
      engineNumber: vehicle.engine_number,
      id: vehicle.id,
      manufactureYear: vehicle.manufacture_year,
      mileage: vehicle.mileage,
      transmissionType: vehicle.transmission_type,
      vehicleModel: vehicle_model_db,
      vehicleNumber: vehicle.vehicle_number,
      vehicleSegment: vehicle_segment_db,
      vehicleSubModel: vehicle_sub_model,
      vehicleVersion: vehicle_version_db,
      vin: vehicle.vin,
    };
    (await ecu_db)?.map((ed) => {
      const resVehicleEcu: ResECU = {
        createdAt: ed.created_at,
        // dtcDataset,
        ecuName: ed.ecu_name,
        // firmwares,
        id: ed.id,
        isActive: ed.is_active,
        macId: ed.mac_id,
        // negativeResponses,
        // pidDataset,
        protocol: ed.protocol,
        rxHeader: ed.rx_header,
        txHeader: ed.tx_header,
        updatedAt: ed.updated_at,
        // vehicles,
      };
      resEcuArr.push(resVehicleEcu);
    });
    resVehicle.ecus = resEcuArr;
    return resVehicle;
  }

  @Get()
  public async getAllVehicle(): Promise<ResVehicle[]> {
    const vehicles = await this.vehiclerepository.find();

    if (!vehicles) {
      return Promise.reject(new Error('THIS VEHICLE WAS NOT FOUND'));
    }

    const vehicleArr: ResVehicle[] = [];

    for (const vehicle of vehicles) {
      const vehicle_model_db = await this.vehiclemodelrepository.findOne({
        where: {
          id: vehicle.vehicle_model?.id,
        },
      });

      if (!vehicle_model_db) {
        return Promise.reject(new Error('THIS VEHICLE MODEL WAS NOT FOUND'));
      }

      const vehicle_segment_db = await this.vehiclesegmentrepository.findOne({
        where: {
          id: vehicle.vehicle_segment?.id,
        },
      });
      if (!vehicle_segment_db) {
        return Promise.reject(new Error('THIS VEHICLE SEGMENT WAS NOT FOUND'));
      }

      const vehicle_sub_model = await this.vehiclesubmodelrepository.findOne({
        where: {
          id: vehicle.vehicle_sub_model?.id,
        },
      });

      if (!vehicle_sub_model) {
        return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
      }

      const vehicle_version_db = await this.vehicleversionrepository.findOne({
        where: {
          id: vehicle.vehicle_version?.id,
        },
      });
      if (!vehicle_version_db) {
        return Promise.reject(new Error('THIS VEHICLE SUBMODEL WAS NOT FOUND'));
      }
      const resEcuArr: ResECU[] = [];
      const ecu_db = vehicle.ecus;

      (await ecu_db)?.map((ed) => {
        const resVehicleEcu: ResECU = {
          createdAt: ed.created_at,
          // dtcDataset,
          ecuName: ed.ecu_name,
          // firmwares,
          id: ed.id,
          isActive: ed.is_active,
          macId: ed.mac_id,
          // negativeResponses,
          // pidDataset,
          protocol: ed.protocol,
          rxHeader: ed.rx_header,
          txHeader: ed.tx_header,
          updatedAt: ed.updated_at,
          // vehicles,
        };
        resEcuArr.push(resVehicleEcu);
      });
      // resVehicle.ecus = resEcuArr;
      vehicleArr.push({
        color: vehicle.color,
        engineNumber: vehicle.engine_number,
        id: vehicle.id,
        manufactureYear: vehicle.manufacture_year,
        mileage: vehicle.mileage,
        transmissionType: vehicle.transmission_type,
        vehicleModel: vehicle_model_db,
        vehicleNumber: vehicle.vehicle_number,
        vehicleSegment: vehicle_segment_db,
        vehicleSubModel: vehicle_sub_model,
        vehicleVersion: vehicle_version_db,
        vin: vehicle.vin,
        ecus: resEcuArr,
      });
    }
    return vehicleArr;
  }

  @Delete('/{vehicleId}')
  public async deleteVehicle(@Path() vehicleId: number) {
    const vehicle_to_delete = await this.vehiclerepository.findOne({
      where: {
        id: vehicleId,
      },
    });
    if (!vehicle_to_delete) {
      return Promise.reject(new Error('THIS VEHICLE WAS NOT FOUND'));
    }
    await this.vehiclerepository.remove(vehicle_to_delete);

    return { result: 'THE VEHICLE WAS DELETED SUCCESSFULLY ' };
  }
}
