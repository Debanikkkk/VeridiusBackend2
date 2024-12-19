import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { DTC } from '../entity/DTC';
import { ReqDTC } from '../models/req/ReqDTC';
import { ResDTC } from '../models/res/ResDTC';
import { ResDtcDataset } from '../models/res/ResDTCDataset';

@Route('/dtc')
@Tags('DTC')
export class DTCController extends Controller {
  private dtcrepository = AppDataSource.getRepository(DTC);

  @Post()
  public async saveDtc(@Body() request: ReqDTC): Promise<ResDTC> {
    const { description, isActive, name } = request;

    const dtcToSave: DTC = {
      description: description,
      is_active: isActive,
      name: name,
    };

    const dtcsaver = Object.assign(new DTC(), dtcToSave);
    const savedDtc = await this.dtcrepository.save(dtcsaver);

    const resDTC: ResDTC = {
      updatedAt: savedDtc.updated_at,
      createdAt: savedDtc.created_at,
      description: savedDtc.description,
      //   dtcDataset: savedDtc.,
      id: savedDtc.id,
      isActive: savedDtc.is_active,
      name: savedDtc.name,
    };
    return resDTC;
  }

  @Get()
  public async getAllDTC() {
    const dtcs = await this.dtcrepository.find({
      relations: {
        dtc_dataset: true,
      },
    });

    if (!dtcs) {
      return Promise.reject(new Error('THE DTCS WERE NOT FOUND'));
    }
    const dtcArr: ResDTC[] = [];
    for (const dtc of dtcs) {
      const resDtcDataset: ResDtcDataset[] =
        dtc.dtc_dataset?.map((dataset) => ({
          id: dataset.id,
          name: dataset.name,
          description: dataset.description,
          createdAt: dataset.created_at,
          updatedAt: dataset.updated_at,
          isActive: dataset.is_active,
        })) || [];
      dtcArr.push({
        createdAt: dtc.created_at,
        description: dtc.description,
        dtcDataset: resDtcDataset,
        id: dtc.id,
        isActive: dtc.is_active,
        name: dtc.name,
        updatedAt: dtc.updated_at,
      });
    }
    return dtcArr;
  }

  @Get('/{dtcId}')
  public async getOneDTC(@Path() dtcId: number) {
    const dtc = await this.dtcrepository.findOne({
      where: {
        id: dtcId,
      },
    });

    if (!dtc) {
      return Promise.reject(new Error('THE DTC WERE NOT FOUND'));
    }
    const resDtcDataset: ResDtcDataset[] =
      dtc.dtc_dataset?.map((dataset) => ({
        id: dataset.id,
        name: dataset.name,
        description: dataset.description,
        createdAt: dataset.created_at,
        updatedAt: dataset.updated_at,
        isActive: dataset.is_active,
      })) || [];
    const resDTC: ResDTC = {
      createdAt: dtc.created_at,
      description: dtc.description,
      dtcDataset: resDtcDataset,
      id: dtc.id,
      isActive: dtc.is_active,
      name: dtc.name,
      updatedAt: dtc.updated_at,
    };

    return resDTC;
  }

  @Delete('/{dtcId}')
  public async deleteDTC(@Path() dtcId: number) {
    const dtc_to_delete = await this.dtcrepository.findOne({
      where: {
        id: dtcId,
      },
    });

    if (!dtc_to_delete) {
      return Promise.reject(new Error('THE DTC WERE NOT FOUND'));
    }

    await this.dtcrepository.remove(dtc_to_delete);

    return { result: 'DTC WAS DELETED SUCCESSFULLY' };
  }
}
