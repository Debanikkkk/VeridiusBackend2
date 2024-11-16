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
exports.TrackingPacket = void 0;
const typeorm_1 = require("typeorm");
let TrackingPacket = class TrackingPacket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "startCharacter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "packetHeader", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "firmwareVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "packetType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "packetStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "imei", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "vehicleRegNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gpsFix", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 8 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 6 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "latitudeDir", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "longitudeDir", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "heading", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "noOfSatellites", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "altitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "pdop", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "hdop", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "networkOperatorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "ignitionStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "mainPowerStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "mainInputVoltage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "internalBatteryVoltage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "emergencyStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "tamperAlert", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gsmSignalStrength", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "mccServing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "mncServing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "lacServing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "cellIdServing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gsmSignalStrengthNmr1stNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "lacNmr1stNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "cellIdNmr1stNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gsmSignalStrengthNmr2ndNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "lacNmr2ndNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "cellIdNmr2ndNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gsmSignalStrengthNmr3rdNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "lacNmr3rdNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "cellIdNmr3rdNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "gsmSignalStrengthNmr4thNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "lacNmr4thNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "cellIdNmr4thNeighbour", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "digitalInputStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "digitalOutputStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "frameNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "analogInput1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "analogInput2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TrackingPacket.prototype, "deltaDistance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "otaResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "endCharacter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TrackingPacket.prototype, "checksum", void 0);
TrackingPacket = __decorate([
    (0, typeorm_1.Entity)()
], TrackingPacket);
exports.TrackingPacket = TrackingPacket;
//# sourceMappingURL=TrackingPacket.js.map