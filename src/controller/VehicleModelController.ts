import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehicleModel } from '../entity/VehicleModel';
import { ReqVehicleModel } from '../models/req/ReqVehicleModel';
import { ResVehicleModel } from '../models/res/ResVehicleModel';
import { OEM } from '../entity/OEM';
import { VehicleSegment } from '../entity/VehicleSegment';
import { VehicleVersion } from '../entity/VehicleVersion';

@Tags('Vehicle Model')
@Route('/vehicleModel')
export class VehicleModelController extends Controller {
  private vehiclemodelrepository = AppDataSource.getRepository(VehicleModel);
  private oemrepository = AppDataSource.getRepository(OEM);
  private vehiclesegmentrepository = AppDataSource.getRepository(VehicleSegment);
  private vehicleversionrepository = AppDataSource.getRepository(VehicleVersion);
  @Post()
  public async saveVehicleModel(@Body() request: ReqVehicleModel): Promise<ResVehicleModel> {
    const { discontinuedYear, launchYear, name, oem, vehicleSegment, vehicleVersion } = request;

    const db_oem = await this.oemrepository.findOne({
      where: {
        id: oem,
      },
    });
    if (!db_oem) {
      return Promise.reject(new Error('THIS OEM WAS NOT FOUND'));
    }
    const db_vehicle_segment = await this.vehiclesegmentrepository.findOne({
      where: {
        id: vehicleSegment,
      },
    });
    if (!db_vehicle_segment) {
      return Promise.reject(new Error('THIS DB SEGMENT WAS NOT FOUND'));
    }
    const db_vehicle_version = await this.vehicleversionrepository.findOne({
      where: {
        id: vehicleVersion,
      },
    });

    if (!db_vehicle_version) {
      return Promise.reject(new Error('THIS DB VEHICLE VERSION WAS NOT FOUND'));
    }
    // const db_vehicle_segment=await this.vehiclesegmentrepository
    const vehicleModelSaver: VehicleModel = {
      discontinued_year: discontinuedYear,
      launch_year: launchYear,
      name: name,
      oem: db_oem,
      vehicle_segment: db_vehicle_segment,
      vehicle_version: db_vehicle_version,
    };

    const saveVehicleModel = Object.assign(new VehicleModel(), vehicleModelSaver);
    const savedVehicleModel = await this.vehiclemodelrepository.save(saveVehicleModel);

    const resVehicleModel: ResVehicleModel = {
      discontinuedYear: savedVehicleModel.discontinued_year,
      id: savedVehicleModel.id,
      launchYear: savedVehicleModel.launch_year,
      name: savedVehicleModel.name,
      oem: {
        contact_information: savedVehicleModel.oem?.contact_information,
        country: savedVehicleModel.oem?.country,
        founded_year: savedVehicleModel.oem?.founded_year,
        id: savedVehicleModel.oem?.id,
        name: savedVehicleModel.oem?.name,
        website: savedVehicleModel.oem?.website,
      },
      vehicleSegment: {
        description: savedVehicleModel.vehicle_segment?.description,
        id: savedVehicleModel.vehicle_segment?.id,
        name: savedVehicleModel.vehicle_segment?.name,
      },
      vehicleVersion: {
        features: savedVehicleModel.vehicle_version?.features,
        id: savedVehicleModel.vehicle_version?.id,
        name: savedVehicleModel.vehicle_version?.name,
        price: savedVehicleModel.vehicle_version?.price,
      },
    };
    return resVehicleModel;
  }

