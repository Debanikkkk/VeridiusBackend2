import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { NegativeResponseCode } from '../entity/NegativeCode';
import { ReqNegativeResponseCode } from '../models/req/ReqNegativeresponse';
import { ResNegativeResponseCode } from '../models/res/ResNegativeResponse';
@Tags('Negative Response')
@Route('/negative_response')
export class NegativeResponseCodeController extends Controller {
  private negativeresponsecoderepository = AppDataSource.getRepository(NegativeResponseCode);

  @Post()
  public async saveNegResCode(@Body() req: ReqNegativeResponseCode) {
    const { description, responseCode } = req;

    const negativeResponseToSave: NegativeResponseCode = {
      // created_at,
      description: description,
      // ecus,
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
    };

    return resNegres;
  }
}
