import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ECU } from '../entity/ECU';
import { Device } from '../entity/Device';
import { ResDevice } from '../models/res/ResDevice';
@Route('/ecu')
@Tags('ECU')
export class EcuController extends Controller {
  private ecurepository = AppDataSource.getRepository(ECU);
  private devicerepositroy = AppDataSource.getRepository(Device);
  // private repoi

  /**
   * get device imei using ecu
   * @summary  get device imei using ecu
   */
  @Get('macaddressFromIMEI/{macAdd}')
  public async getDeviceIMEIusingECU(@Path() macAdd: string): Promise<ResDevice> {
    const device = await this.devicerepositroy.findOne({
      where: {
        user: {
          service_ticket: {
            vehicle: {
              ecu: {
                mac_address: macAdd,
              },
            },
          },
        },
      },
    });

    if (!device) {
      return Promise.reject(new Error('THE DEVICE WASN NOT FOUND'));
    }

    const resDevice: ResDevice = {
      //   dongle: device.dongle,
      id: device.id,
      imei: device.imei,
      mac_address: device.mac_address,
      name: device.name,
      // user: device.
    };

    return resDevice;
  }
}
