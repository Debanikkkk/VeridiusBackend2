import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';

import { Device } from '../entity/Device';
import { AppDataSource } from '../data-source';
import { Dongle } from '../entity/Dongle';

import { ResDevice } from '../models/res/ResDevice';

import { DeviceHistory } from '../entity/DeviceHistory';
import { User } from '../entity/User';
import { ReqDevice } from '../models/req/ReqDevice';
import { ResError, ResSuccess } from '../models/res/Responses';
import { ReqDongleAllot } from '../models/req/ReqDongleAllot';
import { ReqDevConStatus } from '../models/req/ReqDevConStatus';

@Route('/device')
@Tags('Device')
export class DeviceController extends Controller {
  private devicerepository = AppDataSource.getRepository(Device);
  private donglerepository = AppDataSource.getRepository(Dongle);
  private devicehistoryrepository = AppDataSource.getRepository(DeviceHistory);
  private userrepository = AppDataSource.getRepository(User);

  @Get('/{deviceId}')
  public async getOneDevice(@Path() deviceId: number) {
    const device = await this.devicerepository
      .findOne({
        where: {
          id: deviceId,
        },
        relations: {
          assigned_to: true,
        },
      })
      .then((dv) => {
        if (!dv) {
          return Promise.reject(new Error('THIS DEVICE WAS NOT FOUND '));
        }

        const assignedTo = dv.assigned_to;
        const resDevice: ResDevice = {
          assignedTo: {
            id: assignedTo?.id,
            name: assignedTo?.name,
          },
          createdAt: dv.created_at,
          deviceName: dv.device_name,
          deviceType: dv.device_type,
          // dongle: dv.,
          id: dv.id,
          osVersion: dv.os_version,
          registrationDate: dv.registration_date,
          serialNumber: dv.serial_number,
          status: dv.status,
          updatedAt: dv.updated_at,
        };
        return resDevice;
      });
    return device;
  }
  /**
   *  get all device (history enabled)
   * @summary get all device (history enabled)
   */
  @Get()
  public async getAllDevice() {
    try {
      const devices = await this.devicerepository.find({
        relations: {
          dongle: true,
          assigned_to: true,
        },
      });

      if (!devices) {
        return Promise.reject(new Error('DEVICES WERE NOT FOUND'));
      }

      const resDevice: ResDevice[] = [];
      for (const device of devices) {
        const assigned_to = await device.assigned_to;
        console.log('the assigned to is', assigned_to);
        const dongle = await device.dongle;
        // if(!dongle){
        //     return Promise.reject(new Error('THIS DONGLE WAS NOT FOUND'))
        // }
        resDevice.push({
          dongle: {
            id: dongle?.id,
          },
          assignedTo: {
            address: assigned_to?.address,
            email: assigned_to?.email,
            id: assigned_to?.id,
            name: assigned_to?.name,
            password: assigned_to?.password,
            phone_number: assigned_to?.phone_number,
          },
          createdAt: device?.created_at,
          deviceName: device?.device_name,
          deviceType: device?.device_type,
          id: device?.id,
          osVersion: device?.os_version,
          registrationDate: device?.registration_date,
          serialNumber: device?.serial_number,
          status: device?.status,
          updatedAt: device?.updated_at,
        });
      }
      return resDevice;
    } catch (error) {
      console.log('there was an errror in getting all the devices', error);
      return { error: 'failed to get all the devices' };
    }
  }

