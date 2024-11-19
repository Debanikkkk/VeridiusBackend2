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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyPacket = void 0;
const typeorm_1 = require("typeorm");
let EmergencyPacket = class EmergencyPacket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "startCharacter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "packetHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "messageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "packetType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 14 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "gps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "latitudeDirection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "longitudeDirection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "altitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], EmergencyPacket.prototype, "distance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "vehicleRegNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "replyNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "checksum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], EmergencyPacket.prototype, "crc", void 0);
EmergencyPacket = __decorate([
    (0, typeorm_1.Entity)()
], EmergencyPacket);
exports.EmergencyPacket = EmergencyPacket;
//# sourceMappingURL=EmergencyPacket.js.map