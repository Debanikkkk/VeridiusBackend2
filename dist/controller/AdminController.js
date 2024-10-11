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
exports.AdminController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
// import { Admin } from "typeorm";
const Admin_1 = require("../entity/Admin");
const encfunc_1 = require("../encFunction/encfunc");
// import * as crypto from 'crypto'
let AdminController = class AdminController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.adminrepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
    }
    async adminLogin(req) {
        const { name, password } = req;
        const encryptionKey = Buffer.from('39fbfe4d32320e4742ebdb9e9e28239136885b060de9261d2ee6388ac307c770', 'hex');
        const fixedIV = Buffer.from('00000000000000000000000000000000', 'hex');
        if (!password) {
            return Promise.reject(new Error('PASSWORD NOT GIVEN'));
        }
        const encryptedPassword = (0, encfunc_1.encryptMessageFixedIV)(password, encryptionKey, fixedIV);
        console.log("final encrypted password", encryptedPassword);
        const user = await this.adminrepository.findOne({
            where: {
                name: name,
                password: encryptedPassword
            }
        });
        if (!user) {
            // this.setStatus()
            return { error: 'USER NOT FOUND, THERE MIGHT BE SPELLING ERRORS IN YOUR CREDENTIALS' };
        }
        return { result: 'USER IS SUCCESSFULLY LOGGED IN' };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminLogin", null);
exports.AdminController = AdminController = __decorate([
    (0, tsoa_1.Tags)('Admin'),
    (0, tsoa_1.Route)('/admin')
], AdminController);
//# sourceMappingURL=AdminController.js.map