import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehicleSubModel } from '../entity/VehicleSubModel';
import { ReqVehicleSubmodel } from '../models/req/ReqVehicleSubmodel';
import { ResVehicleSubmodel } from '../models/res/ResVehicleSubmodel';
import { VehicleModel } from '../entity/VehicleModel';
import { OEM } from '../entity/OEM';
import { VehicleSegment } from '../entity/VehicleSegment';
import { VehicleVersion } from '../entity/VehicleVersion';

@Tags('Vehicle SubModel')
@Route('/vehicleSubModel')
export class VehicleSubmodelController extends Controller {
  private vehiclesubmodelrepository = AppDataSource.getRepository(VehicleSubModel);
  private vehiclemodelrepository = AppDataSource.getRepository(VehicleModel);
  private oemrepository = AppDataSource.getRepository(OEM);
  private vehiclesegmentrepository = AppDataSource.getRepository(VehicleSegment);
  private vehicleversionrepository = AppDataSource.getRepository(VehicleVersion);
  //   @Post()
  @Post()
  public async saveVehicleSubmodel(@Body() request: ReqVehicleSubmodel): Promise<ResVehicleSubmodel> {
    const { engineCapacity, fuelEfficiency, name, vehicleModel, vehicleVersion } = request;

    const db_vehicleModel = await this.vehiclemodelrepository.findOne({
      where: {
        id: vehicleModel,
      },
    });
    if (!db_vehicleModel) {
      return Promise.reject(new Error('THIS VEHICLE MODEL WAS NOT FOUND'));
    }
    const db_vehicleVersion = await this.vehicleversionrepository.findOne({
      where: {
        id: vehicleVersion,
      },
    });

    if (!db_vehicleVersion) {
      return Promise.reject(new Error('THIS VEHICLE VERSION WAS NOT FOUND'));
    }
    const vehicleSubModelSaver: VehicleSubModel = {
      engine_capacity: engineCapacity,
      fuel_efficiency: fuelEfficiency,
      //   id: id,
      name: name,
      vehicle_model: db_vehicleModel,
      vehicle_version: db_vehicleVersion,
      //   vehicles,
    };

    const vehiclesubmodelsaver = Object.assign(new VehicleSubModel(), vehicleSubModelSaver);
    const savedVehicleSubmodel = await this.vehiclesubmodelrepository.save(vehiclesubmodelsaver);

    const resVehicle: ResVehicleSubmodel = {
      engineCapacity: savedVehicleSubmodel.engine_capacity,
      fuelEfficiency: savedVehicleSubmodel.fuel_efficiency,
      id: savedVehicleSubmodel.id,
      name: savedVehicleSubmodel.name,
      vehicleModel: {
        discontinuedYear: savedVehicleSubmodel.vehicle_model?.discontinued_year,
        id: savedVehicleSubmodel.vehicle_model?.id,
        launchYear: savedVehicleSubmodel.vehicle_model?.launch_year,
        name: savedVehicleSubmodel.vehicle_model?.name,
        //   oem: savedVehicleSubmodel.vehicle_model?.,
      },
      vehicleVersion: {
        features: savedVehicleSubmodel.vehicle_version?.features,
        id: savedVehicleSubmodel.vehicle_version?.id,
        name: savedVehicleSubmodel.vehicle_version?.name,
        price: savedVehicleSubmodel.vehicle_version?.price,
      },
    };

    return resVehicle;
  }

  @Get()
  public async getVehicleSubModel() {
    const vehiclesubmodels = await this.vehiclesubmodelrepository.find();

    if (!vehiclesubmodels) {
      return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE SUBMODELS'));
    }

    const vehiclesubmodelsArr: ResVehicleSubmodel[] = [];

    for (const vsm of vehiclesubmodels) {
      const db_vehiclemodel = await this.vehiclemodelrepository.findOne({
        where: {
          id: vsm.vehicle_model?.id,
        },
      });
      if (!db_vehiclemodel) {
        return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE VEHICLE MODEL'));
      }
      const db_vehicleversion = await this.vehicleversionrepository.findOne({
        where: {
          id: vsm.vehicle_version?.id,
        },
      });

      if (!db_vehicleversion) {
        return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE VEHICLE VERSION'));
      }
      vehiclesubmodelsArr.push({
        engineCapacity: vsm.engine_capacity,
        fuelEfficiency: vsm.fuel_efficiency,
        id: vsm.id,
        name: vsm.name,
        vehicleModel: db_vehiclemodel,
        vehicleVersion: db_vehicleversion,
      });
    }
    return vehiclesubmodelsArr;
  }
  @Get('/{vehicleSubModelId}')
  public async getOneVehicleSubModel(@Path() vehicleSubModelId: number) {
    const vehiclesubmodel = await this.vehiclesubmodelrepository
      .findOne({
        where: {
          id: vehicleSubModelId,
        },
        relations: {
          vehicle_model: true,
          vehicle_version: true,
        },
      })
      .then((vsm) => {
        if (!vsm) {
          return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE SUBMODELS'));
        }
        const vehiclemodel = vsm.vehicle_model;
        const vehicleversion = vsm.vehicle_version;

        const resVehicleSubModel: ResVehicleSubmodel = {
          engineCapacity: vsm.engine_capacity,
          fuelEfficiency: vsm.fuel_efficiency,
          id: vsm.id,
          name: vsm.name,
          vehicleModel: {
            discontinuedYear: vehiclemodel?.discontinued_year,
            id: vehiclemodel?.id,
            launchYear: vehiclemodel?.launch_year,
            name: vehiclemodel?.name,
            // oem: vehiclemodel?.,
            // vehicleSegment: vehiclemodel?.,
            // vehicleVersion: vehiclemodel?.v,
          },
          vehicleVersion: {
            features: vehicleversion?.features,
            id: vehicleversion?.id,
            name: vehicleversion?.name,
            price: vehicleversion?.price,
          },
        };

        return resVehicleSubModel;
      });
    return vehiclesubmodel;
  }

  @Delete('/{vehicleSubModelId}')
  public async deleteVehicleSubmodel(@Path() vehicleSubModelId: number) {
    const vsm_todelete = await this.vehiclesubmodelrepository.findOne({
      where: {
        id: vehicleSubModelId,
      },
    });

    if (!vsm_todelete) {
      return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE SUBMODEL'));
    }

    await this.vehiclesubmodelrepository.remove(vsm_todelete);
    return { result: 'THE VEHICLE SUBMODEL WAS DELETED' };
  }
}