  /**
   * SAVES DEVICE
   * @summary SAVES A DEVICE
   */
  @Post()
  public async saveDevice(@Body() request: ReqDevice): Promise<ResDevice | ResError> {
    try {
      const { assignedTo, deviceName, deviceType, dongle, imei, osVersion, registrationDate, serialNumber, status } = request;

      console.log('ignore logs', dongle);
      // console.log('ignore logs', id);
      const user_assign = await this.userrepository.findOne({
        where: {
          id: assignedTo,
        },
      });
      const deviceToSave: Device = {
        assigned_to: user_assign,
        // created_at: createdAt,
        device_name: deviceName,
        device_type: deviceType,
        // dongle: ,
        // id: ,
        imei: imei,
        os_version: osVersion,
        registration_date: registrationDate,
        serial_number: serialNumber,
        status: status,
        // updated_at: updatedAt,
      };

      const deviceSaver = Object.assign(new Device(), deviceToSave);
      const savedDevice = await this.devicerepository.save(deviceSaver);

      const resDevice: ResDevice = {
        assignedTo: {
          address: savedDevice.assigned_to?.address,
          // device,
          email: savedDevice.assigned_to?.email,
          id: savedDevice.assigned_to?.id,
          // is_under,
          name: savedDevice.assigned_to?.name,
          password: savedDevice.assigned_to?.password,
          phone_number: savedDevice.assigned_to?.phone_number,
        },
        createdAt: savedDevice.created_at,
        deviceName: savedDevice.device_name,
        deviceType: savedDevice.device_name,
        // dongle: savedDevice.dongle,
        id: savedDevice.id,
        osVersion: savedDevice.os_version,
        registrationDate: savedDevice.registration_date,
        serialNumber: savedDevice.serial_number,
        status: savedDevice.status,
        updatedAt: savedDevice.updated_at,
      };
      return resDevice;
    } catch (error) {
      console.log('there was an errror in saving the device', error);
      return { error: 'failed to save the device' };
    }
  }
  /**
   * delete device
   * @summary delete device
   */
  @Delete('/{deviceId}')
  public async deleteDevice(@Path() deviceId: number): Promise<ResSuccess | ResError> {
    const devicetodelete = await this.devicerepository.findOne({
      where: {
        id: deviceId,
      },
      relations: {
        dongle: true,
      },
    });

    if (!devicetodelete) {
      return Promise.reject(new Error('DEVICE NOT FOUND'));
    }

    // await this.devicehistoryrepository.save(device);
    await this.devicerepository.remove(devicetodelete);

    return { result: 'DEVICE WAS DELETED SUCCESSFULLY' };
  }

  /**
   * allot dongle to a device
   * @summary allot dongle to a device
   */
  @Put('allotDongle/{deviceId}')
  public async allotDongleToDevice(@Path() deviceId: number, @Body() request: ReqDongleAllot) {
    try {
      const { id } = request;
      const device = await this.devicerepository.findOne({
        where: {
          id: deviceId,
        },
      });
      if (!device) {
        return Promise.reject(new Error('DEVICE NOT FOUND'));
      }

      const dongle = await this.donglerepository.findOne({
        where: {
          id: id,
        },
      });

      if (!dongle) {
        return Promise.reject(new Error('DONGLE NOT FOUND'));
      }
      console.log('IT REACHED HERE');
      device.dongle = dongle;
      console.log('IT REACHED HERE');

      const newDevice = await this.devicerepository.save(device);
      console.log('this is the newdevice', newDevice);
      return newDevice;
    } catch (error) {
      console.log('there was an errror in alloting the dongle to the device', error);
      return { error: 'failed to allot the donlge to the device' };
    }
  }

  /**
   * updates device to dongle connection status
   * @summary  updates device to dongle connection status
   */
  @Put('/{deviceId}')
  public async updateDeviceConnStatus(@Path() deviceId: number, @Body() req: ReqDevConStatus) {
    const device = await this.devicerepository.findOne({
      where: {
        id: deviceId,
      },
      relations: {
        dongle: true,
      },
    });
    if (!device) {
      return Promise.reject(new Error('THIS DEVICE WAS NOT FOUND'));
    }

    const { devConnStatus } = req;

    device.dongle_conn_status = devConnStatus;

    const newDevice = await this.devicerepository.save(device);
    const resDevice: ResDevice = {
      assignedTo: {
        address: newDevice.assigned_to?.address,
        // device: newDevice.assigned_to?.,
        email: newDevice.assigned_to?.email,
        id: newDevice.assigned_to?.id,
        // is_under: newDevice.assigned_to?.,
        name: newDevice.assigned_to?.name,
        password: newDevice.assigned_to?.password,
        phone_number: newDevice.assigned_to?.phone_number,
        // role: newDevice.assigned_to?.,
        // service_ticket: newDevice.assigned_to?.
      },
      createdAt: newDevice.created_at,
      deviceName: newDevice.device_name,
      deviceType: newDevice.device_type,
      dongle: {
        // assignedDevice: newDevice.dongle?.assigned_device,
        createdAt: newDevice.dongle?.created_at,
        dongleSerialNumber: newDevice.dongle?.dongle_serial_number,
        firmwareUpdatedAt: newDevice.dongle?.firmware_updated_at,
        firmwareVersion: newDevice.dongle?.firmware_version,
        id: newDevice.dongle?.id,
        macAddress: newDevice.dongle?.mac_address,
        manufactureDate: newDevice.dongle?.manufacture_date,
        status: newDevice.dongle?.status,
      },
      id: newDevice.id,
      osVersion: newDevice.os_version,
      registrationDate: newDevice.registration_date,
      serialNumber: newDevice.serial_number,
      status: newDevice.status,
      updatedAt: newDevice.updated_at,
    };
    return resDevice;
  }
}
