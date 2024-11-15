import { Controller, Path, Put, Request, Route, Security, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Dongle } from '../entity/Dongle';
import { Device } from '../entity/Device';
import { User } from '../entity/User';
import { DeviceHistory } from '../entity/DeviceHistory';
// import { object } from "joi";
import { JWTRequest } from '../models/req/JWTRequest';
@Tags('FREE DONGLE')
@Route('/user')
export class FreeDongleUserDeviceController extends Controller {
  private donglerepository = AppDataSource.getRepository(Dongle);
  private devicerepository = AppDataSource.getRepository(Device);
  private userrepository = AppDataSource.getRepository(User);
  private devicehistoryrepository = AppDataSource.getRepository(DeviceHistory);

  /**
   * FREE THE DONGLE-DEVICE-USER CONNECTION
   *  @summary FREE THE DONGLE-DEVICE-USER CONNECTION
   */
  @Put('freeDongle/{userId}')
  @Security('Api-Token', [])
  public async freeTheDongle(@Request() req: JWTRequest, @Path() userId: number) {
    // const {}=req
    try {
      const user = await this.userrepository.findOne({
        where: {
          id: userId,
        },
        // relations:{
        //     // dongle: true,
        //     user: true
        // }
      });
      if (!user) {
        return Promise.reject(new Error('USER NOT FOUND'));
      }
      // console.log("the user foudn linked to the device", device?.user)
      // console.log("the dongle foudn linked to the user", device?.dongle)
      const device = await this.devicerepository.findOne({
        where: {
          id: user.device?.id,
        },
        relations: {
          dongle: true,
        },
      });

      if (!user) {
        return Promise.resolve('USER NOT FOUND');
      }

      console.log('this is the device from the db from user relation', device);
      if (!device) {
        return Promise.reject(new Error('DONGLE NOT FOUND'));
      }

      const deviceHistory: DeviceHistory = {
        device_id: device.id,
        dongle_id: device.dongle?.id,
        mac_address: device.mac_address,
        name: device.name,
        user_id: req.user.id,
      };

      const devicehistorySaver = Object.assign(new DeviceHistory(), deviceHistory);

      const savedDeviceHistory = await this.devicehistoryrepository.save(devicehistorySaver);
      console.log(savedDeviceHistory);
      console.log('this is the user found in the device', device.user);
      device.dongle = null;
      await this.devicerepository.save(device);
      user.device = null;
      await this.userrepository.save(user);

      return 'success';
    } catch (error) {
      console.log('there was an errror in freeing the user-device-dongle', error);
      return { error: 'failed to free the user-device-dongle ' };
    }
  }
}
