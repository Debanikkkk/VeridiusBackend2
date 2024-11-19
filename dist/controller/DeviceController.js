"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceController = void 0;
const tsoa_1 = require("tsoa");
const Device_1 = require("../entity/Device");
const data_source_1 = require("../data-source");
const Dongle_1 = require("../entity/Dongle");
const DeviceHistory_1 = require("../entity/DeviceHistory");
const User_1 = require("../entity/User");
// interface GeolocationUpdate {
//     deviceId: number;
//     latitude: number;
//     longitude: number;
// }
let DeviceController = class DeviceController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.devicerepository = data_source_1.AppDataSource.getRepository(Device_1.Device);
        this.donglerepository = data_source_1.AppDataSource.getRepository(Dongle_1.Dongle);
        this.devicehistoryrepository = data_source_1.AppDataSource.getRepository(DeviceHistory_1.DeviceHistory);
        this.userrepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    /**
     *  get all device (history enabled)
     * @summary get all device (history enabled)
     */
    async getAllDevice() {
        try {
            const devices = await this.devicerepository.find({
                relations: {
                    dongle: true,
                },
            });
            if (!devices) {
                return Promise.reject(new Error('DEVICES WERE NOT FOUND'));
            }
            const resDevice = [];
            for (const device of devices) {
                const dongle = await device.dongle;
                // if(!dongle){
                //     return Promise.reject(new Error('THIS DONGLE WAS NOT FOUND'))
                // }
                resDevice.push({
                    dongle: {
                        id: dongle?.id,
                        name: dongle?.name,
                    },
                    id: device.id,
                    mac_address: device.mac_address,
                    name: device.name,
                    // user: device.user
                });
            }
            return resDevice;
        }
        catch (error) {
            console.log('there was an errror in getting all the devices', error);
            return { error: 'failed to get all the devices' };
        }
    }
    // @Put('/update')
    // public async updateGeolocation(@Body() body: GeolocationUpdate): Promise<void> {
    //     const deviceRepository = getRepository(Device);
    //     const point = `POINT(${body.longitude} ${body.latitude})`;
    //     await deviceRepository
    //         .createQueryBuilder()
    //         .update(Device)
    //         .set({ location: () => `ST_SetSRID(ST_MakePoint(${body.longitude}, ${body.latitude}), 4326)` })
    //         .where('id = :deviceId', { deviceId: body.deviceId })
    //         .execute();
    // }
    /**
     * SAVES DEVICE
     * @summary SAVES A DEVICE
     */
    async saveDevice(request) {
        try {
            const { mac_address, name } = request;
            const deviceToSave = {
                mac_address: mac_address,
                name: name,
            };
            const deviceSaver = Object.assign(new Device_1.Device(), deviceToSave);
            const savedDevice = await this.devicerepository.save(deviceSaver);
            const resDevice = {
                dongle: {
                    id: (await savedDevice.dongle)?.id,
                    name: (await savedDevice.dongle)?.name,
                },
                id: savedDevice.id,
                mac_address: savedDevice.mac_address,
                name: savedDevice.name,
                user: {
                // address: (await savedDevice.user)?.address,
                // email: (await savedDevice.user)?.email,
                // id: (await savedDevice.user)?.id,
                // name: (await savedDevice.user)?.name,
                // password: (await savedDevice.user)?.password,
                // phone_number: (await savedDevice.user)?.phone_number
                },
            };
            return resDevice;
        }
        catch (error) {
            console.log('there was an errror in saving the device', error);
            return { error: 'failed to save the device' };
        }
    }
    /**
     * delete device
     * @summary delete device
     */
    async deleteDevice(deviceId) {
        try {
            const devicetodelete = await this.devicerepository.findOne({
                where: {
                    id: deviceId,
                },
                relations: {
                    dongle: true,
                },
            });
            const user = await this.userrepository.findOne({
                where: {
                    device: {
                        id: deviceId,
                    },
                },
            });
            if (!devicetodelete) {
                return Promise.reject(new Error('DEVICE NOT FOUND'));
            }
            const device = {
                device_id: devicetodelete.id,
                dongle_id: devicetodelete.dongle?.id,
                id: devicetodelete.id,
                mac_address: devicetodelete.mac_address,
                name: devicetodelete.name,
                user_id: user?.id,
            };
            await this.devicehistoryrepository.save(device);
            await this.devicerepository.remove(devicetodelete);
            return { result: 'DEVICE WAS DELETED SUCCESSFULLY' };
        }
        catch (error) {
            console.log('there was an errror in deleting the device', error);
            return { error: 'failed to delete the device' };
        }
    }
    /**
     * allot dongle to a device
     * @summary allot dongle to a device
     */
    async allotDongleToDevice(deviceId, request) {
        try {
            const { id } = request;
            const device = await this.devicerepository.findOne({
                where: {
                    id: deviceId,
                },
            });
            if (!device) {
                return Promise.reject(new Error('DEVICE NOT FOUND'));
            }
            const dongle = await this.donglerepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!dongle) {
                return Promise.reject(new Error('DONGLE NOT FOUND'));
            }
            console.log('IT REACHED HERE');
            device.dongle = dongle;
            console.log('IT REACHED HERE');
            const newDevice = await this.devicerepository.save(device);
            console.log('this is the newdevice', newDevice);
            return newDevice;
        }
        catch (error) {
            console.log('there was an errror in alloting the dongle to the device', error);
            return { error: 'failed to allot the donlge to the device' };
        }
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "getAllDevice", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "saveDevice", null);
__decorate([
    (0, tsoa_1.Delete)('/{deviceId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "deleteDevice", null);
__decorate([
    (0, tsoa_1.Put)('allotDongle/{deviceId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeviceController.prototype, "allotDongleToDevice", null);
DeviceController = __decorate([
    (0, tsoa_1.Route)('/device'),
    (0, tsoa_1.Tags)('Device')
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=DeviceController.js.map