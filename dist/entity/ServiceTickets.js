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
exports.ServiceTicket = exports.serviceTicketStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var serviceTicketStatus;
(function (serviceTicketStatus) {
    serviceTicketStatus["open"] = "open";
    serviceTicketStatus["closed"] = "closed";
    serviceTicketStatus["new"] = "new";
})(serviceTicketStatus = exports.serviceTicketStatus || (exports.serviceTicketStatus = {}));
let ServiceTicket = class ServiceTicket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceTicket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ServiceTicket.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'createdAt',
    }),
    __metadata("design:type", Date)
], ServiceTicket.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
    }),
    __metadata("design:type", Date)
], ServiceTicket.prototype, "updated_on", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: serviceTicketStatus,
        default: serviceTicketStatus.new,
    }),
    __metadata("design:type", String)
], ServiceTicket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 17,
    }),
    __metadata("design:type", String)
], ServiceTicket.prototype, "service_ticket_number", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => {
        user.service_ticket;
    }, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'technician_id' }),
    __metadata("design:type", Promise)
], ServiceTicket.prototype, "technician", void 0);
ServiceTicket = __decorate([
    (0, typeorm_1.Entity)()
], ServiceTicket);
exports.ServiceTicket = ServiceTicket;
//# sourceMappingURL=ServiceTickets.js.map