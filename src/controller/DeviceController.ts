import { Body, Controller, Put, Route, Tags } from "tsoa";
import { getRepository } from "typeorm";
import { Device } from "../entity/Device";

interface GeolocationUpdate {
    deviceId: number;
    latitude: number;
    longitude: number;
}
@Route('/device')
@Tags('Device')
export class DeviceController extends Controller{
    @Put('/update')
    public async updateGeolocation(@Body() body: GeolocationUpdate): Promise<void> {
        const deviceRepository = getRepository(Device);
        const point = `POINT(${body.longitude} ${body.latitude})`;

        await deviceRepository
            .createQueryBuilder()
            .update(Device)
            .set({ location: () => `ST_SetSRID(ST_MakePoint(${body.longitude}, ${body.latitude}), 4326)` })
            .where('id = :deviceId', { deviceId: body.deviceId })
            .execute();
    }
}