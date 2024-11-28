import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';

import { Device } from '../entity/Device';
import { AppDataSource } from '../data-source';
import { Dongle } from '../entity/Dongle';
import { ReqDongleAllot } from '../models/req/ReqDongleAllot';
import { ReqDevice } from '../models/req/ReqDevice';
import { ResDevice } from '../models/res/ResDevice';
import { ResError, ResSuccess } from '../models/res/Responses';
import { DeviceHistory } from '../entity/DeviceHistory';
import { User } from '../entity/User';

// interface GeolocationUpdate {
//     deviceId: number;
//     latitude: number;
//     longitude: number;
// }
@Route('/device')
@Tags('Device')
export class DeviceController extends Controller {
  private devicerepository = AppDataSource.getRepository(Device);
  private donglerepository = AppDataSource.getRepository(Dongle);
  private devicehistoryrepository = AppDataSource.getRepository(DeviceHistory);
  private userrepository = AppDataSource.getRepository(User);
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
        },
      });

      if (!devices) {
        return Promise.reject(new Error('DEVICES WERE NOT FOUND'));
      }

      const resDevice: ResDevice[] = [];
      for (const device of devices) {
        const dongle = await device.dongle;
        // if(!dongle){
        //     return Promise.reject(new Error('THIS DONGLE WAS NOT FOUND'))
        // }
        resDevice.push({
          dongle: {
            id: dongle?.id,
            name: dongle?.name,
          },
          id: device.id,
          mac_address: device.mac_address,
          name: device.name,
          // user: device.user
        });
      }
      return resDevice;
    } catch (error) {
      console.log('there was an errror in getting all the devices', error);
      return { error: 'failed to get all the devices' };
    }
  }
  // @Put('/update')
  // public async updateGeolocation(@Body() body: GeolocationUpdate): Promise<void> {
  //     const deviceRepository = getRepository(Device);
  //     const point = `POINT(${body.longitude} ${body.latitude})`;

  //     await deviceRepository
  //         .createQueryBuilder()
  //         .update(Device)
  //         .set({ location: () => `ST_SetSRID(ST_MakePoint(${body.longitude}, ${body.latitude}), 4326)` })
  //         .where('id = :deviceId', { deviceId: body.deviceId })
  //         .execute();
  // }
  /**
   * SAVES DEVICE
   * @summary SAVES A DEVICE
   */
  @Post()
  public async saveDevice(@Body() request: ReqDevice): Promise<ResDevice | ResError> {
    try {
      const { mac_address, name, imei } = request;

      const deviceToSave: Device = {
        mac_address: mac_address,
        name: name,
        imei: imei,
      };

      const deviceSaver = Object.assign(new Device(), deviceToSave);
      const savedDevice = await this.devicerepository.save(deviceSaver);

      const resDevice: ResDevice = {
        dongle: {
          id: (await savedDevice.dongle)?.id,
          name: (await savedDevice.dongle)?.name,
        },
        id: savedDevice.id,
        mac_address: savedDevice.mac_address,
        name: savedDevice.name,
        imei: savedDevice.imei,
        user: {
          // address: (await savedDevice.user)?.address,
          // email: (await savedDevice.user)?.email,
          // id: (await savedDevice.user)?.id,
          // name: (await savedDevice.user)?.name,
          // password: (await savedDevice.user)?.password,
          // phone_number: (await savedDevice.user)?.phone_number
        },
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
    try {
      const devicetodelete = await this.devicerepository.findOne({
        where: {
          id: deviceId,
        },
        relations: {
          dongle: true,
        },
      });
      const user = await this.userrepository.findOne({
        where: {
          device: {
            id: deviceId,
          },
        },
      });
      if (!devicetodelete) {
        return Promise.reject(new Error('DEVICE NOT FOUND'));
      }

      const device: DeviceHistory = {
        device_id: devicetodelete.id,
        dongle_id: devicetodelete.dongle?.id,
        id: devicetodelete.id,
        mac_address: devicetodelete.mac_address,
        name: devicetodelete.name,
        user_id: user?.id,
      };

      await this.devicehistoryrepository.save(device);
      await this.devicerepository.remove(devicetodelete);

      return { result: 'DEVICE WAS DELETED SUCCESSFULLY' };
    } catch (error) {
      console.log('there was an errror in deleting the device', error);
      return { error: 'failed to delete the device' };
    }
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
}
