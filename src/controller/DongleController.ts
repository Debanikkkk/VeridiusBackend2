import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Device } from '../entity/Device';
import { User } from '../entity/User';
import { ReqDongle } from '../models/req/ReqDongle';
// import { Dongle } from '../entity/Dongle';
import { ResDongle } from '../models/res/ResDongle';
import { ResDevice } from '../models/res/ResDevice';
import { ResError, ResSuccess } from '../models/res/Responses';
import { DongleHistory } from '../entity/DongleHistory';
import { Dongle } from '../entity/Dongle';
@Tags('Dongle')
@Route('/dongle')
export class DongleController extends Controller {
  private donglerepository = AppDataSource.getRepository(Dongle);
  private devicerepository = AppDataSource.getRepository(Device);
  private userrepository = AppDataSource.getRepository(User);
  private donglehistoryrepository = AppDataSource.getRepository(DongleHistory);

  /**
   * save dongle
   * @summary save dongle
   */
  @Post()
  public async saveDongle(@Body() request: ReqDongle): Promise<ResDongle | ResError> {
    try {
      const { dongleSerialNumber, firmwareUpdatedAt, firmwareVersion, macAddress, manufactureDate, status } = request;
      const dongleToSave: Dongle = {
        dongle_serial_number: dongleSerialNumber,
        firmware_updated_at: firmwareUpdatedAt,
        firmware_version: firmwareVersion,
        mac_address: macAddress,
        manufacture_date: manufactureDate,
        status: status,
      };

      const dongleSaver = Object.assign(new Dongle(), dongleToSave);
      const savedDongle = await this.donglerepository.save(dongleSaver);

      const resDongle: ResDongle = {
        assignedDevice: {
          createdAt: savedDongle.assigned_device?.created_at,
          deviceName: savedDongle.assigned_device?.device_name,
          deviceType: savedDongle.assigned_device?.device_type,
          id: savedDongle.assigned_device?.id,
          osVersion: savedDongle.assigned_device?.os_version,
          registrationDate: savedDongle.assigned_device?.registration_date,
          serialNumber: savedDongle.assigned_device?.serial_number,
          status: savedDongle.assigned_device?.status,
        },
        createdAt: savedDongle.created_at,
        dongleSerialNumber: savedDongle.dongle_serial_number,
        firmwareUpdatedAt: savedDongle.firmware_updated_at,
        firmwareVersion: savedDongle.firmware_version,
        id: savedDongle.id,
        macAddress: savedDongle.mac_address,
        manufactureDate: savedDongle.manufacture_date,
        status: savedDongle.status,
        updatedAt: savedDongle.updated_at,
      };

      return resDongle;
    } catch (error) {
      console.log('there was an errror in saving the dongle', error);
      return { error: 'failed to save the dongle' };
    }
  }

  /**
   * get all dongle
   * @summary get all dongle
   */
  @Get()
  public async getAllDongle(): Promise<ResDongle[] | ResError> {
    try {
      const dongles = await this.donglerepository.find({
        // relations: {
        //   // device: true,
        // },
      });

      if (!dongles) {
        return Promise.reject(new Error('DONGLES WERE NOT FOUND'));
      }
      // const device=await this.devicerepository.findOne({
      //   where:{
      //     id: dongl
      //   }
      // })
      const dongleArr: ResDongle[] = [];

      for (const dongle of dongles) {
        const device = await this.devicerepository.findOne({
          where: {
            id: dongle.id,
          },
          // relations: {
          //   dongle: true,
          // },
        });
        const resDevice: ResDevice = {
          id: device?.id,
          createdAt: device?.created_at,
          deviceName: device?.device_name,
          deviceType: device?.device_type,
          osVersion: device?.os_version,
          registrationDate: device?.registration_date,
          serialNumber: device?.serial_number,
          status: device?.status,
          updatedAt: device?.updated_at,
          // user: device?.,
        };
        dongleArr.push({
          assignedDevice: resDevice,
          createdAt: dongle.created_at,
          dongleSerialNumber: dongle.dongle_serial_number,
          firmwareUpdatedAt: dongle.firmware_updated_at,
          firmwareVersion: dongle.firmware_version,
          id: dongle.id,
          macAddress: dongle.mac_address,
          manufactureDate: dongle.manufacture_date,
          status: dongle.status,
          updatedAt: dongle.updated_at,
        });
      }
      return dongleArr;
    } catch (error) {
      console.log('there was an errror in getting all the dongles', error);
      return { error: 'failed to getting the dongles' };
    }
  }

  /**
   * get one dongle
   * @summary get one dongle
   */
  @Get('/{dongleId}')
  public async getOneDongle(@Path() dongleId: number): Promise<ResDongle | ResError> {
    const dongle = await this.donglerepository
      .findOne({
        where: {
          id: dongleId,
        },
        relations: {
          assigned_device: true,
        },
      })
      .then(
        (dongle) => {
          if (!dongle) {
            return Promise.reject(new Error('DONGLE NOT FOUND'));
          }
          const device = dongle.assigned_device;
          console.log('this device is', Promise.resolve(device));

          if (!device) {
            return Promise.reject(new Error('THIS DEVICE WAS NOT FOUND FOR THE DONGLE'));
          }
          const resDongle: ResDongle = {
            assignedDevice: {
              id: device.id,
              // assignedTo: device.assigned_to,
              createdAt: device.created_at,
              deviceName: device.device_name,
              deviceType: device.device_type,
              // dongle: device.don,
              osVersion: device.os_version,
              registrationDate: device.registration_date,
              serialNumber: device.serial_number,
              status: device.status,
            },
            createdAt: dongle.created_at,
            dongleSerialNumber: dongle.dongle_serial_number,
            firmwareUpdatedAt: dongle.firmware_updated_at,
            firmwareVersion: dongle.firmware_version,
            id: dongle.id,
            macAddress: dongle.mac_address,
            manufactureDate: dongle.manufacture_date,
            status: dongle.status,
            updatedAt: dongle.updated_at,
          };

          return resDongle;
        },
        () => {
          return { error: 'there was a problem in retrieving the dongle details' };
        },
      );
    return dongle;
  }

  /**
   * delete dongle
   * @summary delete dongle
   */
  @Delete('/{dongleId}')
  public async deleteDongle(@Path() dongleId: number): Promise<ResSuccess | ResError> {
    try {
      const dongleToDelete = await this.donglerepository.findOne({
        where: {
          id: dongleId,
        },
      });

      if (dongleToDelete == null) {
        return Promise.reject(new Error('DONGLE IS NULL'));
      }
      await this.donglerepository.remove(dongleToDelete);
      return { result: 'DONGLE WAS DELETED SUCCESSFULLY' };
    } catch (error) {
      console.log('there was an errror in deleting the dongle', error);
      return { error: 'failed to delete the dongle' };
    }
  }
}
