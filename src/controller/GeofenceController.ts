import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Geofence, geofenceShape } from '../entity/Geofence';
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
    const { geofenceType, latitude, longitude, name, polygon, radius } = req;
    if (!name) {
      return Promise.reject(new Error('NAME HAS TO BE PROVIDED'));
    }
    if (!polygon) {
      return Promise.reject(new Error('POLYGON HAS TO BE PROVIDED'));
    }
    const polygonToSave: Geofence = {
      name: name,
      geofence_type: geofenceType,
    };
    console.log('this is the geofence type ', geofenceType);
    if (geofenceType == 'CIRCLE') {
      polygonToSave.latitude = latitude;
      polygonToSave.longitude = longitude;
      polygonToSave.radius = radius;
    }

    if (geofenceType == 'POLYGON') {
      polygonToSave.polygon = polygon;
    }
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

  @Get('/getCircleGeofence')
  public async getCircleGeofence() {
    const geofences = await this.geofencerepository.find({
      where: {
        geofence_type: geofenceShape.circle,
      },
    });
    if (!geofences) {
      return Promise.reject(new Error('THE GEOFENCE DOES NOT EXIST'));
    }

    const geofenceArr: ResGeofence[] = [];
    for (const geofence of geofences) {
      geofenceArr.push({
        name: geofence.name,
        polygon: geofence.polygon,
        geofenceType: geofence.geofence_type,
        id: geofence.id,
        latitude: geofence.latitude,
        longitude: geofence.longitude,
        radius: geofence.radius,
      });
    }
    return geofenceArr;
  }

  @Get('/getPolygonGeofence')
  public async getPolygonGeofence() {
    const geofences = await this.geofencerepository.find({
      where: {
        geofence_type: geofenceShape.polygon,
      },
    });
    if (!geofences) {
      return Promise.reject(new Error('THE GEOFENCE DOES NOT EXIST'));
    }

    const geofenceArr: ResGeofence[] = [];
    for (const geofence of geofences) {
      geofenceArr.push({
        name: geofence.name,
        polygon: geofence.polygon,
        geofenceType: geofence.geofence_type,
        id: geofence.id,
        latitude: geofence.latitude,
        longitude: geofence.longitude,
        radius: geofence.radius,
      });
    }
    return geofenceArr;
  }
}
