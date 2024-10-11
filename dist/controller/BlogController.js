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
exports.BlogController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Blog_1 = require("../entity/Blog");
const Content_1 = require("../entity/Content");
const Tags_1 = require("../entity/Tags");
// import { ReqBlog } from '../models/req/ReqBlog';
// import { ReqBlogU } from '../models/req/ReqBlogU';
const fs = __importStar(require("fs"));
const SubContent_1 = require("../entity/SubContent");
function replaceBeforeLastDot(input, replacement) {
    const lastDotIndex = input.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return replacement + input.substring(lastDotIndex);
    }
    return input; // Return the original string if there is no period
}
let BlogController = class BlogController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.blogrepository = data_source_1.AppDataSource.getRepository(Blog_1.Blog);
        this.contentrepository = data_source_1.AppDataSource.getRepository(Content_1.Content);
        this.tagsrepository = data_source_1.AppDataSource.getRepository(Tags_1.Tag);
        this.subcontentrepository = data_source_1.AppDataSource.getRepository(SubContent_1.SubContent);
    }
    // private userrepository = AppDataSource.getRepository(User)
    /**
     * save blog
     *  @summary saves blog
     */
    async saveBlog(blogSubtitle, blogTitle, secretKey, blogDescription, blogAuthor, file) {
        // const {blog_subtitle,blog_title, secret_key, blog_description}=request
        if (secretKey !== 'CCBxZgzRIAwYmhx9') {
            return { result: 'ACCESS DENIED' };
        }
        let filePathToSave;
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = Array(10).fill(null).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        let stringWithoutSpaces;
        if (file) {
            const result = replaceBeforeLastDot(file.originalname, randomString);
            filePathToSave = './public/uploads/' + blogTitle + new Date().getTime() + "_" + result;
            stringWithoutSpaces = filePathToSave?.replace(/\s+/g, '_');
            fs.writeFileSync(stringWithoutSpaces, file.buffer, { flag: 'w' });
        }
        console.log("string without spaces", stringWithoutSpaces);
        const thumbnail = stringWithoutSpaces;
        console.log("thumbnail", thumbnail);
        console.log("saved image: -----", filePathToSave);
        const blogtosave = {
            blog_subtitle: blogSubtitle,
            blog_title: blogTitle,
            blog_description: blogDescription,
            blog_thumbnail: thumbnail,
            blog_author: blogAuthor
            // status: status
        };
        const blogsaver = Object.assign(new Blog_1.Blog(), blogtosave);
        const savedblog = await this.blogrepository.save(blogsaver);
        const resBlog = {
            id: savedblog.id,
            blogSubtitle: savedblog.blog_subtitle,
            blogDescription: savedblog.blog_description,
            blogTitle: savedblog.blog_title,
            date: savedblog.post_time,
            blogThumbnail: savedblog.blog_thumbnail,
            status: savedblog.status,
            blogAuthor: savedblog.blog_author
        };
        return resBlog;
    }
    /**
     * gets all blog
     *  @summary gets all blog
     */
    async getAllBlog() {
        console.log({ apistart: "api has started" });
        const blogs = await this.blogrepository.find({
            relations: {
                contents: true,
                tags: true
            }
        });
        if (!blogs) {
            return Promise.reject(new Error('BLOGS NOT FOUND'));
        }
        const blogArr = [];
        for (const blog of blogs) {
            const content = await blog.contents;
            if (!content) {
                return Promise.reject(new Error('CONTENT NOT FOUND'));
            }
            const contentArr = [];
            for (const contentz of content) {
                const subcontent = await this.subcontentrepository.find({
                    where: {
                        content: {
                            id: contentz.id
                        }
                    }
                });
                if (!subcontent) {
                    return Promise.reject(new Error('NOT FOUND'));
                }
                const subcontentArr = [];
                console.log(subcontent);
                // subcontent?.forEach((sub)=>{
                //   const subcontent: ResSubContent={
                //     subContentDescription: sub.description,
                //     id: sub.id,
                //     subContentTitle: sub.title
                //   }
                //   subcontentArr.push(subcontent)
                // })
                for (const sub of subcontent) {
                    const subcontent = {
                        subContentDescription: sub.description,
                        id: sub.id,
                        subContentTitle: sub.title
                    };
                    subcontentArr.push(subcontent);
                }
                console.log(subcontentArr);
                const contentArrtoResContent = {
                    id: contentz.id,
                    content: contentz.content,
                    contentImg: contentz.content_img,
                    order: contentz.order,
                    contentTitle: contentz.title,
                    subcontent: subcontentArr
                };
                contentArr.push(contentArrtoResContent);
            }
            const tag = await blog.tags;
            const tagArr = [];
            tag?.forEach((tag) => {
                const tagarrtorestag = {
                    id: tag.id,
                    name: tag.name,
                };
                tagArr.push(tagarrtorestag);
            });
            console.log(tagArr);
            blogArr.push({
                id: blog.id,
                blogSubtitle: blog.blog_subtitle,
                blogDescription: blog.blog_description,
                blogTitle: blog.blog_title,
                content: contentArr,
                blogThumbnail: blog.blog_thumbnail,
                date: blog.post_time,
                tags: tagArr,
                blogAuthor: blog.blog_author,
                status: blog.status
            });
        }
        return blogArr;
    }
    /**
     * get one blog
     *  @summary gets one blog
     */
    async getOneBlog(blogId) {
        const blog = await this.blogrepository
            .findOne({
            where: {
                id: blogId,
            }, relations: {
                contents: true,
                tags: true,
            }
        })
            .then(async (blog) => {
            if (!blog) {
                return Promise.reject(new Error('BLOG NOT FOUND'));
            }
            const resBlog = {
                id: blog.id,
                blogDescription: blog.blog_description,
                blogSubtitle: blog.blog_subtitle,
                blogTitle: blog.blog_title,
                blogAuthor: blog.blog_author,
                status: blog.status,
                date: blog.post_time,
                content: [],
                tags: [],
                blogThumbnail: blog.blog_thumbnail,
            };
            if (!resBlog.content) {
                return resBlog;
            }
            const contents = await blog.contents;
            if (!contents) {
                return Promise.reject(new Error('CONTENTS NOT FOUND'));
            }
            // blog.contents?.then((contentz) => {
            const contentArr = [];
            for (const content of contents) {
                const subcontents = await this.subcontentrepository.find({
                    where: {
                        content: {
                            id: content.id
                        }
                    }
                });
                if (!subcontents) {
                    return Promise.reject(new Error('SUB CONTENT NOT FOUND'));
                }
                const subcontentArr = [];
                for (const subcontent of subcontents) {
                    subcontentArr.push({
                        // content: subcontent.content,
                        description: subcontent.description,
                        id: subcontent.id,
                        title: subcontent.title
                    });
                }
                contentArr.push({
                    // blogs: content.,
                    content: content.content,
                    content_img: content.content_img,
                    id: content.id,
                    order: content.order,
                    sub_contents: subcontentArr,
                    title: content.title
                });
            }
            resBlog.content = contentArr;
            if (!resBlog.tags) {
                return resBlog;
            }
            blog.tags?.then((tagz) => {
                const resTags = [];
                tagz.forEach(t => {
                    const restg = {
                        id: t.id,
                        name: t.name
                    };
                    resTags.push(restg);
                });
                resBlog.tags = resTags;
            });
            return resBlog;
        }, () => {
            this.setStatus(400);
            return { error: 'err' };
        });
        return blog;
    }
    // /**
    //  * delete blog
    //  *  @summary deltes blog
    //  */
    async deleteBlog(blogId, secretKey) {
        if (secretKey !== 'CCBxZgzRIAwYmhx9') {
            return { result: 'ACCESS DENIED' };
        }
        const blogtodelete = await this.blogrepository.findOne({
            where: {
                id: blogId,
            },
        });
        if (!blogtodelete) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        await this.blogrepository.remove(blogtodelete);
        return { result: 'BLOG DELETED SUCCESSFULLY' };
    }
    async updateBlog(blogId, blogSubtitle, blogTitle, secretKey, blogDescription, blogAuthor, file) {
        if (secretKey !== 'CCBxZgzRIAwYmhx9') {
            return { result: 'ACCESS DENIED' };
        }
        const existingBlog = await this.blogrepository.findOne({
            where: {
                id: blogId
            }
        });
        if (!existingBlog) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        // const {blogSubtitle: blog_subtitle, blogTitle: blog_title,content,blogDescription: blog_description,tags}=req
        existingBlog.blog_description = blogDescription;
        existingBlog.blog_subtitle = blogSubtitle;
        existingBlog.blog_title = blogTitle;
        existingBlog.blog_author = blogAuthor;
        let filePathToSave;
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const randomString = Array(10).fill(null).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        if (file) {
            const result = replaceBeforeLastDot(file.originalname, randomString);
            filePathToSave = './public/uploads/' + blogTitle + new Date().getTime() + "_" + result;
            fs.writeFileSync(filePathToSave, file.buffer, { flag: 'w' });
        }
        existingBlog.blog_thumbnail = filePathToSave;
        const updatedBlog = await this.blogrepository.save(existingBlog);
        const resBLog = {
            id: updatedBlog.id,
            date: updatedBlog.post_time,
            blogTitle: updatedBlog.blog_title,
            blogSubtitle: updatedBlog.blog_subtitle,
            blogAuthor: updatedBlog.blog_author,
            status: updatedBlog.status
            // content: contentArr,
            // tags: tagArr,
        };
        return resBLog;
    }
    async updateBlogStatus(blogId, request) {
        const existingBlog = await this.blogrepository.findOne({
            where: {
                id: blogId
            }
        });
        if (!existingBlog) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        const { status } = request;
        // const {blogSubtitle: blog_subtitle, blogTitle: blog_title,content,blogDescription: blog_description,tags}=req
        existingBlog.status = status;
        const updatedBlog = await this.blogrepository.save(existingBlog);
        const resBLog = {
            id: updatedBlog.id,
            date: updatedBlog.post_time,
            blogTitle: updatedBlog.blog_title,
            blogSubtitle: updatedBlog.blog_subtitle,
            blogAuthor: updatedBlog.blog_author,
            status: updatedBlog.status
            // content: contentArr,
            // tags: tagArr,
        };
        return resBLog;
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, tsoa_1.Post)()
    // @Security('Api-Token', [])
    ,
    __param(0, (0, tsoa_1.FormField)()),
    __param(1, (0, tsoa_1.FormField)()),
    __param(2, (0, tsoa_1.FormField)()),
    __param(3, (0, tsoa_1.FormField)()),
    __param(4, (0, tsoa_1.FormField)()),
    __param(5, (0, tsoa_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "saveBlog", null);
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlog", null);
__decorate([
    (0, tsoa_1.Get)('/{blogId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getOneBlog", null);
__decorate([
    (0, tsoa_1.Delete)('/{blogId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
__decorate([
    (0, tsoa_1.Put)('/{blogId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.FormField)()),
    __param(2, (0, tsoa_1.FormField)()),
    __param(3, (0, tsoa_1.FormField)()),
    __param(4, (0, tsoa_1.FormField)()),
    __param(5, (0, tsoa_1.FormField)()),
    __param(6, (0, tsoa_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
__decorate([
    (0, tsoa_1.Put)('statusUpdate/{blogId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlogStatus", null);
exports.BlogController = BlogController = __decorate([
    (0, tsoa_1.Tags)('Blog'),
    (0, tsoa_1.Route)('blog')
], BlogController);
//# sourceMappingURL=BlogController.js.map