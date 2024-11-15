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
exports.ContentController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Content_1 = require("../entity/Content");
const Blog_1 = require("../entity/Blog");
const fs = __importStar(require("fs"));
const SubContent_1 = require("../entity/SubContent");
function replaceBeforeLastDot(input, replacement) {
    const lastDotIndex = input.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return replacement + input.substring(lastDotIndex);
    }
    return input; // Return the original string if there is no period
}
let ContentController = class ContentController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.contentrepository = data_source_1.AppDataSource.getRepository(Content_1.Content);
        this.blogrepository = data_source_1.AppDataSource.getRepository(Blog_1.Blog);
        this.subcontentrepository = data_source_1.AppDataSource.getRepository(SubContent_1.SubContent);
    }
    async saveContent(blogId, content, order, contentTitle, file) {
        const blog = await this.blogrepository.find({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        let filePathToSave;
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = Array(10).fill(null).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        let stringWithoutSpaces;
        if (file) {
            const result = replaceBeforeLastDot(file.originalname, randomString);
            filePathToSave = './public/uploads/' + new Date().getTime() + "_" + result;
            stringWithoutSpaces = filePathToSave?.replace(/\s+/g, '_');
            fs.writeFileSync(stringWithoutSpaces, file.buffer, { flag: 'w' });
        }
        console.log("string without spaces", stringWithoutSpaces);
        const content_img = stringWithoutSpaces;
        console.log("thumbnail", content_img);
        console.log("saved image: -----", filePathToSave);
        // const contentsArr=blog[0].contents
        const db_blog_id = blog[0];
        const oneblog = await this.blogrepository.findOne({
            where: {
                id: db_blog_id.id
            }
        });
        if (!oneblog) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        const contentArr = oneblog.contents;
        if (!contentArr) {
            return Promise.reject(new Error('CONTENT NOT FOUND'));
        }
        const orderArr = [];
        console.log("order Array", orderArr);
        for (const content of await contentArr) {
            const contentOrder = await content.order;
            if (!contentOrder) {
                return Promise.reject(new Error('NOT FOUND'));
            }
            orderArr.push(contentOrder);
        }
        console.log("order Array", orderArr);
        console.log(typeof (order));
        const ordernum = Number(order);
        console.log("includes true?: ", orderArr.includes(order));
        if (orderArr.includes(ordernum)) {
            return { error: 'ORDER ALREADY PRESENT IN A CONTENT IN THIS BLOG' };
        }
        console.log("condition did not get checked");
        // : Promise<Content[]> | undefined
        // let filePathToSave
        // if(file){
        //     const filePathToSave = './public/uploads/' + new Date().getTime() + "_" + file.originalname;
        //     fs.writeFileSync(filePathToSave, file.buffer, { flag: 'w' });
        // }
        const contentz = {
            blogs: Promise.resolve(blog),
            content: content,
            content_img: content_img,
            order: order,
            title: contentTitle
        };
        const contentSave = Object.assign(new Content_1.Content(), contentz);
        const savedContent = await this.contentrepository.save(contentSave);
        const resContent = {
            id: savedContent.id,
            content: savedContent.content,
            contentImg: savedContent.content_img,
            order: savedContent.order,
            contentTitle: savedContent.title,
            blog: []
        };
        if (!savedContent.blogs) {
            return resContent;
        }
        savedContent.blogs?.then((blog) => {
            resContent.blog = blog.map((d) => {
                return {
                    id: d.id,
                    blogTitle: d.blog_title,
                    blogSubTitle: d.blog_subtitle,
                };
            });
            return resContent;
        });
        return resContent;
    }
    async deleteContent(blogId, contentId) {
        const contenttodelete = await this.contentrepository.findOne({
            where: {
                id: contentId,
                blogs: {
                    id: blogId
                }
            }
        });
        if (!contenttodelete) {
            return Promise.reject(new Error('CONTENT TO DELETE NOT FOUND'));
        }
        await this.contentrepository.remove(contenttodelete);
        return { result: 'CONTENT SUCCESSFULLY DELETED' };
    }
    async getAllContentOfOneBlog(blogId) {
        const contents = await this.contentrepository.find({
            where: {
                blogs: {
                    id: blogId
                }
            }
        });
        if (!contents) {
            return Promise.reject(new Error('NO CONTENTS FOUND'));
        }
        const contentArr = [];
        for (const content of contents) {
            const subcontent = await this.subcontentrepository.find({
                where: {
                    content: {
                        id: content.id
                    }
                }
            });
            contentArr.push({
                id: content.id,
                content: content.content,
                contentImg: content.content_img,
                order: content.order,
                contentTitle: content.title,
                subcontent: subcontent
            });
        }
        return contentArr;
    }
    async getOneContent(blogId, contentId) {
        const content = await this.contentrepository.findOne({
            where: {
                id: contentId,
                blogs: {
                    id: blogId
                }
            }
        }).then(async (content) => {
            if (!content) {
                return Promise.reject(new Error('CONTENT NOT FOUND'));
            }
            const subcontnet = await this.subcontentrepository.find({
                where: {
                    content: {
                        id: content.id
                    }
                }
            });
            const subcontnetArr = [];
            for (const subcontent of subcontnet) {
                subcontnetArr.push({
                    id: subcontent.id,
                    subContentDescription: subcontent.description,
                    subContentTitle: subcontent.title
                });
            }
            const resContent = {
                id: content.id,
                content: content.content,
                contentImg: content.content_img,
                order: content.order,
                contentTitle: content.title,
                subcontent: subcontnetArr
            };
            return resContent;
        }, () => {
            this.setStatus(400);
            return { error: 'err' };
        });
        return content;
    }
    async updateContent(blogId, contentId, content, order, title, file) {
        const existingcontent = await this.contentrepository.findOne({
            where: {
                id: contentId,
                blogs: {
                    id: blogId
                }
            }
        });
        if (!existingcontent) {
            return Promise.reject(new Error('CONTENT TO BE UPDATED NOT FOUND'));
        }
        let filePathToSave;
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = Array(10).fill(null).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        if (file) {
            const result = replaceBeforeLastDot(file.originalname, randomString);
            filePathToSave = './public/uploads/' + new Date().getTime() + "_" + result;
            fs.writeFileSync(filePathToSave, file.buffer, { flag: 'w' });
        }
        existingcontent.content = content,
            existingcontent.order = order,
            existingcontent.content_img = filePathToSave,
            existingcontent.title = title;
        const updatedContent = await this.contentrepository.save(existingcontent);
        const resContent = {
            id: updatedContent.id,
            content: updatedContent.content,
            contentImg: updatedContent.content_img,
            order: updatedContent.order,
            contentTitle: updatedContent.title
        };
        return resContent;
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.FormField)()),
    __param(2, (0, tsoa_1.FormField)()),
    __param(3, (0, tsoa_1.FormField)()),
    __param(4, (0, tsoa_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "saveContent", null);
__decorate([
    (0, tsoa_1.Delete)('/{contentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "deleteContent", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAllContentOfOneBlog", null);
__decorate([
    (0, tsoa_1.Get)('/{contentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getOneContent", null);
__decorate([
    (0, tsoa_1.Put)('/{contentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.FormField)()),
    __param(3, (0, tsoa_1.FormField)()),
    __param(4, (0, tsoa_1.FormField)()),
    __param(5, (0, tsoa_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateContent", null);
exports.ContentController = ContentController = __decorate([
    (0, tsoa_1.Tags)('Content'),
    (0, tsoa_1.Route)('/blog/{blogId}/content')
], ContentController);
//# sourceMappingURL=ContentController.js.map