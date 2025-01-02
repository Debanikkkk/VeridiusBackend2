import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { MessageType } from '../entity/MessageType';
import { ReqMessageType } from '../models/req/ReqMessageType';
import { ResMessageType } from '../models/res/ResMessageType';
import { PIDDataset } from '../entity/PIDDataset';
import { In } from 'typeorm';
import { ResPIDDataset } from '../models/res/ResPIDDataset';
@Route('/message_type')
@Tags('Message Type')
export class MessageTypeController extends Controller {
  private messageTypeRepository = AppDataSource.getRepository(MessageType);
  private piddatasetrep = AppDataSource.getRepository(PIDDataset);

  @Post()
  public async saveMessageType(@Body() req: ReqMessageType): Promise<ResMessageType> {
    const { name, pidDatasets } = req;

    const resPidDatasetArr: PIDDataset[] = [];
    if (pidDatasets) {
      const piddataset_db = await this.piddatasetrep.find({
        where: {
          id: In(pidDatasets),
        },
      });

      if (!piddataset_db) {
        return Promise.reject(new Error('THESE PID DATASETS WERE NOT FOUND'));
      }

      resPidDatasetArr.push(...piddataset_db);
    }

    const messageType: MessageType = {
      // created_at,
      // id: ,
      name: name,
      pid_datasets: resPidDatasetArr,
      // updated_at,
    };

    const saveMessageType = Object.assign(new MessageType(), messageType);
    const savedMessageType = await this.messageTypeRepository.save(saveMessageType);

    const resMessageType: ResMessageType = {
      createdAt: savedMessageType.created_at,
      id: savedMessageType.id,
      name: savedMessageType.name,
      // pidDatasets:
      updatedAt: savedMessageType.updated_at,
    };
    const resPidDatasetArrr: ResPIDDataset[] = [];
    savedMessageType.pid_datasets?.map((d) => {
      const resPidDataset: ResPIDDataset = {
        active: d.active,
        createdAt: d.created_at,
        description: d.description,
        // ecus: d.,
        id: d.id,
        name: d.name,
        // pids: d.,
        updatedAt: d.updated_at,
      };
      resPidDatasetArrr.push(resPidDataset);
    });

    resMessageType.pidDatasets = resPidDatasetArrr;
    return resMessageType;
  }

  @Get('/{messageTypeId}')
  public async getOneMessageType(@Path() messageTypeId: number) {
    const messageType = await this.messageTypeRepository.findOne({
      where: {
        id: messageTypeId,
      },
      relations: {
        pid_datasets: true,
      },
    });
    if (!messageType) {
      return Promise.reject(new Error('THIS MESSAGE TYPE WAS NOT FOUND'));
    }
    const resMessageType: ResMessageType = {
      createdAt: messageType.created_at,
      id: messageType.id,
      name: messageType.name,
      // pidDatasets:
      updatedAt: messageType.updated_at,
    };
    const resPidDatasetArrr: ResPIDDataset[] = [];
    messageType.pid_datasets?.map((d) => {
      const resPidDataset: ResPIDDataset = {
        active: d.active,
        createdAt: d.created_at,
        description: d.description,
        // ecus: d.,
        id: d.id,
        name: d.name,
        // pids: d.,
        updatedAt: d.updated_at,
      };
      resPidDatasetArrr.push(resPidDataset);
    });

    resMessageType.pidDatasets = resPidDatasetArrr;
    return resMessageType;
  }

  @Get()
  public async getAllMessageType() {
    const messageTypes = await this.messageTypeRepository.find({
      relations: {
        pid_datasets: true,
      },
    });

    if (!messageTypes) {
      return Promise.reject(new Error('THESE MESSAGE TYPES WERE NOT FOUND'));
    }

    const resMessageType: ResMessageType[] = [];
    for (const messageType of messageTypes) {
      const resPidDatasetTypeArr: PIDDataset[] = [];
      messageType.pid_datasets?.map((p) => {
        const pidDataset: ResPIDDataset = {
          createdAt: p.created_at,
          id: p.id,
          name: p.name,
          // pidDatasets,
          updatedAt: p.updated_at,
          active: p.active,
          description: p.description,
          // ecus: p.,
          // pids,
        };

        resPidDatasetTypeArr.push(pidDataset);
      });

      resMessageType.push({
        createdAt: messageType.created_at,
        id: messageType.id,
        name: messageType.name,
        pidDatasets: resPidDatasetTypeArr,
        updatedAt: messageType.updated_at,
      });
    }

    return resMessageType;
  }
}
