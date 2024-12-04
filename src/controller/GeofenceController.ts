import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Geofence } from '../entity/Geofence';
import { ReqGeofence } from '../models/req/ReqGeofence';
import { ResGeofence } from '../models/res/ResGeofence';
import wkx from 'wkx';
export function wkbToGeo(wkbb: string) {
  // const wkx = require('wkx');

  const wkb = Buffer.from(wkbb, 'hex');
  const geoJson = wkx.Geometry.parse(wkb).toGeoJSON();
  console.log(geoJson);
}
@Route('/geofence')
@Tags('Geofence')
export class GeofenceController extends Controller {
  private geofencerepository = AppDataSource.getRepository(Geofence);

  @Post()
  public async saveGeofence(@Body() req: ReqGeofence): Promise<ResGeofence> {
    const { name, polygon } = req;
    if (!name) {
      return Promise.reject(new Error('NAME HAS TO BE PROVIDED'));
    }
    if (!polygon) {
      return Promise.reject(new Error('POLYGON HAS TO BE PROVIDED'));
    }
    const polygonToSave: Geofence = {
      name: name,
      polygon: polygon,
    };

    const savePolygon = Object.assign(new Geofence(), polygonToSave);
    const savedPolygon = await this.geofencerepository.save(savePolygon);
    // const geo = savedPolygon.polygon;
    const polygonString = JSON.stringify(polygon);
    console.log('the raaw coords are', savePolygon.polygon);
    console.log('the geo coords are ', polygonString);
    const resPolygon: ResGeofence = {
      id: savedPolygon.id,
      name: savedPolygon.name,
      polygon: savedPolygon.polygon,
    };

    return resPolygon;
  }

  @Get()
  public async getAllGeofence(): Promise<ResGeofence[]> {
    const geofences = await this.geofencerepository.find();
    if (!geofences) {
      return Promise.reject(new Error('THE GEOFENCE DOES NOT EXIST'));
    }

    const geofenceArr: ResGeofence[] = [];
    for (const geofence of geofences) {
      geofenceArr.push({
        name: geofence.name,
        polygon: geofence.polygon,
      });
    }
    return geofenceArr;
  }
}
