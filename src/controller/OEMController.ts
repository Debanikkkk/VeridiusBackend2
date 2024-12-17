import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { OEM } from '../entity/OEM';
import { ReqOEM } from '../models/req/ReqOEM';
import { ResOEM } from '../models/res/ResOEM';
@Tags('OEM')
@Route('/oem')
export class OEMController extends Controller {
  private oemrepository = AppDataSource.getRepository(OEM);

  @Post()
  public async saveOem(@Body() request: ReqOEM) {
    const { contact_information, country, founded_year, name, website } = request;
    const oemSave: OEM = {
      contact_information: contact_information,
      country: country,
      founded_year: founded_year,
      // id,
      name: name,
      // vehicle_models,
      website: website,
    };

    const oemSaver = Object.assign(new OEM(), oemSave);
    const savedOEM = await this.oemrepository.save(oemSaver);

    const resOEM: ResOEM = {
      contact_information: savedOEM.contact_information,
      country: savedOEM.country,
      founded_year: savedOEM.founded_year,
      id: savedOEM.id,
      name: savedOEM.name,
      website: savedOEM.website,
    };
    return resOEM;
  }
}
