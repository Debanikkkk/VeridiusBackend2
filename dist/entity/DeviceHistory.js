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
exports.DeviceHistory = void 0;
const typeorm_1 = require("typeorm");
let DeviceHistory = class DeviceHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DeviceHistory.prototype, "device_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], DeviceHistory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 17,
    }),
    __metadata("design:type", String)
], DeviceHistory.prototype, "mac_address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DeviceHistory.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], DeviceHistory.prototype, "dongle_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], DeviceHistory.prototype, "user_id", void 0);
DeviceHistory = __decorate([
    (0, typeorm_1.Entity)()
], DeviceHistory);
exports.DeviceHistory = DeviceHistory;
//# sourceMappingURL=DeviceHistory.js.map