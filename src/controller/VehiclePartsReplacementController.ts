import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehiclePartsReplacement } from '../entity/VehiclePartsReplacement';
import { ResVehiclePartsReplacement } from '../models/res/ResVehiclePartsReplacement';
import { ReqVehiclePartsReplacement } from '../models/req/ReqVehiclePartsReplacement';
import { User } from '../entity/User';
import { Vehicle } from '../entity/Vehicle';
// import { VehicleVersion } from '../entity/VehicleVersion';

@Tags('Vehicle Part Repository')
@Route('/vehiclePartsRepository')
export class VehiclePartsReplacementController extends Controller {
  private veihclepartsrepplacementrep = AppDataSource.getRepository(VehiclePartsReplacement);
  private userrepository = AppDataSource.getRepository(User);
  private vehiclerep = AppDataSource.getRepository(Vehicle);
  @Post()
  public async saveVehiclePartsRep(@Body() req: ReqVehiclePartsReplacement): Promise<ResVehiclePartsReplacement> {
    const { cost, partName, partNumber, replacementDate, vehicle, warrantyExpiry, technician } = req;

    const vehicle_db = await this.vehiclerep.findOne({
      where: {
        id: vehicle,
      },
    });

    if (!vehicle_db) {
      return Promise.reject(new Error('THIS VEHICLE DB WAS NOT FOUND'));
    }

    const technician_db = await this.userrepository.findOne({
      where: {
        id: technician,
      },
    });

    if (!technician_db) {
      return Promise.reject(new Error('THIS TECHNICIAN DB WAS NOT FOUND'));
    }
    const vehiclepartstosave: VehiclePartsReplacement = {
      cost: cost,
      //   id,
      part_name: partName,
      part_number: partNumber,
      //   replaced_at,
      //   replaced_by: repl,
      replacement_date: replacementDate,
      vehicle: vehicle_db,
      technician: technician_db,
      warranty_expiry: warrantyExpiry,
    };

    const vehiclepartssaver = Object.assign(new VehiclePartsReplacement(), vehiclepartstosave);
    const savedVehicleParts = await this.veihclepartsrepplacementrep.save(vehiclepartssaver);

    const resVehicleParts: ResVehiclePartsReplacement = {
      cost: savedVehicleParts.cost,
      id: savedVehicleParts.id,
      partName: savedVehicleParts.part_name,
      partNumber: savedVehicleParts.part_number,
      replacedAt: savedVehicleParts.replaced_at,
      replacementDate: savedVehicleParts.replacement_date,
      technician: {
        address: savedVehicleParts.technician?.address,
        // device: savedVehicleParts.technician?.,
        email: savedVehicleParts.technician?.email,
        id: savedVehicleParts.technician?.id,
        // is_under: savedVehicleParts.technician?.,
        name: savedVehicleParts.technician?.name,
        password: savedVehicleParts.technician?.password,
        phone_number: savedVehicleParts.technician?.phone_number,
        // role: savedVehicleParts.technician?.,
        // service_ticket: savedVehicleParts.technician?.,
        status: savedVehicleParts.technician?.status,
      },
      vehicle: {
        color: savedVehicleParts.vehicle?.color,
        // ecus: savedVehicleParts.vehicle?.,
        engineNumber: savedVehicleParts.vehicle?.engine_number,
        id: savedVehicleParts.vehicle?.id,
        manufactureYear: savedVehicleParts.vehicle?.manufacture_year,
        mileage: savedVehicleParts.vehicle?.mileage,
        transmissionType: savedVehicleParts.vehicle?.transmission_type,
        // vehicleModel: savedVehicleParts.vehicle?.vehicle_model,
        vehicleNumber: savedVehicleParts.vehicle?.vehicle_number,
        // vehicleSegment: savedVehicleParts.vehicle?.vehicle_segment,
        // vehicleSubModel: savedVehicleParts.vehicle?.vehicle_sub_model,
        // vehicleVersion: savedVehicleParts.vehicle?.vehicle_version,
        vin: savedVehicleParts.vehicle?.vin,
      },
      warrantyExpiry: savedVehicleParts.warranty_expiry,
    };

    return resVehicleParts;
  }

