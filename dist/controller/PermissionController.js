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
exports.PermissionController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Permission_1 = require("../entity/Permission");
const Role_1 = require("../entity/Role");
const typeorm_1 = require("typeorm");
// import { In } from "typeorm";
let PermissionController = class PermissionController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.permissionrepository = data_source_1.AppDataSource.getRepository(Permission_1.Permission);
        this.rolerepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
    }
    /**
     * get all permissions
     * @summary get all permissions
     */
    async getAllPermissions() {
        try {
            const permissions = await this.permissionrepository.find();
            if (!permissions) {
                return Promise.reject(new Error('THERE WAS AN ERROR IN LOADING THE PERMISSIONS'));
            }
            const permissionArr = [];
            for (const permission of permissions) {
                if (!permission.type) {
                    return Promise.reject(new Error('permission type not found'));
                }
                permissionArr.push({
                    description: permission.description,
                    id: permission.id,
                    name: permission.name,
                    type: permission.type,
                });
            }
            return permissionArr;
        }
        catch (error) {
            console.log('there was an errror in fetching the permissions', error);
            return { error: 'failed to load the permissions' };
        }
    }
    /**
     * delete role
     * @summary delete role
     */
    async deletePermission(permissionId) {
        try {
            const permissiontodelete = await this.permissionrepository.findOne({
                where: {
                    id: permissionId,
                },
            });
            if (!permissiontodelete) {
                return Promise.reject(new Error('THE PERMISSION COULD NOT BE FOUND'));
            }
            await this.permissionrepository.remove(permissiontodelete);
            return { result: 'THE PERMISSION WAS DELETED SUCCESSFULLY' };
        }
        catch (error) {
            console.log('there was an errror in fetching the ', error);
            return { error: 'failed to load the ' };
        }
    }
    async savePermission(request) {
        try {
            const { description, name, role, type } = request;
            let db_role;
            if (role) {
                db_role = await this.rolerepository.find({
                    where: {
                        id: (0, typeorm_1.In)(role),
                    },
                });
            }
            if (!db_role) {
                return Promise.reject(new Error('ROLE NOT FOUND'));
            }
            console.log({ 'this is the role from the database': db_role });
            if (!db_role) {
                return Promise.reject(new Error('DB ROLE NOT FOUND'));
            }
            const permissionSaver = {
                name: name,
                description: description,
                role: Promise.resolve(db_role),
            };
            console.log({ 'this is the role permission i got': Promise.resolve(permissionSaver.role) });
            const permissiontosave = Object.assign(new Permission_1.Permission(), permissionSaver);
            const savedPermission = await this.permissionrepository.save(permissiontosave);
            if (!type) {
                return Promise.reject(new Error('PERM TYPE NOT FOUND'));
            }
            const resPermission = {
                description: savedPermission.description,
                id: savedPermission.id,
                name: savedPermission.name,
                roles: [],
                type: type,
            };
            savedPermission.role?.then((r) => {
                resPermission.roles = r.map((d) => {
                    return {
                        description: d.description,
                        id: d.id,
                        name: d.name,
                    };
                });
            });
            return resPermission;
        }
        catch (error) {
            console.log('there was an errror in saving the permission', error);
            return { error: 'failed to save the permission' };
        }
    }
    async getPermissionsOfUser(userId) {
        try {
            const permissions = await this.permissionrepository.find({
                where: {
                    role: {
                        users: {
                            id: userId,
                        },
                    },
                },
                relations: {
                    role: true,
                },
            });
            const permissionArr = [];
            for (const permission of permissions) {
                permissionArr.push({
                    type: permission.type,
                    description: permission.description,
                    id: permission.id,
                    name: permission.name,
                });
            }
            return permissionArr;
        }
        catch (error) {
            console.log('there was an errror in fetching the permissions for the user', userId, error);
            return { error: 'failed to load the permissions for the user' };
        }
    }
};
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getAllPermissions", null);
__decorate([
    (0, tsoa_1.Delete)('/{permissionId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "deletePermission", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "savePermission", null);
__decorate([
    (0, tsoa_1.Get)('getUserPerms/{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getPermissionsOfUser", null);
PermissionController = __decorate([
    (0, tsoa_1.Tags)('Permission'),
    (0, tsoa_1.Route)('/permission')
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=PermissionController.js.map