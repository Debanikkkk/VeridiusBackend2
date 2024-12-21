import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { PIDDataset } from '../entity/PIDDataset';
import { ReqPIDDataset } from '../models/req/ReqPIDDataset';
import { ResPIDDataset } from '../models/res/ResPIDDataset';
@Route('/pidDataset')
@Tags('PID Dataset')
export class PIDDatasetController extends Controller {
  private piddatasetcontroller = AppDataSource.getRepository(PIDDataset);

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
    const savedPidDataset = await this.piddatasetcontroller.save(savePidDataset);

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

    return resPidDataset;
  }
}
