import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Parameters } from '../entity/Parameters';
import { ReqParameter } from '../models/req/ReqParameter';
import { ResParameter } from '../models/res/ResParameter';
import { PID } from '../entity/PID';
import { In } from 'typeorm';
import { ResPID } from '../models/res/ResPID';

@Route('/parameter')
@Tags('Parameter')
export class ParameterController extends Controller {
  private parameterrepository = AppDataSource.getRepository(Parameters);
  private pidrepository = AppDataSource.getRepository(PID);

  @Post()
  public async saveParameter(@Body() request: ReqParameter): Promise<ResParameter> {
    const { active, description, name, pids } = request;
    let db_pids;
    if (pids) {
      db_pids = await this.pidrepository.find({
        where: {
          id: In(pids),
        },
      });
    }

    const parameterSaver: Parameters = {
      active: active,
      //   created_at: ,
      description: description,
      //   id: ,
      name: name,
      pids: db_pids,
      //   updated_at,
    };

    const saveparameter = Object.assign(new Parameters(), parameterSaver);
    const savedParameter = await this.parameterrepository.save(saveparameter);

    const resParameter: ResParameter = {
      active: savedParameter.active,
      created_at: savedParameter.created_at,
      description: savedParameter.description,
      id: savedParameter.id,
      name: savedParameter.name,
      updated_at: savedParameter.updated_at,
    };
    const resPidArr: ResPID[] = [];
    savedParameter.pids?.map((ppid) => {
      const resPid: ResPID = {
        active: ppid.active,
        bitCoded: ppid.bit_coded,
        bytePosition: ppid.byte_position,
        createdAt: ppid.created_at,
        description: ppid.description,
        id: ppid.id,
        lengthBytes: ppid.length_bytes,
        longName: ppid.long_name,
        max: ppid.max,
        min: ppid.min,
        offset: ppid.offset,
        read: ppid.read,
        resolution: ppid.resolution,
      };
      resPidArr.push(resPid);
    });
    resParameter.pids = resPidArr;

    return resParameter;
  }

  @Get('/{parameterId}')
  public async getOneParameter(@Path() parameterId: number) {
    const parameter = await this.parameterrepository.findOne({
      where: {
        id: parameterId,
      },
    });

    if (!parameter) {
      return Promise.reject(new Error('THE PARAMETER WAS NOT FOUND  '));
    }

    const resParameter: ResParameter = {
      active: parameter.active,
      created_at: parameter.created_at,
      description: parameter.description,
      id: parameter.id,
      name: parameter.name,
      updated_at: parameter.updated_at,
    };
    const resPidArr: ResPID[] = [];
    parameter.pids?.map((ppid) => {
      const resPid: ResPID = {
        active: ppid.active,
        bitCoded: ppid.bit_coded,
        bytePosition: ppid.byte_position,
        createdAt: ppid.created_at,
        description: ppid.description,
        id: ppid.id,
        lengthBytes: ppid.length_bytes,
        longName: ppid.long_name,
        max: ppid.max,
        min: ppid.min,
        offset: ppid.offset,
        read: ppid.read,
        resolution: ppid.resolution,
      };
      resPidArr.push(resPid);
    });
    resParameter.pids = resPidArr;

    return resParameter;
  }

  @Get()
  public async getAllParameters() {
    const parameters = await this.parameterrepository.find();

    if (!parameters) {
      return Promise.reject(new Error('THE PARAMETERS WERE NOT FOUND'));
    }

    const parameterArr: ResParameter[] = [];
    for (const parameter of parameters) {
      const resPidArr: ResPID[] = [];
      parameter.pids?.map((ppid) => {
        const resPid: ResPID = {
          active: ppid.active,
          bitCoded: ppid.bit_coded,
          bytePosition: ppid.byte_position,
          createdAt: ppid.created_at,
          description: ppid.description,
          id: ppid.id,
          lengthBytes: ppid.length_bytes,
          longName: ppid.long_name,
          max: ppid.max,
          min: ppid.min,
          offset: ppid.offset,
          read: ppid.read,
          resolution: ppid.resolution,
        };
        resPidArr.push(resPid);
      });

      parameterArr.push({
        active: parameter.active,
        created_at: parameter.created_at,
        description: parameter.description,
        id: parameter.id,
        name: parameter.name,
        pids: resPidArr,
        updated_at: parameter.updated_at,
      });
    }

    return parameterArr;
  }

  @Delete('/{parameterId}')
  public async deleteParameter(@Path() parameterId: number) {
    const parameter = await this.parameterrepository.findOne({
      where: {
        id: parameterId,
      },
    });

    if (!parameter) {
      return Promise.reject(new Error('THE PARAMETER WAS NOT FOUND  '));
    }

    await this.parameterrepository.remove(parameter);
    return { result: 'PARAMETER WAS DELETED SUCCESSFULLY' };
  }
}
