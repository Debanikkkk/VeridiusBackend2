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
exports.LoginPacketController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const LoginPacket_1 = require("../entity/LoginPacket");
let LoginPacketController = class LoginPacketController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.loginpacketrepository = data_source_1.AppDataSource.getRepository(LoginPacket_1.LoginPacket);
    }
    async saveLoginPacket(req) {
        const { checksum, deviceType, firmwareVersion, imei, latitude, longitude, packetHeader, protocolVersion, vehicleRegNo, vendorId } = req;
        const loginpack = {
            checksum: checksum,
            device_type: deviceType,
            firmwareVersion: firmwareVersion,
            imei: imei,
            latitude: latitude,
            longitude: longitude,
            packetHeader: packetHeader,
            protocolVersion: protocolVersion,
            vehicleRegNo: vehicleRegNo,
            vendorId: vendorId,
        };
        const loginPacketToSave = Object.assign(new LoginPacket_1.LoginPacket(), loginpack);
        const savedLoginPacket = await this.loginpacketrepository.save(loginPacketToSave);
        return savedLoginPacket;
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginPacketController.prototype, "saveLoginPacket", null);
LoginPacketController = __decorate([
    (0, tsoa_1.Tags)('Login Packet'),
    (0, tsoa_1.Route)('/loginpacket')
], LoginPacketController);
exports.LoginPacketController = LoginPacketController;
//# sourceMappingURL=LoginPacketController.js.map