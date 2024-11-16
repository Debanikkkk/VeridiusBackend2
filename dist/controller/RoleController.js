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
exports.RoleController = void 0;
const tsoa_1 = require("tsoa");
const Role_1 = require("../entity/Role");
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
const Permission_1 = require("../entity/Permission");
let RoleController = class RoleController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.rolerepository = data_source_1.AppDataSource.getRepository(Role_1.Role);
        this.permissionrepository = data_source_1.AppDataSource.getRepository(Permission_1.Permission);
    }
    async getOneRole(roleId) {
        try {
            const role = await this.rolerepository.findOne({
                where: {
                    id: roleId,
                },
            });
            if (!role) {
                return Promise.reject(new Error('ROLE CANNOT BE FOUND'));
            }
            const resRole = {
                description: role.description,
                id: role.id,
                name: role.name,
            };
            return resRole;
        }
        catch (error) {
            console.log('there was an errror in fetching the role', error);
            return { error: 'failed to load the role' };
        }
    }
    /**
     * get all the roles
     * @summary get all the roles
     */
    async getAllRole() {
        try {
            const roles = await this.rolerepository.find();
            const roleArr = [];
            for (const role of roles) {
                roleArr.push({
                    description: role.description,
                    id: role.id,
                    name: role.name,
                });
            }
            return roleArr;
        }
        catch (error) {
            console.log('there was an errror in fetching the ', error);
            return { error: 'failed to load the ' };
        }
    }
    async deleteRole(roleId) {
        try {
            const roletodelete = await this.rolerepository.findOne({
                where: {
                    id: roleId,
                },
            });
            if (!roletodelete) {
                return Promise.reject(new Error('ROLE CANNOT BE FOUND'));
            }
            await this.rolerepository.remove(roletodelete);
            return { result: 'THE ROLE WAS DELETED SUCCESSFULLY' };
        }
        catch (error) {
            console.log('there was an errror in delete the role', error);
            return { error: 'failed to delete the role ' };
        }
    }
    /**
     * save role
     * @summary save role
     */
    async saveRole(request) {
        try {
            const { name, description } = request;
            const roleToSave = {
                description: description,
                name: name,
            };
            const roleSaver = Object.assign(new Role_1.Role(), roleToSave);
            const savedRole = await this.rolerepository.save(roleSaver);
            const roleArr = [];
            roleArr.push(savedRole);
            const permissionToSaveManage = {
                name: 'manage' + name,
                description: 'management permissions of ' + name,
                role: Promise.resolve(roleArr),
                type: Permission_1.permType.user,
            };
            const permissionToSaveView = {
                name: 'view' + name,
                description: 'view related permissions of ' + name,
                role: Promise.resolve(roleArr),
                type: Permission_1.permType.user,
            };
            await this.permissionrepository.save(permissionToSaveManage);
            await this.permissionrepository.save(permissionToSaveView);
            const resRole = {
                description,
                id: savedRole.id,
                name: savedRole.name,
            };
            return resRole;
        }
        catch (error) {
            console.log('there was an errror in saving the role', error);
            return { error: 'failed to save the role' };
        }
    }
    /**
     * allot permissions to a role
     * @summary allot permissions to a role
     */
    async givePermissionToRole(request) {
        try {
            const { role, permissions } = request;
            const db_role = await this.rolerepository.findOne({
                where: {
                    id: role,
                },
            });
            if (!db_role) {
                return Promise.reject(new Error('ROLE NOT FOUND'));
            }
            let db_permission;
            if (permissions) {
                db_permission = await this.permissionrepository.find({
                    where: {
                        id: (0, typeorm_1.In)(permissions),
                    },
                });
            }
            if (!db_permission) {
                return Promise.reject(new Error('PERMISSION NOT FOUND'));
            }
            db_role.permissions = Promise.resolve(db_permission);
            const updatedRole = await this.rolerepository.save(db_role);
            const rPerm = updatedRole.permissions;
            const resRole = {
                role: {
                    id: updatedRole.id,
                    name: updatedRole.name,
                    description: updatedRole.description,
                },
                permissions: (await rPerm)?.map((permission) => ({
                    description: permission.description,
                    id: permission.id,
                    name: permission.name,
                    type: permission.type,
                })),
            };
            return resRole;
        }
        catch (error) {
            console.log('there was an errror in setting the permissions to the given role ', error);
            return { error: 'failed to set the permissions to the role' };
        }
    }
    /**
     * update role API
     * @summary UPDATE ROLE
     */
    async updateRole(req, roleId) {
        const { description, name } = req;
        const role = await this.rolerepository.findOne({
            where: {
                id: roleId,
            },
        });
        if (!role) {
            return Promise.reject(new Error('ROLE NOT FOUND'));
        }
        (role.description = description), (role.name = name);
        const updatedRole = await this.rolerepository.save(role);
        const resUpdatedRole = {
            description: updatedRole.description,
            id: updatedRole.id,
            name: updatedRole.name,
        };
        return resUpdatedRole;
    }
    /**
     * getting permissions from subrole
     *  @summary getting permissions from subrole
     */
    async getPermissionsFromRole(request) {
        try {
            const { id } = request;
            const ogperms = await this.permissionrepository.find({
                where: {
                    role: {
                        id: id,
                    },
                },
            });
            if (!ogperms) {
                return Promise.reject(new Error('OG PERMS NOT FOUND '));
            }
            const permissionsArr = [];
            for (const ogperm of ogperms) {
                permissionsArr.push(ogperm);
            }
            return permissionsArr;
        }
        catch (error) {
            console.log('there was an errror in fetching the permissions from the role');
            return { error: 'failed to load the permissions from the role' };
        }
    }
};
__decorate([
    (0, tsoa_1.Get)('/{roleId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getOneRole", null);
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRole", null);
__decorate([
    (0, tsoa_1.Delete)('/{roleId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRole", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "saveRole", null);
__decorate([
    (0, tsoa_1.Put)('/setPermissions'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "givePermissionToRole", null);
__decorate([
    (0, tsoa_1.Put)('/{roleId}'),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateRole", null);
__decorate([
    (0, tsoa_1.Post)('/getPermissionFromRole'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getPermissionsFromRole", null);
RoleController = __decorate([
    (0, tsoa_1.Tags)('Role'),
    (0, tsoa_1.Route)('/role')
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=RoleController.js.map