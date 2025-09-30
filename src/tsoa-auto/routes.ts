/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ShowController } from './../controller/ShowController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SeasonController } from './../controller/SeasonController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EpisodeController } from './../controller/EpisodeController';
import { expressAuthentication } from './../authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');


const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "password": {"dataType":"string"},
            "address": {"dataType":"string"},
            "phone_number": {"dataType":"string"},
            "status": {"dataType":"boolean"},
            "email": {"dataType":"string"},
            "role": {"dataType":"nestedObjectLiteral","nestedProperties":{"description":{"dataType":"string"},"name":{"dataType":"string"},"id":{"dataType":"double"}}},
            "shows_count": {"dataType":"double"},
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
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRole": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}]},
            "role_name": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "role_description": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResUserLogin": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "role": {"dataType":"union","subSchemas":[{"ref":"UserLoginRole"},{"dataType":"enum","enums":[null]}],"required":true},
            "token": {"dataType":"string"},
        },
        "additionalProperties": false,
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
    "ReqUserLogin": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
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
    "ResSeasonDet": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "season_no": {"dataType":"double"},
            "season_desc": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "episodes_count": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResShowDet": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "tile_img": {"dataType":"string"},
            "desc_img": {"dataType":"string"},
            "description": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "rating": {"dataType":"string"},
            "show_type": {"dataType":"string"},
            "publisher": {"ref":"ResUser"},
            "seasons_count": {"dataType":"double"},
            "seasons": {"dataType":"array","array":{"dataType":"refObject","ref":"ResSeasonDet"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResShow": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "tile_img": {"dataType":"string"},
            "desc_img": {"dataType":"string"},
            "description": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "rating": {"dataType":"string"},
            "show_type": {"dataType":"string"},
            "publisher": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string"},"name":{"dataType":"string"},"id":{"dataType":"double"}}},
            "seasons_count": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResShowWithDetails": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "tile_img": {"dataType":"string"},
            "desc_img": {"dataType":"string"},
            "description": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "rating": {"dataType":"string"},
            "show_type": {"dataType":"string"},
            "publisher": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string"},"name":{"dataType":"string"},"id":{"dataType":"double"}}},
            "seasons_count": {"dataType":"double","required":true},
            "seasons": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"date":{"dataType":"datetime"},"season_desc":{"dataType":"string"},"season_no":{"dataType":"double"},"title":{"dataType":"string"},"id":{"dataType":"double"}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "movieRating": {
        "dataType": "refEnum",
        "enums": ["G","PG","PG-13","R","NC-17","Unrated","Not Rated"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "showType": {
        "dataType": "refEnum",
        "enums": ["Movies","TV Shows"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ReqShow_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"tile_img":{"dataType":"string"},"desc_img":{"dataType":"string"},"description":{"dataType":"string"},"rating":{"ref":"movieRating"},"show_type":{"ref":"showType"},"publisher_id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSeasonWithDetails": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "season_no": {"dataType":"double"},
            "season_desc": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "show": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"id":{"dataType":"double"}}},
            "episodes_count": {"dataType":"double","required":true},
            "episodes": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"thumbnail":{"dataType":"string"},"file":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"episode_desc":{"dataType":"string"},"title":{"dataType":"string"},"id":{"dataType":"double"}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResEpisodeN": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "episode_desc": {"dataType":"string"},
            "file": {"dataType":"string"},
            "thumbnail": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSeasonN": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "season_no": {"dataType":"double"},
            "season_desc": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "episodes_count": {"dataType":"double"},
            "episodes": {"dataType":"array","array":{"dataType":"refObject","ref":"ResEpisodeN"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSeason": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "season_no": {"dataType":"double"},
            "season_desc": {"dataType":"string"},
            "date": {"dataType":"datetime"},
            "show": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"id":{"dataType":"double"}}},
            "episodes_count": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqSeason": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "season_no": {"dataType":"double"},
            "season_desc": {"dataType":"string"},
            "show_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ReqSeason_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"season_no":{"dataType":"double"},"season_desc":{"dataType":"string"},"show_id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResEpisode": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "title": {"dataType":"string"},
            "episode_desc": {"dataType":"string"},
            "file": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "thumbnail": {"dataType":"string"},
            "season": {"dataType":"nestedObjectLiteral","nestedProperties":{"season_no":{"dataType":"double"},"title":{"dataType":"string"},"id":{"dataType":"double"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_ReqEpisode_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"episode_desc":{"dataType":"string"},"thumbnail":{"dataType":"string"},"season_id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        const argsUserController_saveUser: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"ReqUser"},
        };
        app.post('/user/registerViewer',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.saveUser)),

            async function UserController_saveUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_saveUser, request, response });

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
        const argsUserController_saveUserUploader: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"ReqUser"},
        };
        app.post('/user/registerUploader',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.saveUserUploader)),

            async function UserController_saveUserUploader(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_saveUserUploader, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'saveUserUploader',
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
        const argsUserController_userLogin: Record<string, TsoaRoute.ParameterSchema> = {
                loginBody: {"in":"body","name":"loginBody","required":true,"ref":"ReqUserLogin"},
        };
        app.post('/user/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.userLogin)),

            async function UserController_userLogin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_userLogin, request, response });

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
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
        };
        app.delete('/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

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
        const argsShowController_getAllShows: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/shows/getAllShows',
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.getAllShows)),

            async function ShowController_getAllShows(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_getAllShows, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'getAllShows',
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
        const argsShowController_getAllShowsFilter: Record<string, TsoaRoute.ParameterSchema> = {
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                showType: {"in":"query","name":"showType","dataType":"string"},
                rating: {"in":"query","name":"rating","dataType":"string"},
        };
        app.get('/shows/getAllShowsFilter',
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.getAllShowsFilter)),

            async function ShowController_getAllShowsFilter(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_getAllShowsFilter, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'getAllShowsFilter',
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
        const argsShowController_getShowById: Record<string, TsoaRoute.ParameterSchema> = {
                showId: {"in":"path","name":"showId","required":true,"dataType":"double"},
        };
        app.get('/shows/:showId',
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.getShowById)),

            async function ShowController_getShowById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_getShowById, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'getShowById',
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
        const argsShowController_createShow: Record<string, TsoaRoute.ParameterSchema> = {
                userid: {"in":"query","name":"userid","dataType":"double"},
                title: {"in":"query","name":"title","dataType":"string"},
                description: {"in":"query","name":"description","dataType":"string"},
                rating: {"in":"query","name":"rating","ref":"movieRating"},
                show_type: {"in":"query","name":"show_type","ref":"showType"},
                tile_img: {"in":"formData","name":"tile_img","dataType":"file"},
                desc_img: {"in":"formData","name":"desc_img","dataType":"file"},
        };
        app.post('/shows',
            upload.fields([
                {
                    name: "tile_img",
                    maxCount: 1
                },
                {
                    name: "desc_img",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.createShow)),

            async function ShowController_createShow(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_createShow, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'createShow',
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
        const argsShowController_updateShow: Record<string, TsoaRoute.ParameterSchema> = {
                showId: {"in":"path","name":"showId","required":true,"dataType":"double"},
                req: {"in":"body","name":"req","required":true,"ref":"Partial_ReqShow_"},
        };
        app.put('/shows/:showId',
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.updateShow)),

            async function ShowController_updateShow(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_updateShow, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'updateShow',
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
        const argsShowController_deleteShow: Record<string, TsoaRoute.ParameterSchema> = {
                showId: {"in":"path","name":"showId","required":true,"dataType":"double"},
        };
        app.delete('/shows/:showId',
            ...(fetchMiddlewares<RequestHandler>(ShowController)),
            ...(fetchMiddlewares<RequestHandler>(ShowController.prototype.deleteShow)),

            async function ShowController_deleteShow(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsShowController_deleteShow, request, response });

                const controller = new ShowController();

              await templateService.apiHandler({
                methodName: 'deleteShow',
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
        const argsSeasonController_getSeasonById: Record<string, TsoaRoute.ParameterSchema> = {
                seasonId: {"in":"path","name":"seasonId","required":true,"dataType":"double"},
        };
        app.post('/seasons/getSeasonDet/:seasonId',
            ...(fetchMiddlewares<RequestHandler>(SeasonController)),
            ...(fetchMiddlewares<RequestHandler>(SeasonController.prototype.getSeasonById)),

            async function SeasonController_getSeasonById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSeasonController_getSeasonById, request, response });

                const controller = new SeasonController();

              await templateService.apiHandler({
                methodName: 'getSeasonById',
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
        const argsSeasonController_getSeasonsByShow: Record<string, TsoaRoute.ParameterSchema> = {
                showId: {"in":"path","name":"showId","required":true,"dataType":"double"},
        };
        app.get('/seasons/showDet/:showId',
            ...(fetchMiddlewares<RequestHandler>(SeasonController)),
            ...(fetchMiddlewares<RequestHandler>(SeasonController.prototype.getSeasonsByShow)),

            async function SeasonController_getSeasonsByShow(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSeasonController_getSeasonsByShow, request, response });

                const controller = new SeasonController();

              await templateService.apiHandler({
                methodName: 'getSeasonsByShow',
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
        const argsSeasonController_createSeason: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"body","name":"req","required":true,"ref":"ReqSeason"},
        };
        app.post('/seasons',
            ...(fetchMiddlewares<RequestHandler>(SeasonController)),
            ...(fetchMiddlewares<RequestHandler>(SeasonController.prototype.createSeason)),

            async function SeasonController_createSeason(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSeasonController_createSeason, request, response });

                const controller = new SeasonController();

              await templateService.apiHandler({
                methodName: 'createSeason',
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
        const argsSeasonController_updateSeason: Record<string, TsoaRoute.ParameterSchema> = {
                seasonId: {"in":"path","name":"seasonId","required":true,"dataType":"double"},
                req: {"in":"body","name":"req","required":true,"ref":"Partial_ReqSeason_"},
        };
        app.put('/seasons/:seasonId',
            ...(fetchMiddlewares<RequestHandler>(SeasonController)),
            ...(fetchMiddlewares<RequestHandler>(SeasonController.prototype.updateSeason)),

            async function SeasonController_updateSeason(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSeasonController_updateSeason, request, response });

                const controller = new SeasonController();

              await templateService.apiHandler({
                methodName: 'updateSeason',
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
        const argsSeasonController_deleteSeason: Record<string, TsoaRoute.ParameterSchema> = {
                seasonId: {"in":"path","name":"seasonId","required":true,"dataType":"double"},
        };
        app.delete('/seasons/:seasonId',
            ...(fetchMiddlewares<RequestHandler>(SeasonController)),
            ...(fetchMiddlewares<RequestHandler>(SeasonController.prototype.deleteSeason)),

            async function SeasonController_deleteSeason(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSeasonController_deleteSeason, request, response });

                const controller = new SeasonController();

              await templateService.apiHandler({
                methodName: 'deleteSeason',
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
        const argsEpisodeController_getEpisodesBySeason: Record<string, TsoaRoute.ParameterSchema> = {
                seasonId: {"in":"path","name":"seasonId","required":true,"dataType":"double"},
                page: {"default":1,"in":"query","name":"page","dataType":"double"},
                limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
        };
        app.get('/episodes/getEpisodeBySeason/:seasonId',
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.getEpisodesBySeason)),

            async function EpisodeController_getEpisodesBySeason(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEpisodeController_getEpisodesBySeason, request, response });

                const controller = new EpisodeController();

              await templateService.apiHandler({
                methodName: 'getEpisodesBySeason',
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
        const argsEpisodeController_getEpisodeById: Record<string, TsoaRoute.ParameterSchema> = {
                episodeId: {"in":"path","name":"episodeId","required":true,"dataType":"double"},
        };
        app.get('/episodes/:episodeId',
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.getEpisodeById)),

            async function EpisodeController_getEpisodeById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEpisodeController_getEpisodeById, request, response });

                const controller = new EpisodeController();

              await templateService.apiHandler({
                methodName: 'getEpisodeById',
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
        const argsEpisodeController_createEpisode: Record<string, TsoaRoute.ParameterSchema> = {
                seasonId: {"in":"path","name":"seasonId","required":true,"dataType":"double"},
                title: {"in":"query","name":"title","dataType":"string"},
                episode_desc: {"in":"query","name":"episode_desc","dataType":"string"},
                thumbnail: {"in":"query","name":"thumbnail","dataType":"string"},
                file: {"in":"formData","name":"file","dataType":"file"},
        };
        app.post('/episodes/:seasonId',
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.createEpisode)),

            async function EpisodeController_createEpisode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEpisodeController_createEpisode, request, response });

                const controller = new EpisodeController();

              await templateService.apiHandler({
                methodName: 'createEpisode',
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
        const argsEpisodeController_updateEpisode: Record<string, TsoaRoute.ParameterSchema> = {
                episodeId: {"in":"path","name":"episodeId","required":true,"dataType":"double"},
                req: {"in":"body","name":"req","required":true,"ref":"Partial_ReqEpisode_"},
        };
        app.put('/episodes/:episodeId',
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.updateEpisode)),

            async function EpisodeController_updateEpisode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEpisodeController_updateEpisode, request, response });

                const controller = new EpisodeController();

              await templateService.apiHandler({
                methodName: 'updateEpisode',
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
        const argsEpisodeController_deleteEpisode: Record<string, TsoaRoute.ParameterSchema> = {
                episodeId: {"in":"path","name":"episodeId","required":true,"dataType":"double"},
        };
        app.delete('/episodes/:episodeId',
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.deleteEpisode)),

            async function EpisodeController_deleteEpisode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEpisodeController_deleteEpisode, request, response });

                const controller = new EpisodeController();

              await templateService.apiHandler({
                methodName: 'deleteEpisode',
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
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
