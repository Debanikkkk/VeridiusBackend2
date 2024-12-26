import { Body, Controller, Get, Path, Post } from 'tsoa';
import { AppDataSource } from '../data-source';
import { VehicleInsurance } from '../entity/VehicleInsurance';
import { ReqVehicleInsurance } from '../models/req/ReqVehicleInsurance';
import { ResVehicleInsurance } from '../models/res/ResVehicleInsurance';
import { Vehicle } from '../entity/Vehicle';

export class VehicleInsuranceController extends Controller {
  private vehicleinsuranccerepository = AppDataSource.getRepository(VehicleInsurance);
  private vehiclerepository = AppDataSource.getRepository(Vehicle);

  @Post()
  public async saveVehicleInsurance(@Body() req: ReqVehicleInsurance): Promise<ResVehicleInsurance> {
    const { coverageDetails, endDate, policyNumber, providerName, startDate, vehicle } = req;

    const db_vehicle = await this.vehiclerepository.findOne({
      where: {
        id: vehicle,
      },
    });
    if (!db_vehicle) {
      return Promise.reject(new Error('THIS VEHICLE WAS NOT FOUND'));
    }
    const vehicleInsuranceSaver: VehicleInsurance = {
      coverage_details: coverageDetails,
      end_date: endDate,
      //   id,
      policy_number: policyNumber,
      provider_name: providerName,
      start_date: startDate,
      vehicle: db_vehicle,
    };

    const saveVI = Object.assign(new VehicleInsurance(), vehicleInsuranceSaver);
    const savedVI = await this.vehicleinsuranccerepository.save(saveVI);

    const resVI: ResVehicleInsurance = {
      coverageDetails: savedVI.coverage_details,
      endDate: savedVI.end_date,
      id: savedVI.id,
      policyNumber: savedVI.policy_number,
      providerName: savedVI.provider_name,
      startDate: savedVI.start_date,
      vehicle: {
        color: savedVI.vehicle?.color,
        // ecus: savedVI.vehicle?.,
        engineNumber: savedVI.vehicle?.engine_number,
        id: savedVI.vehicle?.id,
        manufactureYear: savedVI.vehicle?.manufacture_year,
        mileage: savedVI.vehicle?.mileage,
        transmissionType: savedVI.vehicle?.transmission_type,
        // vehicleModel: savedVI.vehicle?.,
        vehicleNumber: savedVI.vehicle?.vehicle_number,
        // vehicleSegment: savedVI.vehicle?.,
        // vehicleSubModel: savedVI.vehicle?.ve,
        vehicleVersion: savedVI.vehicle?.vehicle_version,
        vin: savedVI.vehicle?.vin,
      },
    };

    return resVI;
  }

  @Get()
  public async getAllVehicleInsurances(): Promise<ResVehicleInsurance[]> {
    const vehicleinsurances = await this.vehicleinsuranccerepository.find({
      relations: {
        vehicle: true,
      },
    });

    if (!vehicleinsurances) {
      return Promise.reject(new Error('THESE VEHICLE INSURANCES WERE NOT FOUND'));
    }

    const resVehicleInsurancesArr: ResVehicleInsurance[] = [];

    for (const vi of vehicleinsurances) {
      const vehicle = await this.vehiclerepository.findOne({
        where: {
          id: vi.vehicle?.id,
        },
      });
      resVehicleInsurancesArr.push({
        coverageDetails: vi.coverage_details,
        endDate: vi.end_date,
        id: vi.id,
        policyNumber: vi.policy_number,
        providerName: vi.provider_name,
        startDate: vi.start_date,
        vehicle: {
          color: vehicle?.color,
          //   ecus: vehicle?.,
          engineNumber: vehicle?.engine_number,
          id: vehicle?.id,
          manufactureYear: vehicle?.manufacture_year,
          mileage: vehicle?.mileage,
          transmissionType: vehicle?.transmission_type,
          //   vehicleModel: vehicle?.,
          vehicleNumber: vehicle?.vehicle_number,
          //   vehicleSegment: vehicle?.,
          //   vehicleSubModel: vehicle?.vhi,
          //   vehicleVersion: vehicle?.vehicle_version,
          vin: vehicle?.vin,
        },
      });
    }
    return resVehicleInsurancesArr;
  }

  @Get('/{vehicleInsuranceId}')
  public async getOneVehicleInsurance(@Path() vehicleInsuranceId: number): Promise<ResVehicleInsurance> {
    const vehicleInsurance = await this.vehicleinsuranccerepository.findOne({
      where: {
        id: vehicleInsuranceId,
      },
      relations: {
        vehicle: true,
      },
    });

    if (!vehicleInsurance) {
      return Promise.reject(new Error('THis VEHICLE INSURANCE WAS NOT FOUND'));
    }

    const resVehicleInsurance: ResVehicleInsurance = {
      coverageDetails: vehicleInsurance.coverage_details,
      endDate: vehicleInsurance.end_date,
      id: vehicleInsurance.id,
      policyNumber: vehicleInsurance.policy_number,
      providerName: vehicleInsurance.provider_name,
      startDate: vehicleInsurance.start_date,
      vehicle: {
        color: vehicleInsurance.vehicle?.color,
        engineNumber: vehicleInsurance.vehicle?.engine_number,
        id: vehicleInsurance.vehicle?.id,
        manufactureYear: vehicleInsurance.vehicle?.manufacture_year,
        mileage: vehicleInsurance.vehicle?.mileage,
        // service_ticket,
        transmissionType: vehicleInsurance.vehicle?.transmission_type,
        // vehicle_insurances: vehicleInsurance.vehicle?.vehicle_insurances,
        // vehicle_model,
        vehicleNumber: vehicleInsurance.vehicle?.vehicle_number,
        vin: vehicleInsurance.vehicle?.vin,
      },
    };
    return resVehicleInsurance;
  }
}
