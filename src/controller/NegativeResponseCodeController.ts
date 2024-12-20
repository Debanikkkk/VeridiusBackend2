import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { NegativeResponseCode } from '../entity/NegativeCode';
import { ReqNegativeResponseCode } from '../models/req/ReqNegativeresponse';
import { ResNegativeResponseCode } from '../models/res/ResNegativeResponse';
import { ECU } from '../entity/ECU';
import { In } from 'typeorm';
@Tags('Negative Response')
@Route('/negative_response')
export class NegativeResponseCodeController extends Controller {
  private negativeresponsecoderepository = AppDataSource.getRepository(NegativeResponseCode);
  private ecurepository = AppDataSource.getRepository(ECU);

  @Post()
  public async saveNegResCode(@Body() req: ReqNegativeResponseCode) {
    const { description, responseCode, ecus } = req;

    const ecuArr: ECU[] = [];
    if (ecus) {
      const db_ecu = await this.ecurepository.find({
        where: {
          id: In(ecus),
        },
      });
      if (!db_ecu) {
        return Promise.reject(new Error('THESE NEGATIVE RESPONSES ARE NOT FOUND'));
      }
      ecuArr.push(...db_ecu);
    }

    const negativeResponseToSave: NegativeResponseCode = {
      // created_at,
      description: description,
      ecus: ecuArr,
      // id,
      response_code: responseCode,
      // updated_at
    };
    const negresSaver = Object.assign(new NegativeResponseCode(), negativeResponseToSave);
    const savedNegres = await this.negativeresponsecoderepository.save(negresSaver);

    const resNegres: ResNegativeResponseCode = {
      createdAt: savedNegres.created_at!,
      id: savedNegres.id!,
      responseCode: savedNegres.response_code!,
      updatedAt: savedNegres.updated_at!,
      description: savedNegres.description!,
      ecus: savedNegres.ecus,
    };

    return resNegres;
  }

  @Get()
  public async getAllNegres() {
    const negress = await this.negativeresponsecoderepository.find({
      relations: {
        ecus: true,
      },
    });

    if (!negress) {
      return Promise.reject(new Error('THESE NEGATIVE RESPONSES ARE NOT FOUND'));
    }

    const negresArr: ResNegativeResponseCode[] = [];

    for (const negres of negress) {
      negresArr.push({
        createdAt: negres.created_at!,
        id: negres.id!,
        responseCode: negres.response_code!,
        updatedAt: negres.updated_at!,
        description: negres.description,
        ecus: negres.ecus,
      });
    }
    console.log('this is the negres arr', negresArr);
    return negresArr;
  }

  @Get('/{negresId}')
  public async getOneNegres(@Path() negresId: number): Promise<ResNegativeResponseCode> {
    const negres = await this.negativeresponsecoderepository.findOne({
      where: {
        id: negresId,
      },
      relations: {
        ecus: true,
      },
    });
    if (!negres) {
      return Promise.reject(new Error('THESE NEGATIVE RESPONSES ARE NOT FOUND'));
    }

    const resNegres: ResNegativeResponseCode = {
      createdAt: negres.created_at!,
      id: negres.id!,
      responseCode: negres.response_code!,
      updatedAt: negres.updated_at!,
      description: negres.description!,
      ecus: negres.ecus,
    };

    return resNegres;
  }

  @Delete('/{negresId}')
  public async deleteNegres(@Path() negresId: number) {
    const negres_to_delete = await this.negativeresponsecoderepository.findOne({
      where: {
        id: negresId,
      },
    });

    if (!negres_to_delete) {
      return Promise.reject(new Error('THIS NEGATIVE RESPONSE ARE NOT FOUND'));
    }

    await this.negativeresponsecoderepository.remove(negres_to_delete);
    return { result: 'THIS NEGATIVE RESPONSE CODE WAS DELETED SUCCESSFULLY' };
  }
}