  @Get()
  public async getAllVehicleModel() {
    const db_vehicle_models = await this.vehiclemodelrepository.find({
      relations: {
        vehicle_segment: true,
        vehicle_version: true,
        oem: true,
      },
    });

    if (!db_vehicle_models) {
      return Promise.reject(new Error('THIS DB VEHICLE MODELS WAS NOT FOUND'));
    }

    const vehicleModelsArr: ResVehicleModel[] = [];
    for (const vm of db_vehicle_models) {
      const db_oem = await this.oemrepository.findOne({
        where: {
          id: vm.oem?.id,
        },
      });
      if (!db_oem) {
        return Promise.reject(new Error('THIS OEM WAS NOT FOUND'));
      }
      const db_vehicle_segment = await this.vehiclesegmentrepository.findOne({
        where: {
          id: vm.vehicle_segment?.id,
        },
      });
      if (!db_vehicle_segment) {
        return Promise.reject(new Error('THIS DB SEGMENT WAS NOT FOUND'));
      }
      const db_vehicle_version = await this.vehicleversionrepository.findOne({
        where: {
          id: vm.vehicle_version?.id,
        },
      });

      if (!db_vehicle_version) {
        return Promise.reject(new Error('THIS DB VEHICLE VERSION WAS NOT FOUND'));
      }
      vehicleModelsArr.push({
        discontinuedYear: vm.discontinued_year,
        id: vm.id,
        launchYear: vm.launch_year,
        name: vm.name,
        oem: db_oem,
        vehicleSegment: db_vehicle_segment,
        vehicleVersion: db_vehicle_version,
      });
    }
    return vehicleModelsArr;
  }

  @Get('/{vehicleModelId}')
  public async getOneVehicleModel(@Path() vehicleModelId: number) {
    const db_vehicle_model = await this.vehiclemodelrepository
      .findOne({
        where: {
          id: vehicleModelId,
        },
        relations: {
          vehicle_version: true,
          vehicle_segment: true,
          oem: true,
        },
      })
      .then((vm) => {
        if (!vm) {
          return Promise.reject(new Error('THIS DB VEHICLE Model WAS NOT FOUND'));
        }
        const db_oem = this.oemrepository.findOne({
          where: {
            id: vm.oem?.id,
          },
        });
        if (!db_oem) {
          return Promise.reject(new Error('THIS OEM WAS NOT FOUND'));
        }
        const db_vehicle_segment = this.vehiclesegmentrepository.findOne({
          where: {
            id: vm.vehicle_segment?.id,
          },
        });
        if (!db_vehicle_segment) {
          return Promise.reject(new Error('THIS DB SEGMENT WAS NOT FOUND'));
        }
        const db_vehicle_version = this.vehicleversionrepository.findOne({
          where: {
            id: vm.vehicle_version?.id,
          },
        });

        if (!db_vehicle_version) {
          return Promise.reject(new Error('THIS DB VEHICLE VERSION WAS NOT FOUND'));
        }
        const resVehicleModel: ResVehicleModel = {
          discontinuedYear: vm.discontinued_year,
          id: vm.id,
          launchYear: vm.launch_year,
          name: vm.name,
          oem: {
            contact_information: vm.oem?.contact_information,
            country: vm.oem?.country,
            founded_year: vm.oem?.founded_year,
            id: vm.oem?.id,
            name: vm.oem?.name,
            website: vm.oem?.website,
          },
          vehicleSegment: {
            description: vm.vehicle_segment?.description,
            id: vm.vehicle_segment?.id,
            name: vm.vehicle_segment?.name,
          },
          vehicleVersion: {
            features: vm.vehicle_version?.features,
            id: vm.vehicle_version?.id,
            name: vm.vehicle_version?.name,
            price: vm.vehicle_version?.price,
          },
        };
        return resVehicleModel;
      });
    return db_vehicle_model;
  }

  @Delete('/{vehicleModelId}')
  public async deleteVehicleModel(@Path() vehicleModelId: number) {
    const vehicle_model_to_delete = await this.vehiclemodelrepository.findOne({
      where: {
        id: vehicleModelId,
      },
    });

    if (!vehicle_model_to_delete) {
      return Promise.reject(new Error('THIS VEHICLE MODEL WAS NOT FOUND'));
    }

    await this.vehiclemodelrepository.remove(vehicle_model_to_delete);
    return { result: 'THIS VEHICLE MODEL WAS DELETED SUCCESSFULLY' };
  }
}
