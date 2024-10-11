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
exports.SubContentController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const SubContent_1 = require("../entity/SubContent");
const Content_1 = require("../entity/Content");
// import { exist } from "joi";
// import { ReqSubContentU } from "../models/req/ReqSubContentU";
let SubContentController = class SubContentController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.subcontentrepository = data_source_1.AppDataSource.getRepository(SubContent_1.SubContent);
        this.contentrepository = data_source_1.AppDataSource.getRepository(Content_1.Content);
    }
    async saveSubContent(blogId, contentId, request) {
        const content = await this.contentrepository.findOne({
            where: {
                id: contentId,
                blogs: {
                    id: blogId
                }
            },
        });
        if (!content) {
            return Promise.reject(new Error('CONTENT IS NOT FOUND'));
        }
        const { subContentDescription: description, subContentTitle: title } = request;
        const subContentToSave = {
            content: Promise.resolve(content),
            description: description,
            title: title
        };
        const saveSubContent = Object.assign(new SubContent_1.SubContent(), subContentToSave);
        const savedSubContent = await this.subcontentrepository.save(saveSubContent);
        const resSubContent = {
            id: savedSubContent.id,
            subContentDescription: savedSubContent.description,
            subContentTitle: savedSubContent.title,
            content: {
                contentImg: content.content_img,
                id: content.id,
                order: content.order,
                contentTitle: content.title
            },
        };
        return resSubContent;
    }
    async getAllSubContent(contentId, blogId) {
        const subContents = await this.subcontentrepository.find({
            where: {
                content: {
                    id: contentId,
                    blogs: {
                        id: blogId
                    }
                }
            },
            relations: {
                content: true
            }
        });
        if (!subContents) {
            return Promise.reject(new Error('SUBCONTENT NOT FOUND'));
        }
        const subContentArr = [];
        for (const subContent of subContents) {
            const content = await subContent.content;
            subContentArr.push({
                content: {
                    id: content?.id,
                    content: content?.content
                },
                subContentDescription: subContent.description,
                id: subContent.id,
                subContentTitle: subContent.title
            });
        }
        return subContentArr;
    }
    async getOneSubContent(contentId, blogId, subContentId) {
        const subcontent = await this.subcontentrepository.findOne({
            where: {
                id: subContentId,
                content: {
                    id: contentId,
                    blogs: {
                        id: blogId
                    }
                }
            }
        }).then(async (subcontent) => {
            if (!subcontent) {
                return Promise.reject(new Error('SUBCONTENT NOT FOUND'));
            }
            const content = await subcontent.content;
            const resSubContent = {
                content: content,
                subContentDescription: subcontent.description,
                id: subcontent.id,
                subContentTitle: subcontent.title
            };
            return resSubContent;
        }, () => {
            this.setStatus(400);
            return { error: 'THERE WAS A PROBLEM IN FETCHING THE SUBCONTENT' };
        });
        return subcontent;
    }
    async deleteSubContent(contentId, blogId, subContentId) {
        const subcontentToDelete = await this.subcontentrepository.findOne({
            where: {
                id: subContentId,
                content: {
                    id: contentId,
                    blogs: {
                        id: blogId
                    }
                }
            }
        });
        if (!subcontentToDelete) {
            return Promise.reject(new Error('SUBCONTENT TO DELETE NOT FOUND'));
        }
        await this.subcontentrepository.remove(subcontentToDelete);
        return { result: 'SUBCONTENT DELETED SUCCESSFULLY' };
    }
    // /**
    //  * to update the subcontent in the content of a blog
    //  */
    async updateSubContentOfContent(contentId, blogId, request, subContentId) {
        const { subContentDescription: description, subContentTitle: title } = request;
        // const content=await this.contentrepository.findOne({
        //     where:{
        //         id: contentId
        //     }
        // })
        const existingSubContent = await this.subcontentrepository.findOne({
            where: {
                id: subContentId,
                content: {
                    id: contentId,
                    blogs: {
                        id: blogId
                    }
                }
            }
        });
        if (!existingSubContent) {
            return Promise.reject(new Error('CONTENT NOT FOUND'));
        }
        existingSubContent.description = description,
            existingSubContent.title = title;
        const updatedSubContent = await this.subcontentrepository.save(existingSubContent);
        const resSubContent = {
            subContentDescription: updatedSubContent.description,
            id: updatedSubContent.id,
            subContentTitle: updatedSubContent.title
        };
        return resSubContent;
    }
};
exports.SubContentController = SubContentController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SubContentController.prototype, "saveSubContent", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SubContentController.prototype, "getAllSubContent", null);
__decorate([
    (0, tsoa_1.Get)('/{subContentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SubContentController.prototype, "getOneSubContent", null);
__decorate([
    (0, tsoa_1.Delete)('/{subContentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], SubContentController.prototype, "deleteSubContent", null);
__decorate([
    (0, tsoa_1.Put)('/{subContentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __param(3, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Number]),
    __metadata("design:returntype", Promise)
], SubContentController.prototype, "updateSubContentOfContent", null);
exports.SubContentController = SubContentController = __decorate([
    (0, tsoa_1.Tags)('SubContent'),
    (0, tsoa_1.Route)('blog/{blogId}/content/{contentId}/subContent')
], SubContentController);
//# sourceMappingURL=SubContentController.js.map