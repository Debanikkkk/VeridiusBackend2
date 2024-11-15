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
exports.Dongle = void 0;
const typeorm_1 = require("typeorm");
const Device_1 = require("./Device");
let Dongle = class Dongle {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Dongle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], Dongle.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Device_1.Device, (device) => {
        device.dongle;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    __metadata("design:type", Object)
], Dongle.prototype, "device", void 0);
Dongle = __decorate([
    (0, typeorm_1.Entity)()
], Dongle);
exports.Dongle = Dongle;
//# sourceMappingURL=Dongle.js.map