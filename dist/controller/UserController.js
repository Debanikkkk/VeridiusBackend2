"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const envVars_1 = require("../utils/envVars");
const jwt = __importStar(require("jsonwebtoken"));
const Role_1 = require("../entity/Role");
const Device_1 = require("../entity/Device");
// import { serviceTicketStatus } from "../entity/ServiceTickets";
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userrepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.devicerepository = data_source_1.AppDataSource.getRepository(Device_1.Device);
        this.rolerepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
    }
    async saveUser(req) {
        try {
            const { address, email, password, name, phone_number, role } = req;
            const db_role = await this.rolerepository.findOne({
                where: {
                    id: role,
                },
            });
            if (!db_role) {
                return Promise.reject(new Error('PLEASE INSERT ROLE'));
            }
            const userToSave = {
                password: password,
                address: address,
                email: email,
                name: name,
                phone_number: phone_number,
                role: Promise.resolve(db_role),
            };
            const userSaver = Object.assign(new User_1.User(), userToSave);
            const savedUser = await this.userrepository.save(userSaver);
            const resUser = {
                id: savedUser.id,
                address: savedUser.address,
                email: savedUser.email,
                name: savedUser.name,
                phone_number: savedUser.phone_number,
                password: savedUser.password,
            };
            return resUser;
        }
        catch (error) {
            console.log('there was an errror in saving the user', error);
            return { error: 'failed to save the user' };
        }
    }
    /**
     * user login
     * @summary user login
     */
    async userLogin(loginBody) {
        try {
            console.log({ MESSAGE: 'THIS API WAS FIRED' });
            const { username, password } = loginBody;
            console.log('api reached here');
            const users = await this.userrepository.find({
                where: {
                    name: username,
                    password: password,
                },
                relations: {
                    role: {
                        permissions: true,
                    },
                },
            });
            console.log('api found everything just check', users);
            if (!users || users.length == 0) {
                return Promise.reject(new Error('Invalid credentials'));
            }
            const user = users[0];
            // if (!user.oem) {
            //   return Promise.reject(new Error('OEM Not found'));
            // }
            if (!user.role) {
                return Promise.reject(new Error('Role Not found'));
            }
            const perm_result = (await user.role).permissions;
            const permissions = (await perm_result).map((item) => ({
                id: item.id,
                perm_name: item.name,
                description: item.description,
                type: item.type,
            }));
            console.log('here are the permissions', permissions);
            const loginUser = {
                //   name: (user.first_name ? user.first_name : '') + ' ' + (user.last_name ? user.last_name : ''),
                name: user.name,
                role: {
                    id: (await user.role).id,
                    role_name: (await user.role).name,
                    role_description: (await user.role).description,
                },
                permissions: permissions,
            };
            const tokenData = {
                id: user.id,
                //   pincode: user.pincode,
                role: {
                    permissions: (await perm_result).map((p) => {
                        return p.name;
                    }),
                },
            };
            // let jsonWebtoken
            const jsonWebtoken = jwt.sign(tokenData, envVars_1.envs.JWT_SECRET_KEY, { expiresIn: '7d' });
            loginUser.token = jsonWebtoken;
            return loginUser;
        }
        catch (error) {
            console.log('there was an errror in logging in ', error);
            return { error: 'failed to login' };
        }
    }
    async deleteUser(userId) {
        const usertodelete = await this.userrepository.findOne({
            where: {
                id: userId,
            },
        });
        if (!usertodelete) {
            return Promise.reject(new Error('USER NOT FOUND'));
        }
        await this.userrepository.remove(usertodelete);
        return { result: 'ROLE DELETED SUCCESSFULLY' };
    }
    async assignUserDevice(userId, request) {
        try {
            const user = await this.userrepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return Promise.reject(new Error('USER NOT FOUND'));
            }
            console.log('user found is ', user);
            const { id } = request;
            const device = await this.devicerepository.findOne({
                where: {
                    id: id,
                },
            });
            if (!device) {
                return Promise.reject(new Error('DEVICE NOT FOUND'));
            }
            user.device = device;
            const newUser = await this.userrepository.save(user);
            console.log('THE USER DEVICE IS', user.device);
            return newUser;
        }
        catch (error) {
            console.log('there was an errror in assigning the device to the user', error);
            return { error: 'failed to assign te device to the user' };
        }
    }
    async getUsersPagination(page, pageSize) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        // Mock data for illustration purposes
        const allUsers = await this.userrepository.find();
        const paginatedUsers = allUsers.slice(offset, offset + limit);
        return {
            items: paginatedUsers,
            totalCount: allUsers.length,
        };
        // Replace with actual DB call, for example with TypeORM or Sequelize
    }
    // SGDct1l
    /**
     * Get all users with pagination
     * @param page The page number (default: 1)
     * @param pageSize The number of users per page (default: 10)
     * @returns A paginated list of users
     */
    async getUsers(page = 1, pageSize = 10) {
        const users = await this.getUsersPagination(page, pageSize);
        return {
            items: users.items,
            totalCount: users.totalCount,
            page,
            pageSize,
        };
    }
    async getOneUser(userId) {
        const user = await this.userrepository
            .findOne({
            where: {
                id: userId,
            },
            relations: {
                service_ticket: true,
                device: true,
                role: true,
            },
        })
            .then(async (user) => {
            if (!user) {
                return Promise.reject(new Error('THERE WAS A PROBLEM IN FINDING THE USER'));
            }
            const serviceTicket = user.service_ticket;
            const device = user.device;
            const role = await this.rolerepository.findOne({
                where: {
                    users: {
                        id: userId,
                    },
                },
            });
            const resUser = {
                address: user.address,
                email: user.email,
                id: user.id,
                name: user.name,
                password: user.password,
                phone_number: user.phone_number,
                device: {
                    id: device?.id,
                    mac_address: device?.mac_address,
                    name: device?.name,
                },
                role: {
                    description: role?.description,
                    id: role?.id,
                    name: role?.name,
                },
                service_ticket: {
                    // date: serviceTicket.,
                    id: (await serviceTicket)?.id,
                    // service_ticket_number,
                    // status
                    // serviceTicketStatus
                },
            };
            return resUser;
        }, () => {
            return { error: 'THERE WAS AN ERROR IN LOADING THE USER' };
        });
        return user;
    }
    async updateUser(userId, request) {
        const existingUser = await this.userrepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                device: true,
                role: true,
                service_ticket: true,
            },
        });
        if (!existingUser) {
            return Promise.reject(new Error('THERE WAS A PROBLEM IN FETCHING THIS USER'));
        }
        const { address, device, email, name, password, phone_number, role } = request;
        const db_device = await this.devicerepository.findOne({
            where: {
                id: device,
            },
        });
        if (!db_device) {
            return Promise.reject(new Error('DB DEVICE NOT FOUND'));
        }
        const db_role = await this.rolerepository.findOne({
            where: {
                id: role,
            },
        });
        if (!db_role) {
            return Promise.reject(new Error('DB ROLE NOT FOUND'));
        }
        existingUser.address = address;
        existingUser.device = db_device;
        existingUser.email = email;
        existingUser.name = name;
        existingUser.password = password;
        existingUser.phone_number = phone_number;
        existingUser.role = Promise.resolve(db_role);
        const savedUser = await this.userrepository.save(existingUser);
        const resUser = {
            address: savedUser.address,
            device: {
                // dongle: db_device.,
                id: db_device.id,
                mac_address: db_device.mac_address,
                name: db_device.name,
                // user: db_device.user
            },
            email: savedUser.email,
            id: savedUser.id,
            name: savedUser.name,
            password: savedUser.password,
            phone_number: savedUser.phone_number,
            role: {
                description: db_role.description,
                id: db_role.id,
                name: db_role.name,
            },
            // service_ticket: savedUser.service_ticket,
        };
        return resUser;
        // existingUser.service_ticket=service_ticket
    }
};
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveUser", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
__decorate([
    (0, tsoa_1.Delete)('/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Put)('userDeviceAllot/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "assignUserDevice", null);
__decorate([
    (0, tsoa_1.Get)('/'),
    __param(0, (0, tsoa_1.Query)('page')),
    __param(1, (0, tsoa_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)('/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, tsoa_1.Put)('/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, tsoa_1.Tags)('User'),
    (0, tsoa_1.Route)('/user')
], UserController);
exports.UserController = UserController;
// export class ItemService {
//   public async getItems(page: number = 1, limit: number = 10): Promise<{ data: Item[], page: number, limit: number, total: number, totalPages: number }> {
//     const itemRepository = getRepository(Item);
//     const [items, total] = await itemRepository.findAndCount({
//       take: limit,
//       skip: (page - 1) * limit,
//     });
//     const totalPages = Math.ceil(total / limit);
//     return {
//       data: items,
//       page,
//       limit,
//       total,
//       totalPages
//     };
//   }
// }
//# sourceMappingURL=UserController.js.map