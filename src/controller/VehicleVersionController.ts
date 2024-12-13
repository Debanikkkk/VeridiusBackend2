import { Body, Controller, Delete, Get, Path, Post } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehicleVersion } from '../entity/VehicleVersion';
import { ReqVehicleVersion } from '../models/req/ReqVehicleVersion';
import { ResVehicleVersion } from '../models/res/ResVehicleVersion';
import { ResSuccess } from '../models/res/Responses';

export class VehicleVersionController extends Controller {
  private vehicleversionrepository = AppDataSource.getRepository(VehicleVersion);

  @Post()
  public async saveVehicleVersion(@Body() request: ReqVehicleVersion): Promise<ResVehicleVersion> {
    const { features, name, price } = request;

    const saveVehicleVersion: VehicleVersion = {
      features,
      name,
      price,
    };

    const vehicleVersionSaver = Object.assign(new VehicleVersion(), saveVehicleVersion);
    const savedVehicleVersion = await this.vehicleversionrepository.save(vehicleVersionSaver);

    const resVehicleVersion: ResVehicleVersion = {
      features: savedVehicleVersion.features,
      id: savedVehicleVersion.id,
      name: savedVehicleVersion.name,
      price: savedVehicleVersion.price,
    };

    return resVehicleVersion;
  }

  @Delete('/{vehicleVersionId}')
  public async deleteVehicleVersion(@Path() vehicleVersionId: number): Promise<ResSuccess> {
    const vehicleVersionToDelete = await this.vehicleversionrepository.findOne({
      where: {
        id: vehicleVersionId,
      },
    });

    if (!vehicleVersionToDelete) {
      return Promise.reject(new Error('VEHICLE VERSION NOT FOUND'));
    }

    await this.vehicleversionrepository.remove(vehicleVersionToDelete);

    return { result: 'VEHICLE VERSION WAS DELETED SUCCESSFULLY' };
  }

  @Get()
  public async getAllVehicleVersion(): Promise<ResVehicleVersion[]> {
    const vehicleVersions = await this.vehicleversionrepository.find();

    if (!vehicleVersions) {
      return Promise.reject(new Error('THERE WAS A PROBLEM IN FETCHING THE VEHICLE VERSIONS'));
    }

    const vehicleVersionArr: ResVehicleVersion[] = [];

    for (const vv of vehicleVersions) {
      vehicleVersionArr.push({
        features: vv.features,
        id: vv.id,
        name: vv.name,
        price: vv.price,
      });
    }

    return vehicleVersionArr;
  }

  @Get('/{vehicleVersionId}')
  public async getOneVehicleVersion(@Path() vehicleVersionId: number) {
    const vehicleversion = await this.vehicleversionrepository
      .findOne({
        where: {
          id: vehicleVersionId,
        },
      })
      .then((vv) => {
        if (!vv) {
          return Promise.reject(new Error('THIS VEHICLE VERSION DOESNT EXIST'));
        }

        const resVehicleVersion: ResVehicleVersion = {
          features: vv.features,
          id: vv.id,
          name: vv.name,
          price: vv.price,
        };
        return resVehicleVersion;
      });
    return vehicleversion;
  }
}
