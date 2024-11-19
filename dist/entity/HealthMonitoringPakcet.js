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
exports.HealthMonitoringPacket = void 0;
const typeorm_1 = require("typeorm");
let HealthMonitoringPacket = class HealthMonitoringPacket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "startCharacter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "header", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "firmwareVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "imei", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "batteryPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "lowBatteryThresholdPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "memoryPercentage1", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "memoryPercentage2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "dataUpdateRateWhenIgnitionOn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "dataUpdateRateWhenIgnitionOff", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "digitalInputStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "analogInput1Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], HealthMonitoringPacket.prototype, "analogInput2Status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 1 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "endCharacter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], HealthMonitoringPacket.prototype, "checksum", void 0);
HealthMonitoringPacket = __decorate([
    (0, typeorm_1.Entity)()
], HealthMonitoringPacket);
exports.HealthMonitoringPacket = HealthMonitoringPacket;
//# sourceMappingURL=HealthMonitoringPakcet.js.map