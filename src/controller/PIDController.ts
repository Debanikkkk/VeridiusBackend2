import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { PID } from '../entity/PID';
import { ReqPID } from '../models/req/ReqPID';
import { ResPID } from '../models/res/ResPID';
import { In } from 'typeorm';
import { Parameters } from '../entity/Parameters';
import { PIDDataset } from '../entity/PIDDataset';
import { ResPIDDataset } from '../models/res/ResPIDDataset';
import { ResParameter } from '../models/res/ResParameter';

@Route('/pid')
@Tags('PID')
export class PIDController extends Controller {
  private pidrepository = AppDataSource.getRepository(PID);
  private parameterrepository = AppDataSource.getRepository(Parameters);
  private piddatasetrepository = AppDataSource.getRepository(PIDDataset);
  @Post()
  public async savePID(@Body() req: ReqPID): Promise<ResPID> {
    const {
      active,
      bitCoded,
      bytePosition,
      createdAt,
      description,
      //   id,
      lengthBytes,
      longName,
      max,
      min,
      offset,
      parameters,
      pidCode,
      pidDatasets,
      read,
      resolution,
      shortName,
      totalLength,
      unit,
      updatedAt,
      write,
    } = req;
    let db_parameters;
    if (parameters) {
      db_parameters = await this.parameterrepository.find({
        where: {
          id: In(parameters),
        },
      });
    }
    let db_piddataset;
    if (pidDatasets) {
      db_piddataset = await this.piddatasetrepository.find({
        where: {
          id: In(pidDatasets),
        },
      });
    }

    const pidSaver: PID = {
      active: active,
      bit_coded: bitCoded,
      byte_position: bytePosition,
      created_at: createdAt,
      description: description,
      //   id: id,
      length_bytes: lengthBytes,
      long_name: longName,
      max: max,
      min: min,
      offset: offset,

      parameters: db_parameters,

      pid_code: pidCode,
      pid_datasets: db_piddataset,
      read: read,
      resolution,

      short_name: shortName,
      total_length: totalLength,
      unit: unit,
      updated_at: updatedAt,
      write: write,
    };
    const pidsaver = Object.assign(new PID(), pidSaver);
    const savedPid = await this.pidrepository.save(pidsaver);

    const resPid: ResPID = {
      active: savedPid.active,
      bitCoded: savedPid.bit_coded,
      bytePosition: savedPid.byte_position,
      createdAt: savedPid.created_at,
      description: savedPid.description,
      id: savedPid.id,
      lengthBytes: savedPid.length_bytes,
      longName: savedPid.long_name,
      max: savedPid.max,
      min: savedPid.min,
      offset: savedPid.offset,
      read: savedPid.read,
      resolution: savedPid.resolution,
      shortName: savedPid.short_name,
      totalLength: savedPid.total_length,
      unit: savedPid.unit,
      updatedAt: savedPid.updated_at,
      write: savedPid.write,
      pidCode: savedPid.pid_code,
      //   parameters: ,
      //   pid_datasets,
    };

    const resPiddatasetArr: ResPIDDataset[] = [];
    const resParameterArr: ResParameter[] = [];
    // const resPidArr: PID[] = [];
    savedPid.pid_datasets?.map((ppd) => {
      const resPidDataset: ResPIDDataset = {
        active: ppd.active,
        createdAt: ppd.created_at,
        description: ppd.description,
        // ecus: ppd.,
        id: ppd.id,
        // messageTypes: ppd,
        name: ppd.name,
        updatedAt: ppd.updated_at,
      };
      resPiddatasetArr.push(resPidDataset);
    });

    savedPid.parameters?.map((pdp) => {
      const resParameter: ResParameter = {
        active: pdp.active,
        created_at: pdp.created_at,
        description: pdp.description,
        id: pdp.id,
        name: pdp.name,
        // pids: pdp.,
        updated_at: pdp.updated_at,
      };
      resParameterArr.push(resParameter);
    });
    resPid.parameters = resParameterArr;
    resPid.pidDatasets = resPiddatasetArr;

    return resPid;
  }

