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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Device_1 = require("./Device");
const Role_1 = require("./Role");
const ServiceTickets_1 = require("./ServiceTickets");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 16,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 64,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Device_1.Device, (device) => {
        device.user;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", Object)
], User.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (role) => {
        role.users;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'role_id',
    }),
    __metadata("design:type", Promise)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ServiceTickets_1.ServiceTicket, (service_ticket) => {
        service_ticket.technician;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
    // @JoinColumn({name: 'service_ticket_id'})
    ,
    __metadata("design:type", Promise)
], User.prototype, "service_ticket", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map