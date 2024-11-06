import { Body, Controller, Path, Post, Put, Route, Tags } from "tsoa";
import { getRepository } from "typeorm";
import { Device } from "../entity/Device";
import { AppDataSource } from "../data-source";
import { Dongle } from "../entity/Dongle";
import { ReqDongleAllot } from "../models/req/ReqDongleAllot";
import { ReqDevice } from "../models/req/ReqDevice";
import { ResDevice } from "../models/res/ResDevice";

interface GeolocationUpdate {
    deviceId: number;
    latitude: number;
    longitude: number;
}
@Route('/device')
@Tags('Device')

export class DeviceController extends Controller{
    private devicerepository=AppDataSource.getRepository(Device)
    private donglerepository=AppDataSource.getRepository(Dongle)

     /**
     *  get all device (history enabled)
     * @summary get all device (history enabled)
     */
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
/**
 * SAVES DEVICE
 * @summary SAVES A DEVICE
 */
@Post()
public async saveDevice(@Body() request: ReqDevice): Promise<ResDevice>{
    const { mac_address,name}= request

    const deviceToSave: Device={
        mac_address: mac_address,
        name: name,
    }

    const deviceSaver=Object.assign(new Device(), deviceToSave)
    const savedDevice=await this.devicerepository.save(deviceSaver)

   const resDevice: ResDevice={
    dongle: {
        id: (await savedDevice.dongle)?.id,
        name: (await savedDevice.dongle)?.name
    },
    id: savedDevice.id,
    mac_address: savedDevice.mac_address,
    name: savedDevice.name,
    user:{
        // address: (await savedDevice.user)?.address,
        // email: (await savedDevice.user)?.email,
        // id: (await savedDevice.user)?.id,
        // name: (await savedDevice.user)?.name,
        // password: (await savedDevice.user)?.password,
        // phone_number: (await savedDevice.user)?.phone_number
    }
  }
  return resDevice
}

 /**
     * allot dongle to a device
     * @summary allot dongle to a device
     */
    @Put('allotDongle/{deviceId}')
    public async allotDongleToDevice(@Path() deviceId: number, @Body() request: ReqDongleAllot){
        const {id}=request
        const device=await this.devicerepository.findOne({
            where:{
                id: deviceId
            }
        })
        if(!device){
            return Promise.reject(new Error('DEVICE NOT FOUND'))
        }

        const dongle=await this.donglerepository.findOne({
            where: {
                id: id
            }
        })

        if(!dongle){
            return Promise.reject(new Error('DONGLE NOT FOUND'))
        }
console.log('IT REACHED HERE')
        device.dongle=dongle
        console.log('IT REACHED HERE')

        const newDevice =await this.devicerepository.save(device)
console.log('this is the newdevice', newDevice)
        return newDevice
    }
}