  @Get()
  public async getAllPIDs() {
    const pids = await this.pidrepository.find({
      relations: {
        pid_datasets: true,
      },
    });

    if (!pids) {
      return Promise.reject(new Error('THE PIDS WERE NOT FOUND  '));
    }

    const pidArr: ResPID[] = [];

    for (const pid of pids) {
      const resPiddatasetArr: ResPIDDataset[] = [];
      const resParameterArr: ResParameter[] = [];
      // const resPidArr: PID[] = [];
      pid.pid_datasets?.map((ppd) => {
        const resPidDataset: ResPIDDataset = {
          active: ppd.active,
          createdAt: ppd.created_at,
          description: ppd.description,
          // ecus: ppd.,
          id: ppd.id,
          // messageTypes: ppd,
          name: ppd.name,
          updatedAt: ppd.updated_at,
        };
        resPiddatasetArr.push(resPidDataset);
      });

      pid.parameters?.map((pdp) => {
        const resParameter: ResParameter = {
          active: pdp.active,
          created_at: pdp.created_at,
          description: pdp.description,
          id: pdp.id,
          name: pdp.name,
          // pids: pdp.,
          updated_at: pdp.updated_at,
        };
        resParameterArr.push(resParameter);
      });

      pidArr.push({
        active: pid.active,
        bitCoded: pid.bit_coded,
        bytePosition: pid.byte_position,
        createdAt: pid.created_at,
        description: pid.description,
        id: pid.id,
        lengthBytes: pid.length_bytes,
        longName: pid.long_name,
        max: pid.max,
        min: pid.min,
        offset: pid.offset,
        parameters: resParameterArr,
        pidCode: pid.pid_code,
        pidDatasets: resPiddatasetArr,
        read: pid.read,
        resolution: pid.resolution,
        shortName: pid.short_name,
        totalLength: pid.total_length,
        unit: pid.unit,
        updatedAt: pid.updated_at,
        write: pid.write,
      });
    }

    return pidArr;
  }

  @Get('/{pidId}')
  public async getOnePID(@Path() pidId: number) {
    const pid = await this.pidrepository.findOne({
      where: {
        id: pidId,
      },
    });

    if (!pid) {
      return Promise.reject(new Error('THE PID WAS NOT FOUND  '));
    }
    const resPid: ResPID = {
      active: pid.active,
      bitCoded: pid.bit_coded,
      bytePosition: pid.byte_position,
      createdAt: pid.created_at,
      description: pid.description,
      id: pid.id,
      lengthBytes: pid.length_bytes,
      longName: pid.long_name,
      max: pid.max,
      min: pid.min,
      offset: pid.offset,
      read: pid.read,
      resolution: pid.resolution,
      shortName: pid.short_name,
      totalLength: pid.total_length,
      unit: pid.unit,
      updatedAt: pid.updated_at,
      write: pid.write,
      pidCode: pid.pid_code,
      //   parameters: ,
      //   pid_datasets,
    };
    const resPiddatasetArr: ResPIDDataset[] = [];
    const resParameterArr: ResParameter[] = [];
    // const resPidArr: PID[] = [];
    pid.pid_datasets?.map((ppd) => {
      const resPidDataset: ResPIDDataset = {
        active: ppd.active,
        createdAt: ppd.created_at,
        description: ppd.description,
        // ecus: ppd.,
        id: ppd.id,
        // messageTypes: ppd,
        name: ppd.name,
        updatedAt: ppd.updated_at,
      };
      resPiddatasetArr.push(resPidDataset);
    });

    pid.parameters?.map((pdp) => {
      const resParameter: ResParameter = {
        active: pdp.active,
        created_at: pdp.created_at,
        description: pdp.description,
        id: pdp.id,
        name: pdp.name,
        // pids: pdp.,
        updated_at: pdp.updated_at,
      };
      resParameterArr.push(resParameter);
    });
    resPid.parameters = resParameterArr;
    resPid.pidDatasets = resPiddatasetArr;

    return resPid;
  }

  @Delete('/{pidId}')
  public async deletePID(@Path() pidId: number) {
    const pid = await this.pidrepository.findOne({
      where: {
        id: pidId,
      },
    });

    if (!pid) {
      return Promise.reject(new Error('THE PID WAS NOT FOUND  '));
    }

    await this.pidrepository.remove(pid);
    return { result: 'THE PID WAS DELETED SUCCESSFULLY' };
  }
}
