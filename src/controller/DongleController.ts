import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Device } from '../entity/Device';
import { User } from '../entity/User';
import { ReqDongle } from '../models/req/ReqDongle';
import { Dongle } from '../entity/Dongle';
import { ResDongle } from '../models/res/ResDongle';
import { ResDevice } from '../models/res/ResDevice';
import { ResSuccess } from '../models/res/Responses';
import { DongleHistory } from '../entity/DongleHistory';
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
  public async saveDongle(@Body() request: ReqDongle) {
    const { name } = request;

    const dongleToSave: Dongle = {
      name: name,
    };

    const dongleSaver = Object.assign(new Dongle(), dongleToSave);
    const savedDongle = await this.donglerepository.save(dongleSaver);

    const resDongle: ResDongle = {
      id: savedDongle.id,
      name: savedDongle.name,
    };

    return resDongle;
  }

  /**
   * get all dongle
   * @summary get all dongle
   */
  @Get()
  public async getAllDongle(): Promise<ResDongle[]> {
    const dongles = await this.donglerepository.find({
      relations: {
        device: true,
      },
    });

    if (!dongles) {
      return Promise.reject(new Error('DONGLES WERE NOT FOUND'));
    }

    const dongleArr: ResDongle[] = [];

    for (const dongle of dongles) {
      const device = await this.devicerepository.findOne({
        where: {
          id: dongle.id,
        },
        relations: {
          dongle: true,
        },
      });
      const resDevice: ResDevice = {
        // dongle: device?.dongle!,
        id: device?.id,
        mac_address: device?.mac_address,
        name: device?.name,
        // user: device?.,
      };
      dongleArr.push({
        id: dongle.id,
        name: dongle.name,
        device: resDevice,
      });
    }
    return dongleArr;
  }
  /**
   * delete dongle
   * @summary delete dongle
   */
  @Delete('/{dongleId}')
  public async deleteDongle(@Path() dongleId: number): Promise<ResSuccess> {
    const dongleToDelete = await this.donglerepository.findOne({
      where: {
        id: dongleId,
      },
    });

    const device = await this.devicerepository.findOne({
      where: {
        id: dongleId,
      },
    });

    const user = await this.userrepository.findOne({
      where: {
        id: device?.id,
      },
    });

    const dongleHistory: DongleHistory = {
      device_id: device?.id,
      dongle_id: dongleToDelete?.id,
      name: dongleToDelete?.name,
      user_id: user?.id,
    };

    const saveDongleHistory = await this.donglehistoryrepository.save(dongleHistory);
    console.log(saveDongleHistory);
    if (dongleToDelete == null) {
      return Promise.reject(new Error('DONGLE IS NULL'));
    }
    await this.donglerepository.remove(dongleToDelete);
    return { result: 'DONGLE WAS DELETED SUCCESSFULLY' };
  }
}
