"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const TagsController_1 = require("./../controller/TagsController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const SubContentController_1 = require("./../controller/SubContentController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const regExController_1 = require("./../controller/regExController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ContentController_1 = require("./../controller/ContentController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CommentsController_1 = require("./../controller/CommentsController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const BlogController_1 = require("./../controller/BlogController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const AdminController_1 = require("./../controller/AdminController");
const authentication_1 = require("./../authentication");
const multer = require('multer');
const expressAuthenticationRecasted = authentication_1.expressAuthentication;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ResContent": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "content": { "dataType": "string" },
            "contentImg": { "dataType": "string" },
            "order": { "dataType": "double" },
            "contentTitle": { "dataType": "string" },
            "subcontent": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResSubContent" } },
            "blog": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResBlog" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Blog": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "blog_title": { "dataType": "string" },
            "blog_description": { "dataType": "string" },
            "blog_thumbnail": { "dataType": "string" },
            "blog_subtitle": { "dataType": "string" },
            "blog_author": { "dataType": "string" },
            "status": { "dataType": "boolean" },
            "post_time": { "dataType": "datetime" },
            "tags": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Tag" } },
            "contents": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Content" } },
            "comments": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Comments" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tag": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "blogs": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Blog" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Content": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "title": { "dataType": "string" },
            "content": { "dataType": "string" },
            "content_img": { "dataType": "string" },
            "order": { "dataType": "double" },
            "blogs": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Blog" } },
            "sub_contents": { "dataType": "array", "array": { "dataType": "refObject", "ref": "SubContent" } },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Comments": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "comment_body": { "dataType": "string" },
            "author": { "dataType": "string" },
            "status": { "dataType": "boolean" },
            "post_time": { "dataType": "datetime" },
            "blog": { "ref": "Blog" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SubContent": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "title": { "dataType": "string" },
            "description": { "dataType": "string" },
            "content": { "ref": "Content" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResSubContent": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "subContentTitle": { "dataType": "string" },
            "content": { "dataType": "union", "subSchemas": [{ "ref": "ResContent" }, { "ref": "Content" }] },
            "subContentDescription": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResBlog": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "blogSubtitle": { "dataType": "string" },
            "blogTitle": { "dataType": "string" },
            "date": { "dataType": "datetime" },
            "blogDescription": { "dataType": "string" },
            "content": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResContent" } },
            "tags": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ResTag" } },
            "blogThumbnail": { "dataType": "string" },
            "status": { "dataType": "boolean" },
            "blogAuthor": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResTag": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "blogs": { "dataType": "union", "subSchemas": [{ "dataType": "array", "array": { "dataType": "refObject", "ref": "ResBlog" } }, { "dataType": "array", "array": { "dataType": "refObject", "ref": "Blog" } }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResTagN": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "blogs": { "ref": "ResBlog" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqTag": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
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
    "ResSuccess": {
        "dataType": "refObject",
        "properties": {
            "result": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqSubContent": {
        "dataType": "refObject",
        "properties": {
            "subContentTitle": { "dataType": "string" },
            "subContentDescription": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResComments": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "author": { "dataType": "string" },
            "commentBody": { "dataType": "string" },
            "postTime": { "dataType": "datetime" },
            "status": { "dataType": "boolean" },
            "blog": { "ref": "ResBlog" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqComments": {
        "dataType": "refObject",
        "properties": {
            "author": { "dataType": "string" },
            "commentBody": { "dataType": "string" },
            "status": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqCommentU": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqBlogStatus": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReqAdminLogin": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string" },
            "password": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app, opts) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const upload = opts?.multer || multer({ "limits": { "fileSize": 8388608 } });
    app.post('/blog/:blogId/tags', ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController)), ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController.prototype.saveTagsIntoBlog)), async function TagsController_saveTagsIntoBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqTag" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new TagsController_1.TagsController();
            await templateService.apiHandler({
                methodName: 'saveTagsIntoBlog',
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
    app.get('/blog/:blogId/tags', ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController)), ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController.prototype.getAllTagForOneBlog)), async function TagsController_getAllTagForOneBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new TagsController_1.TagsController();
            await templateService.apiHandler({
                methodName: 'getAllTagForOneBlog',
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
    app.get('/blog/:blogId/tags/:tagId', ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController)), ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController.prototype.getOneTag)), async function TagsController_getOneTag(request, response, next) {
        const args = {
            tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new TagsController_1.TagsController();
            await templateService.apiHandler({
                methodName: 'getOneTag',
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
    app.delete('/blog/:blogId/tags/:tagId', ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController)), ...((0, runtime_1.fetchMiddlewares)(TagsController_1.TagsController.prototype.deleteTag)), async function TagsController_deleteTag(request, response, next) {
        const args = {
            tagId: { "in": "path", "name": "tagId", "required": true, "dataType": "double" },
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new TagsController_1.TagsController();
            await templateService.apiHandler({
                methodName: 'deleteTag',
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
    app.post('/blog/:blogId/content/:contentId/subContent', ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController)), ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController.prototype.saveSubContent)), async function SubContentController_saveSubContent(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqSubContent" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new SubContentController_1.SubContentController();
            await templateService.apiHandler({
                methodName: 'saveSubContent',
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
    app.get('/blog/:blogId/content/:contentId/subContent', ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController)), ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController.prototype.getAllSubContent)), async function SubContentController_getAllSubContent(request, response, next) {
        const args = {
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new SubContentController_1.SubContentController();
            await templateService.apiHandler({
                methodName: 'getAllSubContent',
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
    app.get('/blog/:blogId/content/:contentId/subContent/:subContentId', ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController)), ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController.prototype.getOneSubContent)), async function SubContentController_getOneSubContent(request, response, next) {
        const args = {
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            subContentId: { "in": "path", "name": "subContentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new SubContentController_1.SubContentController();
            await templateService.apiHandler({
                methodName: 'getOneSubContent',
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
    app.delete('/blog/:blogId/content/:contentId/subContent/:subContentId', ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController)), ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController.prototype.deleteSubContent)), async function SubContentController_deleteSubContent(request, response, next) {
        const args = {
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            subContentId: { "in": "path", "name": "subContentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new SubContentController_1.SubContentController();
            await templateService.apiHandler({
                methodName: 'deleteSubContent',
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
    app.put('/blog/:blogId/content/:contentId/subContent/:subContentId', ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController)), ...((0, runtime_1.fetchMiddlewares)(SubContentController_1.SubContentController.prototype.updateSubContentOfContent)), async function SubContentController_updateSubContentOfContent(request, response, next) {
        const args = {
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqSubContent" },
            subContentId: { "in": "path", "name": "subContentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new SubContentController_1.SubContentController();
            await templateService.apiHandler({
                methodName: 'updateSubContentOfContent',
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
    app.get('/regex', ...((0, runtime_1.fetchMiddlewares)(regExController_1.resExController)), ...((0, runtime_1.fetchMiddlewares)(regExController_1.resExController.prototype.regexSearch)), async function resExController_regexSearch(request, response, next) {
        const args = {
            searchItem: { "in": "query", "name": "searchItem", "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new regExController_1.resExController();
            await templateService.apiHandler({
                methodName: 'regexSearch',
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
    app.post('/blog/:blogId/content', upload.fields([{ "name": "file", "maxCount": 1, "multiple": false }]), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController.prototype.saveContent)), async function ContentController_saveContent(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            content: { "in": "formData", "name": "content", "required": true, "dataType": "string" },
            order: { "in": "formData", "name": "order", "required": true, "dataType": "string" },
            contentTitle: { "in": "formData", "name": "contentTitle", "required": true, "dataType": "string" },
            file: { "in": "formData", "name": "file", "dataType": "file" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ContentController_1.ContentController();
            await templateService.apiHandler({
                methodName: 'saveContent',
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
    app.delete('/blog/:blogId/content/:contentId', ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController.prototype.deleteContent)), async function ContentController_deleteContent(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ContentController_1.ContentController();
            await templateService.apiHandler({
                methodName: 'deleteContent',
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
    app.get('/blog/:blogId/content', ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController.prototype.getAllContentOfOneBlog)), async function ContentController_getAllContentOfOneBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ContentController_1.ContentController();
            await templateService.apiHandler({
                methodName: 'getAllContentOfOneBlog',
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
    app.get('/blog/:blogId/content/:contentId', ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController.prototype.getOneContent)), async function ContentController_getOneContent(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ContentController_1.ContentController();
            await templateService.apiHandler({
                methodName: 'getOneContent',
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
    app.put('/blog/:blogId/content/:contentId', upload.fields([{ "name": "file", "maxCount": 1, "multiple": false }]), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController)), ...((0, runtime_1.fetchMiddlewares)(ContentController_1.ContentController.prototype.updateContent)), async function ContentController_updateContent(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            contentId: { "in": "path", "name": "contentId", "required": true, "dataType": "double" },
            content: { "in": "formData", "name": "content", "required": true, "dataType": "string" },
            order: { "in": "formData", "name": "order", "required": true, "dataType": "string" },
            title: { "in": "formData", "name": "title", "required": true, "dataType": "string" },
            file: { "in": "formData", "name": "file", "dataType": "file" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new ContentController_1.ContentController();
            await templateService.apiHandler({
                methodName: 'updateContent',
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
    app.post('/blog/:blogId/comment', ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController)), ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController.prototype.saveComment)), async function CommentController_saveComment(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqComments" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new CommentsController_1.CommentController();
            await templateService.apiHandler({
                methodName: 'saveComment',
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
    app.get('/blog/:blogId/comment', ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController)), ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController.prototype.getAllComment)), async function CommentController_getAllComment(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new CommentsController_1.CommentController();
            await templateService.apiHandler({
                methodName: 'getAllComment',
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
    app.delete('/blog/:blogId/comment/:commentId', ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController)), ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController.prototype.deleteComment)), async function CommentController_deleteComment(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            commentId: { "in": "path", "name": "commentId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new CommentsController_1.CommentController();
            await templateService.apiHandler({
                methodName: 'deleteComment',
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
    app.put('/blog/:blogId/comment/:commentId', ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController)), ...((0, runtime_1.fetchMiddlewares)(CommentsController_1.CommentController.prototype.updateComment)), async function CommentController_updateComment(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            commentId: { "in": "path", "name": "commentId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqCommentU" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new CommentsController_1.CommentController();
            await templateService.apiHandler({
                methodName: 'updateComment',
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
    app.post('/blog', upload.fields([{ "name": "file", "maxCount": 1, "multiple": false }]), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.saveBlog)), async function BlogController_saveBlog(request, response, next) {
        const args = {
            blogSubtitle: { "in": "formData", "name": "blogSubtitle", "dataType": "string" },
            blogTitle: { "in": "formData", "name": "blogTitle", "dataType": "string" },
            secretKey: { "in": "formData", "name": "secretKey", "dataType": "string" },
            blogDescription: { "in": "formData", "name": "blogDescription", "dataType": "string" },
            blogAuthor: { "in": "formData", "name": "blogAuthor", "dataType": "string" },
            file: { "in": "formData", "name": "file", "dataType": "file" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'saveBlog',
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
    app.get('/blog', ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.getAllBlog)), async function BlogController_getAllBlog(request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'getAllBlog',
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
    app.get('/blog/:blogId', ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.getOneBlog)), async function BlogController_getOneBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'getOneBlog',
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
    app.delete('/blog/:blogId', ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.deleteBlog)), async function BlogController_deleteBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            secretKey: { "in": "query", "name": "secretKey", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'deleteBlog',
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
    app.put('/blog/:blogId', upload.fields([{ "name": "file", "maxCount": 1, "multiple": false }]), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.updateBlog)), async function BlogController_updateBlog(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            blogSubtitle: { "in": "formData", "name": "blogSubtitle", "dataType": "string" },
            blogTitle: { "in": "formData", "name": "blogTitle", "dataType": "string" },
            secretKey: { "in": "formData", "name": "secretKey", "dataType": "string" },
            blogDescription: { "in": "formData", "name": "blogDescription", "dataType": "string" },
            blogAuthor: { "in": "formData", "name": "blogAuthor", "dataType": "string" },
            file: { "in": "formData", "name": "file", "dataType": "file" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'updateBlog',
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
    app.put('/blog/statusUpdate/:blogId', ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController)), ...((0, runtime_1.fetchMiddlewares)(BlogController_1.BlogController.prototype.updateBlogStatus)), async function BlogController_updateBlogStatus(request, response, next) {
        const args = {
            blogId: { "in": "path", "name": "blogId", "required": true, "dataType": "double" },
            request: { "in": "body", "name": "request", "required": true, "ref": "ReqBlogStatus" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new BlogController_1.BlogController();
            await templateService.apiHandler({
                methodName: 'updateBlogStatus',
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
    app.post('/admin', ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController)), ...((0, runtime_1.fetchMiddlewares)(AdminController_1.AdminController.prototype.adminLogin)), async function AdminController_adminLogin(request, response, next) {
        const args = {
            req: { "in": "body", "name": "req", "required": true, "ref": "ReqAdminLogin" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new AdminController_1.AdminController();
            await templateService.apiHandler({
                methodName: 'adminLogin',
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
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map