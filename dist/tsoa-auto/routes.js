"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UserController_1 = require("./../controller/UserController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ServiceTikcetController_1 = require("./../controller/ServiceTikcetController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const RoleController_1 = require("./../controller/RoleController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PermissionController_1 = require("./../controller/PermissionController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LoginPacketController_1 = require("./../controller/LoginPacketController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const FreeDongleUserDeviceController_1 = require("./../controller/FreeDongleUserDeviceController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const DongleController_1 = require("./../controller/DongleController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const DeviceController_1 = require("./../controller/DeviceController");
const authentication_1 = require("./../authentication");
const expressAuthenticationRecasted = authentication_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ResRole": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "description": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "serviceTicketStatus": {
        "dataType": "refEnum",
        "enums": ["open", "closed", "new"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUser": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "address": { "dataType": "string" },
            "password": { "dataType": "string" },
            "email": { "dataType": "string" },
            "phone_number": { "dataType": "string" },
            "role": { "ref": "ResRole" },
            "service_ticket": { "ref": "ResServiceTicket" },
            "device": { "ref": "ResDevice" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResServiceTicket": {
        "dataType": "refObject",
        "properties": {
            "date": { "dataType": "datetime" },
            "id": { "dataType": "double" },
            "service_ticket_number": { "dataType": "string" },
            "status": { "ref": "serviceTicketStatus" },
            "technician": { "ref": "ResUser" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResDevice": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "mac_address": { "dataType": "string" },
            "name": { "dataType": "string" },
            "user": { "ref": "ResUser" },
            "dongle": { "dataType": "union", "subSchemas": [{ "ref": "ResDongle" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResDongle": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "device": { "ref": "ResDevice" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResError": {
        "dataType": "refObject",
        "properties": {
            "error": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUser": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "password": { "dataType": "string" },
            "address": { "dataType": "string" },
            "email": { "dataType": "string" },
            "phone_number": { "dataType": "string" },
            "role": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "permType": {
        "dataType": "refEnum",
        "enums": ["user", "product"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResPermission": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "description": { "dataType": "string" },
            "type": { "ref": "permType", "required": true },
            "name": { "dataType": "string" },
            "roles": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResRole" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRole": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "role_name": { "dataType": "string", "required": true },
            "role_description": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserLogin": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "permissions": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResPermission" } },
            "role": { "ref": "UserLoginRole", "required": true },
            "token": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUserLogin": {
        "dataType": "refObject",
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSuccess": {
        "dataType": "refObject",
        "properties": {
            "result": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "password": { "dataType": "string" },
            "address": { "dataType": "string" },
            "phone_number": { "dataType": "string" },
            "email": { "dataType": "string" },
            "device": { "dataType": "union", "subSchemas": [{ "ref": "Device" }, { "dataType": "enum", "enums": [null] }] },
            "role": { "ref": "Role" },
            "service_ticket": { "ref": "ServiceTicket" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Device": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "mac_address": { "dataType": "string" },
            "imei": { "dataType": "string" },
            "user": { "dataType": "union", "subSchemas": [{ "ref": "User" }, { "dataType": "enum", "enums": [null] }] },
            "dongle": { "dataType": "union", "subSchemas": [{ "ref": "Dongle" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dongle": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "device": { "dataType": "union", "subSchemas": [{ "ref": "Device" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "description": { "dataType": "string" },
            "permissions": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Permission" } },
            "users": { "dataType": "array", "array": { "dataType": "refObject", "ref": "User" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "description": { "dataType": "string" },
            "type": { "ref": "permType" },
            "role": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Role" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceTicket": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "date": { "dataType": "datetime" },
            "created_on": { "dataType": "datetime" },
            "updated_on": { "dataType": "datetime" },
            "status": { "ref": "serviceTicketStatus" },
            "service_ticket_number": { "dataType": "string" },
            "technician": { "ref": "User" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDeviceAssign": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedResponse_User_": {
        "dataType": "refObject",
        "properties": {
            "items": { "dataType": "array", "array": { "dataType": "refObject", "ref": "User" }, "required": true },
            "totalCount": { "dataType": "double", "required": true },
            "page": { "dataType": "double", "required": true },
            "pageSize": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserUpdate": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "address": { "dataType": "string" },
            "password": { "dataType": "string" },
            "email": { "dataType": "string" },
            "phone_number": { "dataType": "string" },
            "role": { "dataType": "double" },
            "device": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqSTstatus": {
        "dataType": "refObject",
        "properties": {
            "status": { "ref": "serviceTicketStatus", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqRole": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "description": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetSetPermisisons": {
        "dataType": "refObject",
        "properties": {
            "role": { "ref": "ResRole" },
            "permissions": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResPermission" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetPermisisons": {
        "dataType": "refObject",
        "properties": {
            "role": { "dataType": "double" },
            "permissions": { "dataType": "array", "array": { "dataType": "double" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqRoleBody": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqPermission": {
        "dataType": "refObject",
        "properties": {
            "description": { "dataType": "string" },
            "type": { "ref": "permType" },
            "name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginPacket": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "packetHeader": { "dataType": "string" },
            "vendorId": { "dataType": "string" },
            "vehicleRegNo": { "dataType": "string" },
            "imei": { "dataType": "string" },
            "firmwareVersion": { "dataType": "string" },
            "protocolVersion": { "dataType": "string" },
            "device_type": { "dataType": "string" },
            "latitude": { "dataType": "double" },
            "longitude": { "dataType": "double" },
            "checksum": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqLoginPacket": {
        "dataType": "refObject",
        "properties": {
            "checksum": { "dataType": "string", "required": true },
            "firmwareVersion": { "dataType": "string", "required": true },
            "imei": { "dataType": "string", "required": true },
            "latitude": { "dataType": "double", "required": true },
            "longitude": { "dataType": "double", "required": true },
            "packetHeader": { "dataType": "string", "required": true },
            "protocolVersion": { "dataType": "string", "required": true },
            "vehicleRegNo": { "dataType": "string", "required": true },
            "vendorId": { "dataType": "string", "required": true },
            "deviceType": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDongle": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDevice": {
        "dataType": "refObject",
        "properties": {
            "mac_address": { "dataType": "string" },
            "name": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDongleAllot": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/user', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.saveUser)), async function UserController_saveUser(request, response, next) {
        const args = {
            req: { "in": "body", "name": "req", "required": true, "ref": "ReqUser" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'saveUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/user/login', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.userLogin)), async function UserController_userLogin(request, response, next) {
        const args = {
            loginBody: { "in": "body", "name": "loginBody", "required": true, "ref": "ReqUserLogin" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'userLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/user/:userId', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.deleteUser)), async function UserController_deleteUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/user/userDeviceAllot/:userId', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.assignUserDevice)), async function UserController_assignUserDevice(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqDeviceAssign" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'assignUserDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.getUsers)), async function UserController_getUsers(request, response, next) {
        const args = {
            page: { "default": 1, "in": "query", "name": "page", "dataType": "double" },
            pageSize: { "default": 10, "in": "query", "name": "pageSize", "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/user/:userId', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.getOneUser)), async function UserController_getOneUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'getOneUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/user/:userId', ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(UserController_1.UserController.prototype.updateUser)), async function UserController_updateUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ResUserUpdate" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new UserController_1.UserController();
            await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/serviceTicket', ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController)), ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController.prototype.getAllServiceTickets)), async function ServiceTicketController_getAllServiceTickets(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ServiceTikcetController_1.ServiceTicketController();
            await templateService.apiHandler({
                methodName: 'getAllServiceTickets',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/serviceTicket', authenticateMiddleware([{ "Api-Token": [] }]), ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController)), ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController.prototype.saveServiceTicket)), async function ServiceTicketController_saveServiceTicket(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ServiceTikcetController_1.ServiceTicketController();
            await templateService.apiHandler({
                methodName: 'saveServiceTicket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/serviceTicket/:serviceTicketId', ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController)), ...((0, runtime_1.fetchMiddlewares)(ServiceTikcetController_1.ServiceTicketController.prototype.updateServiceTicketStatus)), async function ServiceTicketController_updateServiceTicketStatus(request, response, next) {
        const args = {
            serviceTicketId: { "in": "path", "name": "serviceTicketId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqSTstatus" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ServiceTikcetController_1.ServiceTicketController();
            await templateService.apiHandler({
                methodName: 'updateServiceTicketStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/role/:roleId', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.getOneRole)), async function RoleController_getOneRole(request, response, next) {
        const args = {
            roleId: { "in": "path", "name": "roleId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'getOneRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/role', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.getAllRole)), async function RoleController_getAllRole(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'getAllRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/role/:roleId', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.deleteRole)), async function RoleController_deleteRole(request, response, next) {
        const args = {
            roleId: { "in": "path", "name": "roleId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'deleteRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/role', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.saveRole)), async function RoleController_saveRole(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqRole" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'saveRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/role/setPermissions', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.givePermissionToRole)), async function RoleController_givePermissionToRole(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "SetPermisisons" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'givePermissionToRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/role/:roleId', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.updateRole)), async function RoleController_updateRole(request, response, next) {
        const args = {
            req: { "in": "body", "name": "req", "required": true, "ref": "ReqRole" },
            roleId: { "in": "path", "name": "roleId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'updateRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/role/:roleId', ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController)), ...((0, runtime_1.fetchMiddlewares)(RoleController_1.RoleController.prototype.getPermissionsFromRole)), async function RoleController_getPermissionsFromRole(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqRoleBody" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new RoleController_1.RoleController();
            await templateService.apiHandler({
                methodName: 'getPermissionsFromRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/permission', ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController)), ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController.prototype.getAllPermissions)), async function PermissionController_getAllPermissions(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new PermissionController_1.PermissionController();
            await templateService.apiHandler({
                methodName: 'getAllPermissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/permission/:permissionId', ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController)), ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController.prototype.deletePermission)), async function PermissionController_deletePermission(request, response, next) {
        const args = {
            permissionId: { "in": "path", "name": "permissionId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new PermissionController_1.PermissionController();
            await templateService.apiHandler({
                methodName: 'deletePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/permission', ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController)), ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController.prototype.savePermission)), async function PermissionController_savePermission(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqPermission" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new PermissionController_1.PermissionController();
            await templateService.apiHandler({
                methodName: 'savePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/permission/getUserPerms/:userId', ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController)), ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController.prototype.getPermissionsOfUser)), async function PermissionController_getPermissionsOfUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new PermissionController_1.PermissionController();
            await templateService.apiHandler({
                methodName: 'getPermissionsOfUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/permission/:permissionId', ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController)), ...((0, runtime_1.fetchMiddlewares)(PermissionController_1.PermissionController.prototype.updatePermission)), async function PermissionController_updatePermission(request, response, next) {
        const args = {
            permissionId: { "in": "path", "name": "permissionId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqPermission" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new PermissionController_1.PermissionController();
            await templateService.apiHandler({
                methodName: 'updatePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/loginpacket', ...((0, runtime_1.fetchMiddlewares)(LoginPacketController_1.LoginPacketController)), ...((0, runtime_1.fetchMiddlewares)(LoginPacketController_1.LoginPacketController.prototype.saveLoginPacket)), async function LoginPacketController_saveLoginPacket(request, response, next) {
        const args = {
            req: { "in": "body", "name": "req", "required": true, "ref": "ReqLoginPacket" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new LoginPacketController_1.LoginPacketController();
            await templateService.apiHandler({
                methodName: 'saveLoginPacket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/user/freeDongle/:userId', authenticateMiddleware([{ "Api-Token": [] }]), ...((0, runtime_1.fetchMiddlewares)(FreeDongleUserDeviceController_1.FreeDongleUserDeviceController)), ...((0, runtime_1.fetchMiddlewares)(FreeDongleUserDeviceController_1.FreeDongleUserDeviceController.prototype.freeTheDongle)), async function FreeDongleUserDeviceController_freeTheDongle(request, response, next) {
        const args = {
            req: { "in": "request", "name": "req", "required": true, "dataType": "object" },
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new FreeDongleUserDeviceController_1.FreeDongleUserDeviceController();
            await templateService.apiHandler({
                methodName: 'freeTheDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/dongle', ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController)), ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController.prototype.saveDongle)), async function DongleController_saveDongle(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqDongle" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DongleController_1.DongleController();
            await templateService.apiHandler({
                methodName: 'saveDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/dongle', ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController)), ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController.prototype.getAllDongle)), async function DongleController_getAllDongle(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DongleController_1.DongleController();
            await templateService.apiHandler({
                methodName: 'getAllDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/dongle/:dongleId', ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController)), ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController.prototype.getOneDongle)), async function DongleController_getOneDongle(request, response, next) {
        const args = {
            dongleId: { "in": "path", "name": "dongleId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DongleController_1.DongleController();
            await templateService.apiHandler({
                methodName: 'getOneDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/dongle/:dongleId', ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController)), ...((0, runtime_1.fetchMiddlewares)(DongleController_1.DongleController.prototype.deleteDongle)), async function DongleController_deleteDongle(request, response, next) {
        const args = {
            dongleId: { "in": "path", "name": "dongleId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DongleController_1.DongleController();
            await templateService.apiHandler({
                methodName: 'deleteDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/device', ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController)), ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController.prototype.getAllDevice)), async function DeviceController_getAllDevice(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DeviceController_1.DeviceController();
            await templateService.apiHandler({
                methodName: 'getAllDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/device', ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController)), ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController.prototype.saveDevice)), async function DeviceController_saveDevice(request, response, next) {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqDevice" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DeviceController_1.DeviceController();
            await templateService.apiHandler({
                methodName: 'saveDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/device/:deviceId', ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController)), ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController.prototype.deleteDevice)), async function DeviceController_deleteDevice(request, response, next) {
        const args = {
            deviceId: { "in": "path", "name": "deviceId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DeviceController_1.DeviceController();
            await templateService.apiHandler({
                methodName: 'deleteDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/device/allotDongle/:deviceId', ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController)), ...((0, runtime_1.fetchMiddlewares)(DeviceController_1.DeviceController.prototype.allotDongleToDevice)), async function DeviceController_allotDongleToDevice(request, response, next) {
        const args = {
            deviceId: { "in": "path", "name": "deviceId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqDongleAllot" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new DeviceController_1.DeviceController();
            await templateService.apiHandler({
                methodName: 'allotDongleToDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return async function runAuthenticationMiddleware(request, response, next) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts = [];
            const pushAndRethrow = (error) => {
                failedAttempts.push(error);
                throw error;
            };
            const secMethodOrPromises = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises = [];
                    for (const name in secMethod) {
                        secMethodAndPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                }
                else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(expressAuthenticationRecasted(request, name, secMethod[name], response)
                            .catch(pushAndRethrow));
                    }
                }
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next();
            }
            catch (err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map