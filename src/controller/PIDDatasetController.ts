import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { PIDDataset } from '../entity/PIDDataset';
import { ReqPIDDataset } from '../models/req/ReqPIDDataset';
import { ResPIDDataset } from '../models/res/ResPIDDataset';
import { ResECU } from '../models/res/ResECU';
import { ECU } from '../entity/ECU';
import { PID } from '../entity/PID';
import { In } from 'typeorm';
import { ResPID } from '../models/res/ResPID';
@Route('/pidDataset')
@Tags('PID Dataset')
export class PIDDatasetController extends Controller {
  private piddatasetrepository = AppDataSource.getRepository(PIDDataset);
  private ecudataset = AppDataSource.getRepository(ECU);
  private pidrepository = AppDataSource.getRepository(PID);

  @Post()
  public async savePID(@Body() request: ReqPIDDataset): Promise<ResPIDDataset> {
    const { active, description, name, ecus, pids } = request;

    const resEcuArr: ECU[] = [];
    if (ecus) {
      const ecu_db = await this.ecudataset.find({
        where: {
          id: In(ecus),
        },
      });

      if (!ecu_db) {
        return Promise.reject(new Error('THIS ECUS IS NOT FOUND'));
      }

      resEcuArr.push(...ecu_db);
    }
    const resPidArr: PID[] = [];
    if (pids) {
      const pid_db = await this.pidrepository.find({
        where: {
          id: In(pids),
        },
      });

      if (!pid_db) {
        return Promise.reject(new Error('THIS ECUS IS NOT FOUND'));
      }

      resPidArr.push(...pid_db);
    }
    const piddatasettosave: PIDDataset = {
      active: active,
      // created_at: ,
      description: description,
      ecus: resEcuArr,
      // id: ,
      // message_types,
      name: name,
      pids: resPidArr,
      // updated_at,
    };

    const savePidDataset = Object.assign(new PIDDataset(), piddatasettosave);
    const savedPidDataset = await this.piddatasetrepository.save(savePidDataset);

    const resPidDataset: ResPIDDataset = {
      active: savedPidDataset.active,
      createdAt: savedPidDataset.created_at,
      description: savedPidDataset.description,
      // ecus,
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

    const resPidArrr: ResPID[] = [];
    savedPidDataset.pids?.map((p) => {
      const respid: ResPID = {
        active: p.active,
        bitCoded: p.bit_coded,
        bytePosition: p.byte_position,
        createdAt: p.created_at,
        description: p.description,
        id: p.id,
        lengthBytes: p.length_bytes,
        longName: p.long_name,
        max: p.max,
        min: p.min,
        offset: p.offset,
        // parameter: p.s,
        pidCode: p.pid_code,
        // pid_datasets: p.,
        read: p.read,
        resolution: p.resolution,
        shortName: p.short_name,
        totalLength: p.total_length,
        unit: p.unit,
        updatedAt: p.updated_at,
        write: p.write,
      };

      resPidArrr.push(respid);
    });
    resPidDataset.pids = resPidArrr;
    resPidDataset.ecus = resEcuArr;
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
    // const ecuArr: ResECU[] = [];

    for (const piddataset of piddatasets) {
      const resECUArr: ResECU[] = [];
      const resPidArr: ResPID[] = [];

      piddataset.pids?.map((p) => {
        const resPid: ResPID = {
          active: p.active,
          bitCoded: p.bit_coded,
          bytePosition: p.byte_position,
          createdAt: p.created_at,
          description: p.description,
          id: p.id,
          lengthBytes: p.length_bytes,
          longName: p.long_name,
          max: p.max,
          min: p.min,
          offset: p.offset,
          // parameters,
          pidCode: p.pid_code,
          // pid_datasets,
          read: p.read,
          resolution: p.resolution,
          shortName: p.short_name,
          totalLength: p.total_length,
          unit: p.unit,
          updatedAt: p.updated_at,
          write: p.write,
        };

        resPidArr.push(resPid);
      });
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
        pids: resPidArr,
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
    const resPidArr: ResPID[] = [];

    piddataset.pids?.map((p) => {
      const resPid: ResPID = {
        active: p.active,
        bitCoded: p.bit_coded,
        bytePosition: p.byte_position,
        createdAt: p.created_at,
        description: p.description,
        id: p.id,
        lengthBytes: p.length_bytes,
        longName: p.long_name,
        max: p.max,
        min: p.min,
        offset: p.offset,
        // parameters,
        pidCode: p.pid_code,
        // pid_datasets,
        read: p.read,
        resolution: p.resolution,
        shortName: p.short_name,
        totalLength: p.total_length,
        unit: p.unit,
        updatedAt: p.updated_at,
        write: p.write,
      };

      resPidArr.push(resPid);
    });
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