  @Get('/{vehiclePartsId}')
  public async getOneVehiclePartsReplacement(@Path() vehiclePartsId: number): Promise<ResVehiclePartsReplacement> {
    const vpr = await this.veihclepartsrepplacementrep.findOne({
      where: {
        id: vehiclePartsId,
      },
      relations: {
        technician: true,
        vehicle: true,
      },
    });

    if (!vpr) {
      return Promise.reject(new Error('THIS VEHICLE PART WAS NOT FOUND'));
    }

    const vehicle_db = await this.vehiclerep.findOne({
      where: {
        id: vpr.vehicle?.id,
      },
    });

    if (!vehicle_db) {
      return Promise.reject(new Error('THIS VEHICLE DB WAS NOT FOUND'));
    }

    const technician_db = await this.userrepository.findOne({
      where: {
        id: vpr.technician?.id,
      },
    });

    if (!technician_db) {
      return Promise.reject(new Error('THIS TECHNICIAN DB WAS NOT FOUND'));
    }

    const resVehicleParts: ResVehiclePartsReplacement = {
      cost: vpr.cost,
      id: vpr.id,
      partName: vpr.part_name,
      partNumber: vpr.part_number,
      replacedAt: vpr.replaced_at,
      replacementDate: vpr.replacement_date,
      technician: {
        address: vpr.technician?.address,
        // device,
        email: vpr.technician?.email,
        id: vpr.technician?.id,
        // is_under,
        name: vpr.technician?.name,
        password: vpr.technician?.password,
        phone_number: vpr.technician?.phone_number,
        // role: vpr.technician?.,
        // service_ticket,
        status: vpr.technician?.status,
      },
      vehicle: {
        color: vpr.vehicle?.color,
        // ecus: vpr.vehicle?.,
        engineNumber: vpr.vehicle?.engine_number,
        id: vpr.vehicle?.id,
        manufactureYear: vpr.vehicle?.manufacture_year,
        mileage: vpr.vehicle?.mileage,
        transmissionType: vpr.vehicle?.transmission_type,
        // vehicleModel,
        vehicleNumber: vpr.vehicle?.vehicle_number,
        // vehicleSegment,

        // vehicleSubModel,
        // vehi?cleVersion,
        vin: vpr.vehicle?.vin,
      },
      warrantyExpiry: vpr.warranty_expiry,
    };
    return resVehicleParts;
  }

  @Get()
  public async getAllVehiclePartsReplacement(): Promise<ResVehiclePartsReplacement[]> {
    const vprs = await this.veihclepartsrepplacementrep.find({
      relations: {
        technician: true,
        vehicle: true,
      },
    });

    if (!vprs) {
      return Promise.reject(new Error('THESE VEHICLE PARTS WERE NOT FOUND'));
    }

    const vprArr: ResVehiclePartsReplacement[] = [];
    for (const vpr of vprs) {
      vprArr.push({
        cost: vpr.cost,
        id: vpr.id,
        partName: vpr.part_name,

        partNumber: vpr.part_number,
        replacedAt: vpr.replaced_at,

        replacementDate: vpr.replaced_at,
        technician: {
          address: vpr.technician?.address,
          //   device,
          email: vpr.technician?.email,
          id: vpr.technician?.id,
          //   is_under,
          name: vpr.technician?.name,
          password: vpr.technician?.password,
          phone_number: vpr.technician?.phone_number,
          //   role,
          //   service_ticket,
          status: vpr.technician?.status,
        },
        vehicle: {
          color: vpr.vehicle?.color,
          //   ecus: vpr.vehicle?.,

          engineNumber: vpr.vehicle?.engine_number,
          id: vpr.vehicle?.id,
          manufactureYear: vpr.vehicle?.manufacture_year,
          mileage: vpr.vehicle?.mileage,
          transmissionType: vpr.vehicle?.transmission_type,
          //   vehicleModel: vpr.vehicle?.,
          vehicleNumber: vpr.vehicle?.vehicle_number,
          //   vehicleSegment: vpr.vehicle?.,
          //   vehicleSubModel: vpr.vehicle?.,
          //   vehicleVersion: vpr.vehicle?.v,
          vin: vpr.vehicle?.vin,
        },
        warrantyExpiry: vpr.warranty_expiry,
      });
    }

    return vprArr;
  }

  @Delete('/{vprId}')
  public async deleteVehiclePartsReplacement(@Path() vprId: number) {
    const vprtodelete = await this.veihclepartsrepplacementrep.findOne({
      where: {
        id: vprId,
      },
    });

    if (!vprtodelete) {
      return Promise.reject(new Error('THESE VEHICLE PARTS WERE NOT FOUND'));
    }

    await this.veihclepartsrepplacementrep.remove(vprtodelete);
    return { result: 'THIS VEHICLE PARTS  HAS BEEN DELETED' };
  }
}
