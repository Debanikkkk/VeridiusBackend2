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
exports.TagsController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Tags_1 = require("../entity/Tags");
const Blog_1 = require("../entity/Blog");
let TagsController = class TagsController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.tagsrepository = data_source_1.AppDataSource.getRepository(Tags_1.Tag);
        this.blogrepository = data_source_1.AppDataSource.getRepository(Blog_1.Blog);
        // @Put()
        // public async updateTagsInBlogs(@Path() blogId: number, @Body() request: ReqBlogTagU): Promise<ResTag>{
        //     const existingblog=await this.blogrepository.findOne({
        //         where:{
        //             id: blogId
        //         }
        //     })
        //     if(!existingblog){
        //         return Promise.reject(new Error('BLOG NOT FOUND'))
        //     }
        //     const {name}=request
        //     const tagToSave: Tag={
        //         name: name
        //     }
        //     const tagSaver
        //     const blogtagArr=existingblog.tags
        //     // existingbloh.tags
        // }
    }
    async saveTagsIntoBlog(blogId, request) {
        const blog = await this.blogrepository.findOne({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            return Promise.reject();
        }
        //     const blogArr: Blog[]=[]
        // blogArr.push(blog)
        const { name } = request;
        const tag = {
            name: name,
            // blogs: Promise.resolve(blogArr)
        };
        const tagsave = Object.assign(new Tags_1.Tag(), tag);
        const savedTag = await this.tagsrepository.save(tagsave);
        const db_tag = await this.tagsrepository.findOne({
            where: {
                id: savedTag.id
            },
        });
        if (!db_tag) {
            return Promise.reject(new Error('EXISTING TAGS NOT FOUND'));
        }
        const existingTAgsAdd = db_tag;
        const existingTAgs = blog.tags;
        if (!existingTAgs) {
            return Promise.reject(new Error('EXISTING TAGS NOT FOUND'));
        }
        (await existingTAgs)?.push(existingTAgsAdd);
        blog.tags = Promise.resolve(existingTAgs);
        console.log("upadated TAGS", blog.tags);
        const savedBlog = await this.blogrepository.save(blog);
        if (!savedBlog) {
            return Promise.reject(new Error('SAVED BLOG NOT FOUND'));
        }
        console.log({ "saved BLOG": savedBlog });
        console.log({ "saved BLOG TAGS": savedBlog.tags });
        const blogArr = [];
        blogArr.push(blog);
        const resTag = {
            id: savedTag.id,
            name: savedTag.name,
            blogs: {
                id: blog.id,
                blogDescription: blog.blog_description,
                blogSubtitle: blog.blog_subtitle,
                blogThumbnail: blog.blog_thumbnail,
                blogTitle: blog.blog_title,
                date: blog.post_time,
            }
        };
        return resTag;
    }
    async getAllTagForOneBlog(blogId) {
        const blog = await this.blogrepository.findOne({
            where: {
                id: blogId,
            },
            relations: {
                tags: true,
            }
        });
        if (!blog) {
            return Promise.reject(new Error('BLOG NOT FOUDN'));
        }
        const tags = await blog.tags;
        if (!tags) {
            return Promise.reject(new Error('TAGS NOT FOUND'));
        }
        const tagArr = [];
        for (const tag of tags) {
            tagArr.push({
                id: tag.id,
                name: tag.name
            });
        }
        return tagArr;
    }
    // @Get()
    // public async getAllTags(): Promise<ResTag[]>{
    //     const tags=await this.tagsrepository.find()
    //     if(!tags){
    //         return Promise.reject(new Error('TAGS NOT FOUND '))
    //     }
    //     const tagsArr: ResTag[]=[]
    //     for(const tag of tags){
    //         tagsArr.push({
    //             id: tag.id,
    //             name: tag.name,
    //         })
    //     }
    //     return tagsArr
    // }
    async getOneTag(tagId) {
        const tag = await this.tagsrepository.findOne({
            where: {
                id: tagId
            }, relations: {
                blogs: true
            }
        }).then((tag) => {
            if (!tag) {
                return Promise.reject(new Error('TAG IS NOT FOUND'));
            }
            const restag = {
                id: tag.id,
                name: tag.name,
                // blogs: [],
            };
            if (!restag.blogs) {
                return restag;
            }
            // tag.blogs?.then((blog)=>{
            //     restag.blogs=blog
            // })
            return restag;
        }, () => {
            this.setStatus(400);
            return { error: 'not found' };
        });
        return tag;
    }
    async deleteTag(tagId, blogId) {
        const tagtodelete = await this.tagsrepository.findOne({
            where: {
                id: tagId,
                blogs: {
                    id: blogId
                }
            }
        });
        if (!tagtodelete) {
            return Promise.reject(new Error('tag not found'));
        }
        await this.tagsrepository.remove(tagtodelete);
        return { result: 'TAG DELETED SUCCESSFULLY' };
    }
};
exports.TagsController = TagsController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "saveTagsIntoBlog", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "getAllTagForOneBlog", null);
__decorate([
    (0, tsoa_1.Get)('/{tagId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "getOneTag", null);
__decorate([
    (0, tsoa_1.Delete)('/{tagId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TagsController.prototype, "deleteTag", null);
exports.TagsController = TagsController = __decorate([
    (0, tsoa_1.Tags)('Tags'),
    (0, tsoa_1.Route)('blog/{blogId}/tags')
], TagsController);
//# sourceMappingURL=TagsController.js.map