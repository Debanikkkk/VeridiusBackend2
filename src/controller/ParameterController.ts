import { Body, Controller, Post } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Parameters } from '../entity/Parameters';
import { ReqParameter } from '../models/req/ReqParameter';
import { ResParameter } from '../models/res/ResParameter';
import { PID } from '../entity/PID';
import { In } from 'typeorm';
import { ResPID } from '../models/res/ResPID';

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
        bit_coded: ppid.bit_coded,
        byte_position: ppid.byte_position,
        created_at: ppid.created_at,
        description: ppid.description,
        id: ppid.id,
        length_bytes: ppid.length_bytes,
        long_name: ppid.long_name,
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
}
