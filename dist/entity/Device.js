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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Dongle_1 = require("./Dongle");
let Device = class Device {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 17,
    }),
    __metadata("design:type", String)
], Device.prototype, "mac_address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => {
        user.device;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
    // @JoinColumn({name: 'user_id'})
    ,
    __metadata("design:type", Object)
], Device.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Dongle_1.Dongle, (dongle) => {
        dongle.device;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'dongle_id' }),
    __metadata("design:type", Object)
], Device.prototype, "dongle", void 0);
Device = __decorate([
    (0, typeorm_1.Entity)()
], Device);
exports.Device = Device;
//# sourceMappingURL=Device.js.map