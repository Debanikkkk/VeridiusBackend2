"use strict";
// import express, { NextFunction } from 'express';
// import * as bodyParser from 'body-parser';
// import { Request, Response } from 'express';
// import 'reflect-metadata';
// import { AppDataSource } from './data-source';
// // import { Routes } from './routes';
// import { envs } from './utils/envVars';
// import cors = require('cors');
// import { RegisterRoutes } from './tsoa-auto/routes';
// import swaggerUi from 'swagger-ui-express';
// import { ValidateError } from 'tsoa';
// import swaggerJson from './tsoa-auto/swagger.json';
// // import { ResponseError } from './models/res/ResErrors';
// import { ResponseError } from './models/res/ResErrors';
// import * as fs from 'fs'
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// AppDataSource.initialize()
//   .then(async () => {
//     AppDataSource.runMigrations({ transaction: 'each' });
//     // create express app
//     const app = express();
//     // Add a list of allowed origins.
//     // If you have more origins you would like to add, you can add them to the array below.
//     const allowedOrigins = envs.CORS_ALLOWED_ORIGINS;
//     const options: cors.CorsOptions = {
//       origin: allowedOrigins,
//     };
//     // var fs = require('fs');
//     const dir = './public/uploads/';
//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir, { recursive: true });
//     }
//     app.use(cors(options));
//     app.use(bodyParser.json());
//     app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
//       return res.send(swaggerUi.generateHTML(swaggerJson));
//     });
//     // app.use("/oem", oemRouter);
//     RegisterRoutes(app);
//     app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
//       if (err instanceof ValidateError) {
//         console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
//         return res.status(422).json({
//           message: 'Validation Failed',
//           details: err?.fields,
//         });
//       }
//       if (err instanceof ResponseError) {
//         return res.status(err.statusCode).json({
//           message: err.message,
//         });
//       }
//       if (err instanceof Error) {
//         console.log('Internal Server Error: ', err);
//         return res.status(500).json({
//           message: 'Internal Server Error',
//         });
//       }
//       next();
//     });
//     // register express routes from defined application routes
//     // Routes.forEach((route) => {
//     //   (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//     //     const result = new (route.controller as any)()[route.action](req, res, next);
//     //     if (result instanceof Promise) {
//     //       result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
//     //     } else if (result !== null && result !== undefined) {
//     //       res.json(result);
//     //     }
//     //   });
//     // });
//     // setup express app here
//     // ...
//     // start express server
//     app.listen(envs.PORT);
//     // <meta http-equiv="Content-Security-Policy" content="img-src 'self' data:; default-src 'self' http://121.0.0:3000/">
//     console.log('Express server has started on port', envs.PORT);
//     console.log('Express server has started on port 3004. Open http://localhost:' + 3003 + '/docs to see results');
//   })
//   .catch((error) => console.log(error));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
// import { Routes } from './routes';
const envVars_1 = require("./utils/envVars");
const cors = require("cors");
const routes_1 = require("./tsoa-auto/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const tsoa_1 = require("tsoa");
const swagger_json_1 = __importDefault(require("./tsoa-auto/swagger.json"));
// import { ResponseError } from './models/res/ResErrors';
const ResErrors_1 = require("./models/res/ResErrors");
const fs = __importStar(require("fs"));
data_source_1.AppDataSource.initialize()
    .then(async () => {
    data_source_1.AppDataSource.runMigrations({ transaction: 'each' });
    // create express app
    const app = (0, express_1.default)();
    // Add a list of allowed origins.
    // If you have more origins you would like to add, you can add them to the array below.
    const allowedOrigins = envVars_1.envs.CORS_ALLOWED_ORIGINS;
    const options = {
        origin: allowedOrigins,
    };
    const dir = './public/uploads/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    app.use(cors(options));
    app.use(bodyParser.json());
    // Serve static files from the public/uploads directory
    app.use('/public/uploads', express_1.default.static('./public/uploads'));
    app.use('/docs', swagger_ui_express_1.default.serve, async (_req, res) => {
        return res.send(swagger_ui_express_1.default.generateHTML(swagger_json_1.default));
    });
    // app.use("/oem", oemRouter);
    (0, routes_1.RegisterRoutes)(app);
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof tsoa_1.ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                message: 'Validation Failed',
                details: err?.fields,
            });
        }
        if (err instanceof ResErrors_1.ResponseError) {
            return res.status(err.statusCode).json({
                message: err.message,
            });
        }
        if (err instanceof Error) {
            console.log('Internal Server Error: ', err);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
        next();
    });
    // register express routes from defined application routes
    // Routes.forEach((route) => {
    //   (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //     const result = new (route.controller as any)()[route.action](req, res, next);
    //     if (result instanceof Promise) {
    //       result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
    //     } else if (result !== null && result !== undefined) {
    //       res.json(result);
    //     }
    //   });
    // });
    // setup express app here
    // ...
    // start express server
    app.listen(envVars_1.envs.PORT);
    console.log('Express server has started on port', envVars_1.envs.PORT);
    console.log('Express server has started on port 3003. Open http://localhost:' + envVars_1.envs.PORT + '/docs to see results');
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map