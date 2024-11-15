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
exports.ServiceTicketController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const ServiceTickets_1 = require("../entity/ServiceTickets");
const User_1 = require("../entity/User");
function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
let ServiceTicketController = class ServiceTicketController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.serviceticketrepository = data_source_1.AppDataSource.getRepository(ServiceTickets_1.ServiceTicket);
        this.userrepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async getAllServiceTickets() {
        try {
            const servicetickets = await this.serviceticketrepository.find({
                relations: {
                    technician: true,
                },
            });
            if (!servicetickets) {
                return Promise.reject(new Error('THE SERVICE TICKETS COULD NOT BE FOUND'));
            }
            const serviceTicketArr = [];
            for (const serviceticket of servicetickets) {
                const technincian = serviceticket.technician;
                serviceTicketArr.push({
                    date: serviceticket.date,
                    id: serviceticket.id,
                    service_ticket_number: serviceticket.service_ticket_number,
                    status: serviceticket.status,
                    technician: {
                        id: (await technincian)?.id,
                    },
                });
            }
            return serviceTicketArr;
        }
        catch (error) {
            console.log('there was an errror in fetching the service tickets', error);
            return { error: 'failed to load the service tickets' };
        }
    }
    /**
     * generates service ticket
     * @summary generates service ticket
     */
    async saveServiceTicket(req) {
        try {
            const serviceTicketNumber = generateRandomString(16);
            const user = await this.userrepository.findOne({
                where: {
                    id: req.user.id,
                },
            });
            if (!user) {
                return Promise.reject(new Error('USER NOT FODUN '));
            }
            const serviceTicketToSave = {
                // date:,
                // id,
                service_ticket_number: serviceTicketNumber,
                status: ServiceTickets_1.serviceTicketStatus.new,
                technician: Promise.resolve(user),
            };
            const stSaver = Object.assign(new ServiceTickets_1.ServiceTicket(), serviceTicketToSave);
            const savedSt = await this.serviceticketrepository.save(stSaver);
            const technician = savedSt.technician;
            const resServiceTicket = {
                date: savedSt.date,
                id: savedSt.id,
                service_ticket_number: savedSt.service_ticket_number,
                status: savedSt.status,
                technician: {
                    address: (await technician)?.address,
                    // device,
                    email: (await technician)?.email,
                    id: (await technician)?.id,
                    name: (await technician)?.name,
                    password: (await technician)?.password,
                    phone_number: (await technician)?.phone_number,
                    // role,
                    // service_ticket
                },
            };
            return resServiceTicket;
        }
        catch (error) {
            console.log('there was an errror in saving the service ticket ', error);
            return { error: 'failed to save the service ticket ' };
        }
    }
    /**
     * UPDATE SERVICE TICKET STATUS
     * @summary UPDATE SERVICE TICKET STATUS
     */
    async updateServiceTicketStatus(serviceTicketId, request) {
        try {
            const { status } = request;
            const currentSt = await this.serviceticketrepository.findOne({
                where: {
                    id: serviceTicketId,
                },
            });
            if (!currentSt) {
                return Promise.reject(new Error('SERVICE TICEKR WAS NOT FOUND'));
            }
            currentSt.status = status;
            const newST = Object.assign(new ServiceTickets_1.ServiceTicket(), currentSt);
            const updatedST = await this.serviceticketrepository.save(newST);
            return updatedST;
        }
        catch (error) {
            console.log('there was an errror in updating the service ticket status', error);
            return { error: 'failed to update the service ticet status' };
        }
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceTicketController.prototype, "getAllServiceTickets", null);
__decorate([
    (0, tsoa_1.Post)(),
    (0, tsoa_1.Security)('Api-Token', []),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceTicketController.prototype, "saveServiceTicket", null);
__decorate([
    (0, tsoa_1.Put)('/{serviceTicketId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServiceTicketController.prototype, "updateServiceTicketStatus", null);
ServiceTicketController = __decorate([
    (0, tsoa_1.Tags)('Service Ticket'),
    (0, tsoa_1.Route)('/serviceTicket')
], ServiceTicketController);
exports.ServiceTicketController = ServiceTicketController;
//# sourceMappingURL=ServiceTikcetController.js.map