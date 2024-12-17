import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehicleSegment } from '../entity/VehicleSegment';
import { ReqVehicleSegment } from '../models/req/ReqVehicleSegment';
import { ResVehicleSegment } from '../models/res/ResVehicleSegemnt';
import { ResSuccess } from '../models/res/Responses';
@Tags('Vehicle Segment')
@Route('/vehicleSegment')
export class VehicleSegmentController extends Controller {
  private vehiclesegmentrepository = AppDataSource.getRepository(VehicleSegment);

  @Post()
  public async saveVehicleSegment(@Body() request: ReqVehicleSegment): Promise<ResVehicleSegment> {
    const { description, name } = request;
    const vehicleSegmentSave: ResVehicleSegment = {
      description,
      name,
    };

    const vehicleSegmentSaver = Object.assign(new VehicleSegment(), vehicleSegmentSave);
    const savedVehicleSegment = await this.vehiclesegmentrepository.save(vehicleSegmentSaver);

    const resVehicleSegment: ResVehicleSegment = {
      description: savedVehicleSegment.description,
      id: savedVehicleSegment.id,
      name: savedVehicleSegment.name,
    };

    return resVehicleSegment;
  }

  @Get()
  public async getAllVehicleSegment(): Promise<ResVehicleSegment[]> {
    const vehicleSegments = await this.vehiclesegmentrepository.find();

    if (!vehicleSegments) {
      return Promise.reject(new Error('THERE WAS AN AERROR IN FETCHING THE VEHICLE SEGMENTS'));
    }

    const vehicleSegemntArr: ResVehicleSegment[] = [];
    for (const vs of vehicleSegments) {
      vehicleSegemntArr.push({
        description: vs.description,
        id: vs.id,
        name: vs.name,
      });
    }

    return vehicleSegemntArr;
  }

  @Get('/{vehicleSegmentId}')
  public async getOneVehicleSegment(@Path() vehicleSegmentId: number): Promise<ResVehicleSegment> {
    const vehicleSegment = await this.vehiclesegmentrepository
      .findOne({
        where: {
          id: vehicleSegmentId,
        },
      })
      .then((vs) => {
        if (!vs) {
          return Promise.reject(new Error('THERE WAS AN AERROR IN FETCHING THE VEHICLE SEGMENT'));
        }

        const resVehicleSegment: ResVehicleSegment = {
          description: vs.description,
          id: vs.id,
          name: vs.name,
        };
        return resVehicleSegment;
      });
    return vehicleSegment;
  }

  @Delete('/{vehicleSegmentId}')
  public async deleteVehicleSegment(@Path() vehicleSegmentId: number): Promise<ResSuccess> {
    const vehicleSegment = await this.vehiclesegmentrepository.findOne({
      where: {
        id: vehicleSegmentId,
      },
    });

    if (!vehicleSegment) {
      return Promise.reject(new Error('THERE WAS AN AERROR IN FETCHING THE VEHICLE SEGMENT'));
    }

    await this.vehiclesegmentrepository.remove(vehicleSegment);
    return { result: 'VEHICLE SEGMENT DELETED SUCCESFULLY ' };
  }
}
