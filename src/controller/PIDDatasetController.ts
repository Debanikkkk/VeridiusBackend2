import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { PIDDataset } from '../entity/PIDDataset';
import { ReqPIDDataset } from '../models/req/ReqPIDDataset';
import { ResPIDDataset } from '../models/res/ResPIDDataset';
import { ResECU } from '../models/res/ResECU';
@Route('/pidDataset')
@Tags('PID Dataset')
export class PIDDatasetController extends Controller {
  private piddatasetrepository = AppDataSource.getRepository(PIDDataset);

  @Post()
  public async savePID(@Body() request: ReqPIDDataset): Promise<ResPIDDataset> {
    const { active, description, name } = request;

    const piddatasettosave: PIDDataset = {
      active: active,
      // created_at: ,
      description: description,
      // ecus,
      // id: ,
      // message_types,
      name: name,
      // pids,
      // updated_at,
    };

    const savePidDataset = Object.assign(new PIDDataset(), piddatasettosave);
    const savedPidDataset = await this.piddatasetrepository.save(savePidDataset);

    const resPidDataset: ResPIDDataset = {
      active: savedPidDataset.active,
      createdAt: savedPidDataset.created_at,
      description: savedPidDataset.description,
      // ecus: savePidDataset.,
      id: savedPidDataset.id,
      // messageTypes: savePidDataset.,
      name: savedPidDataset.name,
      updatedAt: savedPidDataset.updated_at,
    };

    const resECUArr: ResECU[] = [];
    savePidDataset.ecus?.map((ecu) => {
      const resPidDataset: ResECU = {
        createdAt: ecu.created_at,
        // dtcDataset: ecu.,
        ecuName: ecu.ecu_name,
        // firmwares: ecu.firmware,
        id: ecu.id,
        isActive: ecu.is_active,
        macId: ecu.mac_id,
        // negativeResponses: ecu.,
        // pidDataset: ecu.,
        protocol: ecu.protocol,
        rxHeader: ecu.rx_header,
        txHeader: ecu.tx_header,
        updatedAt: ecu.updated_at,
        // vehicles: ecu.
      };
      resECUArr.push(resPidDataset);
    });

    savePidDataset.ecus = resECUArr;
    return resPidDataset;
  }

  @Get()
  public async getAllPIDdataset() {
    const piddatasets = await this.piddatasetrepository.find({
      relations: {
        ecus: true,
      },
    });

    const piddatasetArr: ResPIDDataset[] = [];

    for (const piddataset of piddatasets) {
      const resECUArr: ResECU[] = [];
      piddataset.ecus?.map((ecu) => {
        const resPidDataset: ResECU = {
          createdAt: ecu.created_at,
          // dtcDataset: ecu.,
          ecuName: ecu.ecu_name,
          // firmwares: ecu.firmware,
          id: ecu.id,
          isActive: ecu.is_active,
          macId: ecu.mac_id,
          // negativeResponses: ecu.,
          // pidDataset: ecu.,
          protocol: ecu.protocol,
          rxHeader: ecu.rx_header,
          txHeader: ecu.tx_header,
          updatedAt: ecu.updated_at,
          // vehicles: ecu.
        };
        resECUArr.push(resPidDataset);
      });

      piddatasetArr.push({
        active: piddataset.active,
        createdAt: piddataset.created_at,
        description: piddataset.description,
        ecus: resECUArr,
        id: piddataset.id,
        name: piddataset.name,
        updatedAt: piddataset.updated_at,
      });
    }

    return piddatasetArr;
  }

  @Get('/{piddatasetId}')
  public async getOnePIDDataset(@Path() piddatasetId: number) {
    const piddataset = await this.piddatasetrepository.findOne({
      where: {
        id: piddatasetId,
      },
    });
    if (!piddataset) {
      return Promise.reject(new Error('THIS PID DATASET WAS NOT FOUND'));
    }

    const resPidDataset: ResPIDDataset = {
      active: piddataset.active,
      createdAt: piddataset.created_at,
      description: piddataset.description,
      // ecus: {},
      id: piddataset.id,
      name: piddataset.name,
      updatedAt: piddataset.updated_at,
    };

    const resECUArr: ResECU[] = [];
    piddataset.ecus?.map((ecu) => {
      const resPidDataset: ResECU = {
        createdAt: ecu.created_at,
        // dtcDataset: ecu.,
        ecuName: ecu.ecu_name,
        // firmwares: ecu.firmware,
        id: ecu.id,
        isActive: ecu.is_active,
        macId: ecu.mac_id,
        // negativeResponses: ecu.,
        // pidDataset: ecu.,
        protocol: ecu.protocol,
        rxHeader: ecu.rx_header,
        txHeader: ecu.tx_header,
        updatedAt: ecu.updated_at,
        // vehicles: ecu.
      };
      resECUArr.push(resPidDataset);
    });
    resPidDataset.ecus = resECUArr;

    return resPidDataset;
  }

  @Delete('/{pidDatasetId}')
  public async deletePIDDataset(@Path() pidDatasetId: number) {
    const piddataset = await this.piddatasetrepository.findOne({
      where: {
        id: pidDatasetId,
      },
    });
    if (!piddataset) {
      return Promise.reject(new Error('THIS PID DATASET WAS NOT FOUND'));
    }

    await this.piddatasetrepository.remove(piddataset);
    return { result: 'THIS PID WAS DELETED SUCCESSFULLY' };
  }
}
