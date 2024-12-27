import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { ECUAttributeList } from '../entity/ECUAttributeList';
import { ResECUAtt } from '../models/res/ResECUAtt';
import { ReqECUAtt } from '../models/req/ReqECUAtt';

@Tags('ECU Attribute List')
@Route('/ecuAttList')
export class ECUAttributeListController extends Controller {
  private ecuattrep = AppDataSource.getRepository(ECUAttributeList);

  @Post()
  public async saveEcuAtt(@Body() req: ReqECUAtt): Promise<ResECUAtt> {
    const { attributeName, attributeValue, isActive, status } = req;

    const saveEcuAtt: ECUAttributeList = {
      attribute_name: attributeName,
      attribute_value: attributeValue,
      // created_at: cre,
      //   id: id,
      is_active: isActive,
      status: status,
      //   updated_at,
    };

    const ecusaver = Object.assign(new ECUAttributeList(), saveEcuAtt);
    const savedECUAtt = await this.ecuattrep.save(ecusaver);

    const resECUAtt: ResECUAtt = {
      attributeName: savedECUAtt.attribute_name,
      attributeValue: savedECUAtt.attribute_name,
      createdAt: savedECUAtt.created_at,
      id: savedECUAtt.id,
      isActive: savedECUAtt.is_active,
      status: savedECUAtt.status,
      updatedAt: savedECUAtt.updated_at,
    };

    return resECUAtt;
  }

  @Get()
  public async getAllECUAtt(): Promise<ResECUAtt[]> {
    const ecuatt = await this.ecuattrep.find();

    if (!ecuatt) {
      return Promise.reject(new Error('THIS ECU ATTRIBUTE LIST WAS NOT FOUND'));
    }

    const resECUArr: ResECUAtt[] = [];

    for (const ecu of ecuatt) {
      resECUArr.push({
        attributeName: ecu.attribute_name,
        attributeValue: ecu.attribute_name,
        createdAt: ecu.created_at,
        id: ecu.id,
        isActive: ecu.is_active,
        status: ecu.status,
        updatedAt: ecu.updated_at,
      });
    }
    return resECUArr;
  }

  @Get('/{ecuAttId}')
  public async getOneECUAtt(@Path() ecuAttId: number): Promise<ResECUAtt> {
    const ecuatt = await this.ecuattrep.findOne({
      where: {
        id: ecuAttId,
      },
    });

    if (!ecuatt) {
      return Promise.reject(new Error('THIS ECU ATTRIBUTE LIST WAS NOT FOUND'));
    }

    const resECUAtt: ResECUAtt = {
      attributeName: ecuatt.attribute_name,
      attributeValue: ecuatt.attribute_name,
      createdAt: ecuatt.created_at,
      id: ecuatt.id,
      isActive: ecuatt.is_active,
      status: ecuatt.status,
      updatedAt: ecuatt.updated_at,
      // attributeName: ecuatt.
    };
    return resECUAtt;
  }

  @Delete('/{ecuAttId}')
  public async deleteECUAtt(@Path() ecuAttId: number) {
    const ecuAttToDelete = await this.ecuattrep.findOne({
      where: {
        id: ecuAttId,
      },
    });

    if (!ecuAttToDelete) {
      return Promise.reject(new Error('THIS ECU ATTRIBUTE LIST WAS NOT FOUND'));
    }

    await this.ecuattrep.remove(ecuAttToDelete);
    return { result: 'THIS ECU ATT WAS DELETED' };
  }
}
