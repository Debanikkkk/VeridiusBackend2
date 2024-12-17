/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VehicleVersionController } from './../controller/VehicleVersionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VehicleSubmodelController } from './../controller/VehicleSubmodelController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VehicleSegmentController } from './../controller/VehicleSegmentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { VehicleModelController } from './../controller/VehicleModelController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ServiceTicketController } from './../controller/ServiceTikcetController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../controller/RoleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PermissionController } from './../controller/PermissionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OEMController } from './../controller/OEMController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginPacketController } from './../controller/LoginPacketController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { IMEICMDController } from './../controller/IMEICMDController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GeofenceController } from './../controller/GeofenceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FreeDongleUserDeviceController } from './../controller/FreeDongleUserDeviceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FirmwareController } from './../controller/FirmwareController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DongleController } from './../controller/DongleController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeviceController } from './../controller/DeviceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BannerController } from './../controller/BannerController';
import { expressAuthentication } from './../authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResVehicleVersion": {
        "dataType": "refObject",
        "properties": {
            "features": {"dataType":"string"},
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "price": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqVehicleVersion": {
        "dataType": "refObject",
        "properties": {
            "features": {"dataType":"string"},
            "name": {"dataType":"string"},
            "price": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSuccess": {
        "dataType": "refObject",
        "properties": {
            "result": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResOEM": {
        "dataType": "refObject",
        "properties": {
            "contact_information": {"dataType":"string"},
            "country": {"dataType":"string"},
            "founded_year": {"dataType":"datetime"},
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "website": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResVehicleSegment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "description": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResVehicleModel": {
        "dataType": "refObject",
        "properties": {
            "discontinuedYear": {"dataType":"datetime"},
            "id": {"dataType":"double"},
            "launchYear": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "oem": {"ref":"ResOEM"},
            "vehicleSegment": {"ref":"ResVehicleSegment"},
            "vehicleVersion": {"ref":"ResVehicleVersion"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResVehicleSubmodel": {
        "dataType": "refObject",
        "properties": {
            "engineCapacity": {"dataType":"string"},
            "fuelEfficiency": {"dataType":"string"},
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "vehicleModel": {"ref":"ResVehicleModel"},
            "vehicleVersion": {"ref":"ResVehicleVersion"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqVehicleSubmodel": {
        "dataType": "refObject",
        "properties": {
            "engineCapacity": {"dataType":"string"},
            "fuelEfficiency": {"dataType":"string"},
            "name": {"dataType":"string"},
            "vehicleModel": {"dataType":"double"},
            "vehicleVersion": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqVehicleSegment": {
        "dataType": "refObject",
        "properties": {
            "description": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqVehicleModel": {
        "dataType": "refObject",
        "properties": {
            "discontinuedYear": {"dataType":"datetime"},
            "launchYear": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "oem": {"dataType":"double"},
            "vehicleSegment": {"dataType":"double"},
            "vehicleVersion": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "address": {"dataType":"string"},
            "password": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "role": {"ref":"ResRole"},
            "service_ticket": {"ref":"ResServiceTicket"},
            "device": {"ref":"ResDevice"},
            "is_under": {"ref":"ResUser"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "permType": {
        "dataType": "refEnum",
        "enums": ["user","product"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "created_by": {"ref":"ResUser"},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"ResPermission"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResPermission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "description": {"dataType":"string"},
            "type": {"ref":"permType","required":true},
            "name": {"dataType":"string"},
            "roles": {"dataType":"array","array":{"dataType":"refObject","ref":"ResRole"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "serviceTicketStatus": {
        "dataType": "refEnum",
        "enums": ["open","closed","new"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResServiceTicket": {
        "dataType": "refObject",
        "properties": {
            "date": {"dataType":"datetime"},
            "id": {"dataType":"double"},
            "service_ticket_number": {"dataType":"string"},
            "status": {"ref":"serviceTicketStatus"},
            "technician": {"ref":"ResUser"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResDevice": {
        "dataType": "refObject",
        "properties": {
            "assignedTo": {"ref":"ResUser"},
            "createdAt": {"dataType":"datetime"},
            "deviceName": {"dataType":"string"},
            "deviceType": {"dataType":"string"},
            "dongle": {"ref":"ResDongle"},
            "id": {"dataType":"double"},
            "osVersion": {"dataType":"string"},
            "registrationDate": {"dataType":"datetime"},
            "serialNumber": {"dataType":"string"},
            "status": {"ref":"DeviceStatus"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DongleStatus": {
        "dataType": "refEnum",
        "enums": ["Available","Assigned","Defective"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResDongle": {
        "dataType": "refObject",
        "properties": {
            "assignedDevice": {"ref":"ResDevice"},
            "createdAt": {"dataType":"datetime"},
            "dongleSerialNumber": {"dataType":"string"},
            "firmwareUpdatedAt": {"dataType":"datetime"},
            "firmwareVersion": {"dataType":"string"},
            "id": {"dataType":"double"},
            "macAddress": {"dataType":"string"},
            "manufactureDate": {"dataType":"datetime"},
            "status": {"ref":"DongleStatus"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceStatus": {
        "dataType": "refEnum",
        "enums": ["Active","Inactive","Suspended"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResError": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUser": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "password": {"dataType":"string"},
            "address": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "role": {"dataType":"double"},
            "is_under": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "role_name": {"dataType":"string","required":true},
            "role_description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserLogin": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"ResPermission"}},
            "role": {"ref":"UserLoginRole","required":true},
            "token": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUserLogin": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUsersUnder": {
        "dataType": "refObject",
        "properties": {
            "users_under": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Device": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "device_name": {"dataType":"string"},
            "device_type": {"dataType":"string"},
            "imei": {"dataType":"string"},
            "os_version": {"dataType":"string"},
            "serial_number": {"dataType":"string"},
            "dongle_conn_status": {"dataType":"boolean"},
            "registration_date": {"dataType":"datetime"},
            "status": {"ref":"DeviceStatus"},
            "dongle": {"dataType":"union","subSchemas":[{"ref":"Dongle"},{"dataType":"enum","enums":[null]}]},
            "assigned_to": {"dataType":"union","subSchemas":[{"ref":"User"},{"dataType":"enum","enums":[null]}]},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dongle": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "dongle_serial_number": {"dataType":"string"},
            "mac_address": {"dataType":"string"},
            "model": {"dataType":"string"},
            "manufacture_date": {"dataType":"datetime"},
            "firmware_version": {"dataType":"string"},
            "status": {"ref":"DongleStatus"},
            "assigned_device": {"dataType":"union","subSchemas":[{"ref":"Device"},{"dataType":"enum","enums":[null]}]},
            "firmware_updated_at": {"dataType":"datetime"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "password": {"dataType":"string"},
            "address": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "email": {"dataType":"string"},
            "device": {"dataType":"union","subSchemas":[{"ref":"Device"},{"dataType":"enum","enums":[null]}]},
            "role": {"ref":"Role"},
            "files": {"dataType":"array","array":{"dataType":"refObject","ref":"File"}},
            "service_ticket": {"ref":"ServiceTicket"},
            "trips": {"dataType":"array","array":{"dataType":"refObject","ref":"Trip"}},
            "is_under": {"dataType":"array","array":{"dataType":"refObject","ref":"User"}},
            "firmwares": {"dataType":"array","array":{"dataType":"refObject","ref":"Firmware"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"Permission"}},
            "users": {"dataType":"array","array":{"dataType":"refObject","ref":"User"}},
            "created_by": {"ref":"User"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "type": {"ref":"permType"},
            "role": {"dataType":"array","array":{"dataType":"refObject","ref":"Role"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "file_type": {
        "dataType": "refEnum",
        "enums": ["FSQ","JSON","BIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "firmware_management": {
        "dataType": "refEnum",
        "enums": ["DEVOTA","FOTA"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ECU": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "is_active": {"dataType":"boolean"},
            "mac_id": {"dataType":"string"},
            "ecu_name": {"dataType":"string"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "protocol": {"dataType":"string"},
            "rx_header": {"dataType":"string"},
            "tx_header": {"dataType":"string"},
            "read_dtc_fc_index": {"dataType":"string"},
            "clear_dtc_fn_index": {"dataType":"string"},
            "read_data_fn_index": {"dataType":"string"},
            "write_data_fn_index": {"dataType":"string"},
            "seedkey_algo_fn_index": {"dataType":"string"},
            "ior_test_index": {"dataType":"string"},
            "negative_responses": {"dataType":"array","array":{"dataType":"refObject","ref":"NegativeResponseCode"}},
            "pid_datasets": {"dataType":"array","array":{"dataType":"refObject","ref":"PIDDataset"}},
            "dtc_datasets": {"dataType":"array","array":{"dataType":"refObject","ref":"DtcDataset"}},
            "firmware": {"ref":"Firmware"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NegativeResponseCode": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "response_code": {"dataType":"string"},
            "description": {"dataType":"string"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "ecus": {"dataType":"array","array":{"dataType":"refObject","ref":"ECU"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PIDDataset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "active": {"dataType":"boolean"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "pids": {"dataType":"array","array":{"dataType":"refObject","ref":"PID"}},
            "ecus": {"dataType":"array","array":{"dataType":"refObject","ref":"ECU"}},
            "message_types": {"dataType":"array","array":{"dataType":"refObject","ref":"MessageType"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PID": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "pid_code": {"dataType":"string"},
            "long_name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "short_name": {"dataType":"string"},
            "active": {"dataType":"boolean"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "total_length": {"dataType":"double"},
            "byte_position": {"dataType":"double"},
            "length_bytes": {"dataType":"double"},
            "bit_coded": {"dataType":"boolean"},
            "resolution": {"dataType":"double"},
            "offset": {"dataType":"double"},
            "min": {"dataType":"double"},
            "max": {"dataType":"double"},
            "read": {"dataType":"boolean"},
            "write": {"dataType":"boolean"},
            "unit": {"dataType":"string"},
            "pid_datasets": {"dataType":"array","array":{"dataType":"refObject","ref":"PIDDataset"}},
            "parameters": {"dataType":"array","array":{"dataType":"refObject","ref":"Parameters"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Parameters": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "active": {"dataType":"boolean"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "pids": {"dataType":"array","array":{"dataType":"refObject","ref":"PID"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MessageType": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "pid_datasets": {"dataType":"array","array":{"dataType":"refObject","ref":"PIDDataset"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DtcDataset": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "is_active": {"dataType":"boolean"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "dtcs": {"dataType":"array","array":{"dataType":"refObject","ref":"DTC"}},
            "ecus": {"dataType":"array","array":{"dataType":"refObject","ref":"ECU"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DTC": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "is_active": {"dataType":"boolean"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "dtc_dataset": {"dataType":"array","array":{"dataType":"refObject","ref":"DtcDataset"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Firmware": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "firmware_version": {"dataType":"string"},
            "firmware_type": {"ref":"firmware_management"},
            "created_by": {"ref":"User"},
            "ecus": {"dataType":"array","array":{"dataType":"refObject","ref":"ECU"}},
            "files": {"dataType":"array","array":{"dataType":"refObject","ref":"File"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "File": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "file": {"dataType":"string"},
            "file_name": {"dataType":"string"},
            "file_description": {"dataType":"string"},
            "created_at": {"dataType":"datetime"},
            "updated_at": {"dataType":"datetime"},
            "created_by": {"ref":"User"},
            "is_active": {"dataType":"boolean"},
            "file_type": {"ref":"file_type"},
            "firmware": {"ref":"Firmware"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceTicket": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "date": {"dataType":"datetime"},
            "created_on": {"dataType":"datetime"},
            "updated_on": {"dataType":"datetime"},
            "status": {"ref":"serviceTicketStatus"},
            "active": {"dataType":"boolean"},
            "service_ticket_number": {"dataType":"string"},
            "technician": {"ref":"User"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trip": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "user": {"ref":"User"},
            "startLatitude": {"dataType":"double"},
            "startLongitude": {"dataType":"double"},
            "endLatitude": {"dataType":"double"},
            "endLongitude": {"dataType":"double"},
            "tariff": {"dataType":"double"},
            "paymentStatus": {"dataType":"string"},
            "timestamp": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDeviceAssign": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PaginatedResponse_User_": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"User"},"required":true},
            "totalCount": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserUpdate": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "address": {"dataType":"string"},
            "password": {"dataType":"string"},
            "email": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "role": {"dataType":"double"},
            "device": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqUserRoleFind": {
        "dataType": "refObject",
        "properties": {
            "role": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqSTstatus": {
        "dataType": "refObject",
        "properties": {
            "status": {"ref":"serviceTicketStatus","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqRole": {
        "dataType": "refObject",
        "properties": {
            "description": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetSetPermisisons": {
        "dataType": "refObject",
        "properties": {
            "role": {"ref":"ResRole"},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"ResPermission"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetPermisisons": {
        "dataType": "refObject",
        "properties": {
            "permissions": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqPermission": {
        "dataType": "refObject",
        "properties": {
            "description": {"dataType":"string"},
            "type": {"ref":"permType"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqOEM": {
        "dataType": "refObject",
        "properties": {
            "contact_information": {"dataType":"string"},
            "country": {"dataType":"string"},
            "founded_year": {"dataType":"datetime"},
            "name": {"dataType":"string"},
            "website": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginPacket": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "packetHeader": {"dataType":"string"},
            "vendorId": {"dataType":"string"},
            "vehicleRegNo": {"dataType":"string"},
            "version": {"dataType":"string"},
            "imei": {"dataType":"string"},
            "firmwareVersion": {"dataType":"string"},
            "protocolVersion": {"dataType":"string"},
            "device_type": {"dataType":"string"},
            "latitude": {"dataType":"double"},
            "longitude": {"dataType":"double"},
            "checksum": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqLoginPacket": {
        "dataType": "refObject",
        "properties": {
            "checksum": {"dataType":"string","required":true},
            "firmwareVersion": {"dataType":"string","required":true},
            "imei": {"dataType":"string","required":true},
            "latitude": {"dataType":"double","required":true},
            "longitude": {"dataType":"double","required":true},
            "packetHeader": {"dataType":"string","required":true},
            "protocolVersion": {"dataType":"string","required":true},
            "vehicleRegNo": {"dataType":"string","required":true},
            "vendorId": {"dataType":"string","required":true},
            "version": {"dataType":"string"},
            "deviceType": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendCommandRequest": {
        "dataType": "refObject",
        "properties": {
            "imei": {"dataType":"string","required":true},
            "cmd": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResGeofence": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "polygon": {"dataType":"nestedObjectLiteral","nestedProperties":{"coordinates":{"dataType":"array","array":{"dataType":"array","array":{"dataType":"array","array":{"dataType":"double"}}},"required":true},"type":{"dataType":"enum","enums":["Polygon"],"required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqGeofence": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "polygon": {"dataType":"nestedObjectLiteral","nestedProperties":{"coordinates":{"dataType":"array","array":{"dataType":"array","array":{"dataType":"array","array":{"dataType":"double"}}},"required":true},"type":{"dataType":"enum","enums":["Polygon"],"required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDongle": {
        "dataType": "refObject",
        "properties": {
            "assignedDevice": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "dongleSerialNumber": {"dataType":"string","required":true},
            "firmwareUpdatedAt": {"dataType":"datetime","required":true},
            "firmwareVersion": {"dataType":"string","required":true},
            "macAddress": {"dataType":"string","required":true},
            "manufactureDate": {"dataType":"datetime","required":true},
            "status": {"ref":"DongleStatus","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDevice": {
        "dataType": "refObject",
        "properties": {
            "assignedTo": {"dataType":"double"},
            "createdAt": {"dataType":"datetime"},
            "deviceName": {"dataType":"string"},
            "deviceType": {"dataType":"string"},
            "dongle": {"dataType":"double"},
            "imei": {"dataType":"string"},
            "osVersion": {"dataType":"string"},
            "registrationDate": {"dataType":"datetime"},
            "serialNumber": {"dataType":"string"},
            "status": {"ref":"DeviceStatus"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDongleAllot": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqDevConStatus": {
        "dataType": "refObject",
        "properties": {
            "devConnStatus": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResBanner": {
        "dataType": "refObject",
        "properties": {
            "createdAt": {"dataType":"datetime"},
            "id": {"dataType":"double"},
            "priority": {"dataType":"double"},
            "product_description": {"dataType":"string"},
            "product_img": {"dataType":"string"},
            "product_link": {"dataType":"string"},
            "product_name": {"dataType":"string"},
            "product_tag": {"dataType":"string"},
            "rating": {"dataType":"double"},
            "updatedAt": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/vehicleVersion',
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController.prototype.saveVehicleVersion)),

            async function VehicleVersionController_saveVehicleVersion(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqVehicleVersion"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleVersionController();

              await templateService.apiHandler({
                methodName: 'saveVehicleVersion',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/vehicleVersion/:vehicleVersionId',
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController.prototype.deleteVehicleVersion)),

            async function VehicleVersionController_deleteVehicleVersion(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleVersionId: {"in":"path","name":"vehicleVersionId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleVersionController();

              await templateService.apiHandler({
                methodName: 'deleteVehicleVersion',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleVersion',
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController.prototype.getAllVehicleVersion)),

            async function VehicleVersionController_getAllVehicleVersion(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleVersionController();

              await templateService.apiHandler({
                methodName: 'getAllVehicleVersion',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleVersion/:vehicleVersionId',
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleVersionController.prototype.getOneVehicleVersion)),

            async function VehicleVersionController_getOneVehicleVersion(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleVersionId: {"in":"path","name":"vehicleVersionId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleVersionController();

              await templateService.apiHandler({
                methodName: 'getOneVehicleVersion',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/vehicleSubModel',
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController.prototype.saveVehicleSubmodel)),

            async function VehicleSubmodelController_saveVehicleSubmodel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqVehicleSubmodel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSubmodelController();

              await templateService.apiHandler({
                methodName: 'saveVehicleSubmodel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleSubModel',
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController.prototype.getVehicleSubModel)),

            async function VehicleSubmodelController_getVehicleSubModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSubmodelController();

              await templateService.apiHandler({
                methodName: 'getVehicleSubModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleSubModel/:vehicleSubModelId',
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController.prototype.getOneVehicleSubModel)),

            async function VehicleSubmodelController_getOneVehicleSubModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleSubModelId: {"in":"path","name":"vehicleSubModelId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSubmodelController();

              await templateService.apiHandler({
                methodName: 'getOneVehicleSubModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/vehicleSubModel/:vehicleSubModelId',
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSubmodelController.prototype.deleteVehicleSubmodel)),

            async function VehicleSubmodelController_deleteVehicleSubmodel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleSubModelId: {"in":"path","name":"vehicleSubModelId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSubmodelController();

              await templateService.apiHandler({
                methodName: 'deleteVehicleSubmodel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/vehicleSegment',
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController.prototype.saveVehicleSegment)),

            async function VehicleSegmentController_saveVehicleSegment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqVehicleSegment"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSegmentController();

              await templateService.apiHandler({
                methodName: 'saveVehicleSegment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleSegment',
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController.prototype.getAllVehicleSegment)),

            async function VehicleSegmentController_getAllVehicleSegment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSegmentController();

              await templateService.apiHandler({
                methodName: 'getAllVehicleSegment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleSegment/:vehicleSegmentId',
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController.prototype.getOneVehicleSegment)),

            async function VehicleSegmentController_getOneVehicleSegment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleSegmentId: {"in":"path","name":"vehicleSegmentId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSegmentController();

              await templateService.apiHandler({
                methodName: 'getOneVehicleSegment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/vehicleSegment/:vehicleSegmentId',
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleSegmentController.prototype.deleteVehicleSegment)),

            async function VehicleSegmentController_deleteVehicleSegment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleSegmentId: {"in":"path","name":"vehicleSegmentId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleSegmentController();

              await templateService.apiHandler({
                methodName: 'deleteVehicleSegment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/vehicleModel',
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController.prototype.saveVehicleModel)),

            async function VehicleModelController_saveVehicleModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqVehicleModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleModelController();

              await templateService.apiHandler({
                methodName: 'saveVehicleModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleModel',
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController.prototype.getAllVehicleModel)),

            async function VehicleModelController_getAllVehicleModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleModelController();

              await templateService.apiHandler({
                methodName: 'getAllVehicleModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/vehicleModel/:vehicleModelId',
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController.prototype.getOneVehicleModel)),

            async function VehicleModelController_getOneVehicleModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleModelId: {"in":"path","name":"vehicleModelId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleModelController();

              await templateService.apiHandler({
                methodName: 'getOneVehicleModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/vehicleModel/:vehicleModelId',
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController)),
            ...(fetchMiddlewares<RequestHandler>(VehicleModelController.prototype.deleteVehicleModel)),

            async function VehicleModelController_deleteVehicleModel(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    vehicleModelId: {"in":"path","name":"vehicleModelId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new VehicleModelController();

              await templateService.apiHandler({
                methodName: 'deleteVehicleModel',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user',
            authenticateMiddleware([{"Api-Token":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.saveUser)),

            async function UserController_saveUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    req: {"in":"body","name":"req","required":true,"ref":"ReqUser"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'saveUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.userLogin)),

            async function UserController_userLogin(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    loginBody: {"in":"body","name":"loginBody","required":true,"ref":"ReqUserLogin"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'userLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/getUsersUnder/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsersUnder)),

            async function UserController_getUsersUnder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"undefined"}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUsersUnder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/putUsersUnder/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.putUsersUnder)),

            async function UserController_putUsersUnder(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                    req: {"in":"body","name":"req","required":true,"ref":"ReqUsersUnder"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'putUsersUnder',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/userDeviceAllot/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.assignUserDevice)),

            async function UserController_assignUserDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqDeviceAssign"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'assignUserDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    pageSize: {"default":10,"in":"query","name":"pageSize","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getOneUser)),

            async function UserController_getOneUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getOneUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ResUserUpdate"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/getAllUser',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAllUsers)),

            async function UserController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/:userId/getUserFromRole',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsersFromRole)),

            async function UserController_getUsersFromRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqUserRoleFind"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUsersFromRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/serviceTicket',
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController)),
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController.prototype.getAllServiceTickets)),

            async function ServiceTicketController_getAllServiceTickets(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ServiceTicketController();

              await templateService.apiHandler({
                methodName: 'getAllServiceTickets',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/serviceTicket',
            authenticateMiddleware([{"Api-Token":[]}]),
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController)),
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController.prototype.saveServiceTicket)),

            async function ServiceTicketController_saveServiceTicket(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ServiceTicketController();

              await templateService.apiHandler({
                methodName: 'saveServiceTicket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/serviceTicket/:serviceTicketId',
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController)),
            ...(fetchMiddlewares<RequestHandler>(ServiceTicketController.prototype.updateServiceTicketStatus)),

            async function ServiceTicketController_updateServiceTicketStatus(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    serviceTicketId: {"in":"path","name":"serviceTicketId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqSTstatus"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ServiceTicketController();

              await templateService.apiHandler({
                methodName: 'updateServiceTicketStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/role/:roleId',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getOneRole)),

            async function RoleController_getOneRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getOneRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/role',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getAllRole)),

            async function RoleController_getAllRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getAllRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/role/:roleId',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.deleteRole)),

            async function RoleController_deleteRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'deleteRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/role',
            authenticateMiddleware([{"Api-Token":[]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.saveRole)),

            async function RoleController_saveRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqRole"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'saveRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/role/:roleId/setPermissions',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.givePermissionToRole)),

            async function RoleController_givePermissionToRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"SetPermisisons"},
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'givePermissionToRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/role/:roleId',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.updateRole)),

            async function RoleController_updateRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"body","name":"req","required":true,"ref":"ReqRole"},
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'updateRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/role/:roleId',
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getPermissionsFromRole)),

            async function RoleController_getPermissionsFromRole(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new RoleController();

              await templateService.apiHandler({
                methodName: 'getPermissionsFromRole',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/permission',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getAllPermissions)),

            async function PermissionController_getAllPermissions(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'getAllPermissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/permission/:permissionId',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.deletePermission)),

            async function PermissionController_deletePermission(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'deletePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/permission',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.savePermission)),

            async function PermissionController_savePermission(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqPermission"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'savePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/permission/getUserPerms/:userId',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getPermissionsOfUser)),

            async function PermissionController_getPermissionsOfUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'getPermissionsOfUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/permission/:permissionId',
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.updatePermission)),

            async function PermissionController_updatePermission(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqPermission"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PermissionController();

              await templateService.apiHandler({
                methodName: 'updatePermission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oem',
            ...(fetchMiddlewares<RequestHandler>(OEMController)),
            ...(fetchMiddlewares<RequestHandler>(OEMController.prototype.saveOem)),

            async function OEMController_saveOem(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqOEM"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new OEMController();

              await templateService.apiHandler({
                methodName: 'saveOem',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/loginpacket',
            ...(fetchMiddlewares<RequestHandler>(LoginPacketController)),
            ...(fetchMiddlewares<RequestHandler>(LoginPacketController.prototype.saveLoginPacket)),

            async function LoginPacketController_saveLoginPacket(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"body","name":"req","required":true,"ref":"ReqLoginPacket"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new LoginPacketController();

              await templateService.apiHandler({
                methodName: 'saveLoginPacket',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/cmd/send',
            ...(fetchMiddlewares<RequestHandler>(IMEICMDController)),
            ...(fetchMiddlewares<RequestHandler>(IMEICMDController.prototype.sendCommand)),

            async function IMEICMDController_sendCommand(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"SendCommandRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new IMEICMDController();

              await templateService.apiHandler({
                methodName: 'sendCommand',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/geofence',
            ...(fetchMiddlewares<RequestHandler>(GeofenceController)),
            ...(fetchMiddlewares<RequestHandler>(GeofenceController.prototype.saveGeofence)),

            async function GeofenceController_saveGeofence(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"body","name":"req","required":true,"ref":"ReqGeofence"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GeofenceController();

              await templateService.apiHandler({
                methodName: 'saveGeofence',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/geofence',
            ...(fetchMiddlewares<RequestHandler>(GeofenceController)),
            ...(fetchMiddlewares<RequestHandler>(GeofenceController.prototype.getAllGeofence)),

            async function GeofenceController_getAllGeofence(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new GeofenceController();

              await templateService.apiHandler({
                methodName: 'getAllGeofence',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/freeDongle/:userId',
            authenticateMiddleware([{"Api-Token":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FreeDongleUserDeviceController)),
            ...(fetchMiddlewares<RequestHandler>(FreeDongleUserDeviceController.prototype.freeTheDongle)),

            async function FreeDongleUserDeviceController_freeTheDongle(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FreeDongleUserDeviceController();

              await templateService.apiHandler({
                methodName: 'freeTheDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/firmware',
            authenticateMiddleware([{"Api-Token":[]}]),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController)),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController.prototype.saveFirmware)),

            async function FirmwareController_saveFirmware(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    firmwareVersion: {"in":"query","name":"firmwareVersion","required":true,"dataType":"string"},
                    firmwareType: {"in":"query","name":"firmwareType","required":true,"ref":"firmware_management"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FirmwareController();

              await templateService.apiHandler({
                methodName: 'saveFirmware',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/firmware/getFOTAfirmware',
            ...(fetchMiddlewares<RequestHandler>(FirmwareController)),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController.prototype.getFirmwareFOTA)),

            async function FirmwareController_getFirmwareFOTA(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FirmwareController();

              await templateService.apiHandler({
                methodName: 'getFirmwareFOTA',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/firmware/getDevOTAfirmware',
            ...(fetchMiddlewares<RequestHandler>(FirmwareController)),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController.prototype.getFirmwareDevOTA)),

            async function FirmwareController_getFirmwareDevOTA(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FirmwareController();

              await templateService.apiHandler({
                methodName: 'getFirmwareDevOTA',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/firmware/:firmwareId',
            ...(fetchMiddlewares<RequestHandler>(FirmwareController)),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController.prototype.deleteFirmware)),

            async function FirmwareController_deleteFirmware(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    firmwareId: {"in":"path","name":"firmwareId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FirmwareController();

              await templateService.apiHandler({
                methodName: 'deleteFirmware',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/firmware',
            ...(fetchMiddlewares<RequestHandler>(FirmwareController)),
            ...(fetchMiddlewares<RequestHandler>(FirmwareController.prototype.updateFirmwareWithFile)),

            async function FirmwareController_updateFirmwareWithFile(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    fileName: {"in":"query","name":"fileName","required":true,"dataType":"string"},
                    fileDescription: {"in":"query","name":"fileDescription","required":true,"dataType":"string"},
                    isActive: {"in":"query","name":"isActive","required":true,"dataType":"boolean"},
                    fileType: {"in":"query","name":"fileType","required":true,"ref":"file_type"},
                    firmware: {"in":"query","name":"firmware","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new FirmwareController();

              await templateService.apiHandler({
                methodName: 'updateFirmwareWithFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/dongle',
            ...(fetchMiddlewares<RequestHandler>(DongleController)),
            ...(fetchMiddlewares<RequestHandler>(DongleController.prototype.saveDongle)),

            async function DongleController_saveDongle(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqDongle"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DongleController();

              await templateService.apiHandler({
                methodName: 'saveDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/dongle',
            ...(fetchMiddlewares<RequestHandler>(DongleController)),
            ...(fetchMiddlewares<RequestHandler>(DongleController.prototype.getAllDongle)),

            async function DongleController_getAllDongle(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DongleController();

              await templateService.apiHandler({
                methodName: 'getAllDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/dongle/:dongleId',
            ...(fetchMiddlewares<RequestHandler>(DongleController)),
            ...(fetchMiddlewares<RequestHandler>(DongleController.prototype.getOneDongle)),

            async function DongleController_getOneDongle(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    dongleId: {"in":"path","name":"dongleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DongleController();

              await templateService.apiHandler({
                methodName: 'getOneDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/dongle/:dongleId',
            ...(fetchMiddlewares<RequestHandler>(DongleController)),
            ...(fetchMiddlewares<RequestHandler>(DongleController.prototype.deleteDongle)),

            async function DongleController_deleteDongle(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    dongleId: {"in":"path","name":"dongleId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DongleController();

              await templateService.apiHandler({
                methodName: 'deleteDongle',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/device/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.getOneDevice)),

            async function DeviceController_getOneDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'getOneDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/device',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.getAllDevice)),

            async function DeviceController_getAllDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'getAllDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/device',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.saveDevice)),

            async function DeviceController_saveDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"body","name":"request","required":true,"ref":"ReqDevice"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'saveDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/device/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.deleteDevice)),

            async function DeviceController_deleteDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'deleteDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/device/allotDongle/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.allotDongleToDevice)),

            async function DeviceController_allotDongleToDevice(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"ReqDongleAllot"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'allotDongleToDevice',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/device/:deviceId',
            ...(fetchMiddlewares<RequestHandler>(DeviceController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceController.prototype.updateDeviceConnStatus)),

            async function DeviceController_updateDeviceConnStatus(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    deviceId: {"in":"path","name":"deviceId","required":true,"dataType":"double"},
                    req: {"in":"body","name":"req","required":true,"ref":"ReqDevConStatus"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new DeviceController();

              await templateService.apiHandler({
                methodName: 'updateDeviceConnStatus',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/banners',
            ...(fetchMiddlewares<RequestHandler>(BannerController)),
            ...(fetchMiddlewares<RequestHandler>(BannerController.prototype.getAllBanners)),

            async function BannerController_getAllBanners(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BannerController();

              await templateService.apiHandler({
                methodName: 'getAllBanners',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
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
            catch(err) {
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
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
