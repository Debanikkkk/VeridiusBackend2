import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { DtcDataset } from '../entity/DTCDataset';
import { ReqDtcDataset } from '../models/req/ReqDTCDataset';
import { ResDtcDataset } from '../models/res/ResDTCDataset';
import { ECU } from '../entity/ECU';
import { DTC } from '../entity/DTC';
import { In } from 'typeorm';
import { ResECU } from '../models/res/ResECU';
import { ResDTC } from '../models/res/ResDTC';

@Route('/dtc_dataset')
@Tags('DTC Dataset')
export class DTCDatasetController extends Controller {
  private dtcdatasetrepository = AppDataSource.getTreeRepository(DtcDataset);
  private ecurepository = AppDataSource.getRepository(ECU);
  private dtcrepository = AppDataSource.getRepository(DTC);
  @Post()
  public async saveDtcDataset(@Body() request: ReqDtcDataset): Promise<ResDtcDataset> {
    const { description, dtcs, ecus, isActive, name } = request;
    let db_dtc;
    let db_ecus;
    if (dtcs) {
      db_dtc = await this.dtcrepository.find({
        where: {
          id: In(dtcs),
        },
      });
    }

    if (ecus) {
      db_ecus = await this.ecurepository.find({
        where: {
          id: In(ecus),
        },
      });
    }

    const dtcdatasettosave: DtcDataset = {
      //   created_at: ,
      description: description,
      dtcs: db_dtc,
      ecus: db_ecus,
      //   id: ,
      is_active: isActive,
      name: name,
      //   updated_at,
    };

    const dtcdatasetsaver = Object.assign(new DtcDataset(), dtcdatasettosave);
    const savedDtcDataset = await this.dtcdatasetrepository.save(dtcdatasetsaver);

    const resDtcDataset: ResDtcDataset = {
      createdAt: savedDtcDataset.created_at,
      description: savedDtcDataset.description,
      dtcs: savedDtcDataset.dtcs,
      ecus: savedDtcDataset.ecus,
      id: savedDtcDataset.id,
      isActive: savedDtcDataset.is_active,
      name: savedDtcDataset.name,
      updatedAt: savedDtcDataset.updated_at,
    };

    return resDtcDataset;
  }

  @Get('/{dtcDatasetId}')
  public async getOneDtcDataset(@Path() dtcDatasetId: number): Promise<ResDtcDataset> {
    const dtcDataset = await this.dtcdatasetrepository.findOne({
      where: {
        id: dtcDatasetId,
      },
    });

    if (!dtcDataset) {
      return Promise.reject(new Error('DTC DATASET NOT FOUND'));
    }

    const resDtcDataset: ResDtcDataset = {
      createdAt: dtcDataset.created_at,
      description: dtcDataset.description,
      //   dtcs: {},
      //   ecus: {},
      id: dtcDataset.id,
      isActive: dtcDataset.is_active,
      name: dtcDataset.name,
      updatedAt: dtcDataset.updated_at,
    };

    const resDtcArr: ResDTC[] = [];
    const resEcuArr: ResECU[] = [];

    dtcDataset.dtcs?.map((dtc) => {
      const resDtcDataset: ResDTC = {
        createdAt: dtc.created_at,
        description: dtc.description,
        // dtcDataset: dtc.d,
        id: dtc.id,
        isActive: dtc.is_active,
        name: dtc.name,
        updatedAt: dtc.updated_at,
      };

      resDtcArr.push(resDtcDataset);
    });

    dtcDataset.ecus?.map((ecu) => {
      const resECU: ResECU = {
        createdAt: ecu.created_at,
        // dtcDataset,
        ecuName: ecu.ecu_name,
        // firmwares,
        id: ecu.id,
        isActive: ecu.is_active,
        macId: ecu.mac_id,
        // negativeResponses,
        // pidDataset,
        protocol: ecu.protocol,
        rxHeader: ecu.rx_header,
        txHeader: ecu.tx_header,
        updatedAt: ecu.updated_at,
        // vehicles,
      };

      resEcuArr.push(resECU);
    });

    return resDtcDataset;
  }

  @Get()
  public async getAllDtcDataset(): Promise<ResDtcDataset[]> {
    const dtcDatasets = await this.dtcdatasetrepository.find({
      relations: {
        dtcs: true,
        ecus: true,
      },
    });

    const dtcDatasetArr: ResDtcDataset[] = [];

    for (const dtcDataset of dtcDatasets) {
      const resDtcArr: ResDTC[] = [];
      const resEcuArr: ResECU[] = [];

      dtcDataset.dtcs?.map((dtc) => {
        const resDtcDataset: ResDTC = {
          createdAt: dtc.created_at,
          description: dtc.description,
          // dtcDataset: dtc.d,
          id: dtc.id,
          isActive: dtc.is_active,
          name: dtc.name,
          updatedAt: dtc.updated_at,
        };

        resDtcArr.push(resDtcDataset);
      });

      dtcDataset.ecus?.map((ecu) => {
        const resECU: ResECU = {
          createdAt: ecu.created_at,
          // dtcDataset,
          ecuName: ecu.ecu_name,
          // firmwares,
          id: ecu.id,
          isActive: ecu.is_active,
          macId: ecu.mac_id,
          // negativeResponses,
          // pidDataset,
          protocol: ecu.protocol,
          rxHeader: ecu.rx_header,
          txHeader: ecu.tx_header,
          updatedAt: ecu.updated_at,
        };

        resEcuArr.push(resECU);

        dtcDatasetArr.push({
          createdAt: dtcDataset.created_at,
          description: dtcDataset.description,
          dtcs: resDtcArr,
          ecus: resEcuArr,
          id: dtcDataset.id,
          isActive: dtcDataset.is_active,
          name: dtcDataset.name,
          updatedAt: dtcDataset.updated_at,
        });
      });
    }
    return dtcDatasetArr;
  }

  @Delete('/{dtcDatasetId}')
  public async deleteDTCDataset(@Path() dtcDatasetId: number) {
    const dtcdataset = await this.dtcdatasetrepository.findOne({
      where: {
        id: dtcDatasetId,
      },
    });

    if (!dtcdataset) {
      return Promise.reject(new Error('THIS DTC DATASET WAS NOT FOUND'));
    }

    await this.dtcdatasetrepository.remove(dtcdataset);
    return { result: 'THIS DTC DATASET WAS DELETED SUCCESFULLY' };
  }
}
