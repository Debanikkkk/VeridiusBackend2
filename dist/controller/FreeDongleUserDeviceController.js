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
exports.FreeDongleUserDeviceController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Dongle_1 = require("../entity/Dongle");
const Device_1 = require("../entity/Device");
const User_1 = require("../entity/User");
const DeviceHistory_1 = require("../entity/DeviceHistory");
let FreeDongleUserDeviceController = class FreeDongleUserDeviceController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.donglerepository = data_source_1.AppDataSource.getRepository(Dongle_1.Dongle);
        this.devicerepository = data_source_1.AppDataSource.getRepository(Device_1.Device);
        this.userrepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.devicehistoryrepository = data_source_1.AppDataSource.getRepository(DeviceHistory_1.DeviceHistory);
    }
    /**
     * FREE THE DONGLE-DEVICE-USER CONNECTION
     *  @summary FREE THE DONGLE-DEVICE-USER CONNECTION
     */
    async freeTheDongle(req, userId) {
        // const {}=req
        try {
            const user = await this.userrepository.findOne({
                where: {
                    id: userId,
                },
                // relations:{
                //     // dongle: true,
                //     user: true
                // }
            });
            if (!user) {
                return Promise.reject(new Error('USER NOT FOUND'));
            }
            // console.log("the user foudn linked to the device", device?.user)
            // console.log("the dongle foudn linked to the user", device?.dongle)
            const device = await this.devicerepository.findOne({
                where: {
                    id: user.device?.id,
                },
                relations: {
                    dongle: true,
                },
            });
            if (!user) {
                return Promise.resolve('USER NOT FOUND');
            }
            console.log('this is the device from the db from user relation', device);
            if (!device) {
                return Promise.reject(new Error('DONGLE NOT FOUND'));
            }
            const deviceHistory = {
                device_id: device.id,
                dongle_id: device.dongle?.id,
                mac_address: device.mac_address,
                name: device.name,
                user_id: req.user.id,
            };
            const devicehistorySaver = Object.assign(new DeviceHistory_1.DeviceHistory(), deviceHistory);
            const savedDeviceHistory = await this.devicehistoryrepository.save(devicehistorySaver);
            console.log(savedDeviceHistory);
            console.log('this is the user found in the device', device.user);
            device.dongle = null;
            await this.devicerepository.save(device);
            user.device = null;
            await this.userrepository.save(user);
            return 'success';
        }
        catch (error) {
            console.log('there was an errror in freeing the user-device-dongle', error);
            return { error: 'failed to free the user-device-dongle ' };
        }
    }
};
__decorate([
    (0, tsoa_1.Put)('freeDongle/{userId}'),
    (0, tsoa_1.Security)('Api-Token', []),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FreeDongleUserDeviceController.prototype, "freeTheDongle", null);
FreeDongleUserDeviceController = __decorate([
    (0, tsoa_1.Tags)('FREE DONGLE'),
    (0, tsoa_1.Route)('/user')
], FreeDongleUserDeviceController);
exports.FreeDongleUserDeviceController = FreeDongleUserDeviceController;
//# sourceMappingURL=FreeDongleUserDeviceController.js.map