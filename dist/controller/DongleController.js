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
exports.DongleController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Device_1 = require("../entity/Device");
const User_1 = require("../entity/User");
const Dongle_1 = require("../entity/Dongle");
const DongleHistory_1 = require("../entity/DongleHistory");
let DongleController = class DongleController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.donglerepository = data_source_1.AppDataSource.getRepository(Dongle_1.Dongle);
        this.devicerepository = data_source_1.AppDataSource.getRepository(Device_1.Device);
        this.userrepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.donglehistoryrepository = data_source_1.AppDataSource.getRepository(DongleHistory_1.DongleHistory);
    }
    /**
     * save dongle
     * @summary save dongle
     */
    async saveDongle(request) {
        try {
            const { name } = request;
            const dongleToSave = {
                name: name,
            };
            const dongleSaver = Object.assign(new Dongle_1.Dongle(), dongleToSave);
            const savedDongle = await this.donglerepository.save(dongleSaver);
            const resDongle = {
                id: savedDongle.id,
                name: savedDongle.name,
            };
            return resDongle;
        }
        catch (error) {
            console.log('there was an errror in saving the dongle', error);
            return { error: 'failed to save the dongle' };
        }
    }
    /**
     * get all dongle
     * @summary get all dongle
     */
    async getAllDongle() {
        try {
            const dongles = await this.donglerepository.find({
                relations: {
                    device: true,
                },
            });
            if (!dongles) {
                return Promise.reject(new Error('DONGLES WERE NOT FOUND'));
            }
            const dongleArr = [];
            for (const dongle of dongles) {
                const device = await this.devicerepository.findOne({
                    where: {
                        id: dongle.id,
                    },
                    relations: {
                        dongle: true,
                    },
                });
                const resDevice = {
                    // dongle: device?.dongle!,
                    id: device?.id,
                    mac_address: device?.mac_address,
                    name: device?.name,
                    // user: device?.,
                };
                dongleArr.push({
                    id: dongle.id,
                    name: dongle.name,
                    device: resDevice,
                });
            }
            return dongleArr;
        }
        catch (error) {
            console.log('there was an errror in getting all the dongles', error);
            return { error: 'failed to getting the dongles' };
        }
    }
    /**
     * get one dongle
     * @summary get one dongle
     */
    async getOneDongle(dongleId) {
        const dongle = await this.donglerepository
            .findOne({
            where: {
                id: dongleId,
            },
        })
            .then((dongle) => {
            if (!dongle) {
                return Promise.reject(new Error('DONGLE NOT FOUND'));
            }
            const device = this.devicerepository.findOne({
                where: {
                    dongle: {
                        id: dongle.id,
                    },
                },
            });
            if (!device) {
                return Promise.reject(new Error('THIS DEVICE WAS NOT FOUND FOR THE DONGLE'));
            }
            const resDongle = {
                // device: device,
                id: dongle.id,
                name: dongle.name,
            };
            return resDongle;
        }, () => {
            return { error: 'there was a problem in retrieving the dongle details' };
        });
        return dongle;
    }
    /**
     * delete dongle
     * @summary delete dongle
     */
    async deleteDongle(dongleId) {
        try {
            const dongleToDelete = await this.donglerepository.findOne({
                where: {
                    id: dongleId,
                },
            });
            const device = await this.devicerepository.findOne({
                where: {
                    id: dongleId,
                },
            });
            const user = await this.userrepository.findOne({
                where: {
                    id: device?.id,
                },
            });
            const dongleHistory = {
                device_id: device?.id,
                dongle_id: dongleToDelete?.id,
                name: dongleToDelete?.name,
                user_id: user?.id,
            };
            const saveDongleHistory = await this.donglehistoryrepository.save(dongleHistory);
            console.log(saveDongleHistory);
            if (dongleToDelete == null) {
                return Promise.reject(new Error('DONGLE IS NULL'));
            }
            await this.donglerepository.remove(dongleToDelete);
            return { result: 'DONGLE WAS DELETED SUCCESSFULLY' };
        }
        catch (error) {
            console.log('there was an errror in deleting the dongle', error);
            return { error: 'failed to delete the dongle' };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DongleController.prototype, "saveDongle", null);
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DongleController.prototype, "getAllDongle", null);
__decorate([
    (0, tsoa_1.Get)('/{dongleId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DongleController.prototype, "getOneDongle", null);
__decorate([
    (0, tsoa_1.Delete)('/{dongleId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DongleController.prototype, "deleteDongle", null);
DongleController = __decorate([
    (0, tsoa_1.Tags)('Dongle'),
    (0, tsoa_1.Route)('/dongle')
], DongleController);
exports.DongleController = DongleController;
//# sourceMappingURL=DongleController.js.map