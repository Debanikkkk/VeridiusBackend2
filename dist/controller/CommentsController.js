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
exports.CommentController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Comments_1 = require("../entity/Comments");
const Blog_1 = require("../entity/Blog");
let CommentController = class CommentController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.commentrepository = data_source_1.AppDataSource.getRepository(Comments_1.Comments);
        this.blogrepository = data_source_1.AppDataSource.getRepository(Blog_1.Blog);
    }
    async saveComment(blogId, request) {
        const blog = await this.blogrepository.findOne({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            return Promise.reject(new Error('BLOG NOT FOUND'));
        }
        const { author, commentBody: comment_body, status } = request;
        const commentToSave = {
            author: author,
            blog: Promise.resolve(blog),
            comment_body: comment_body,
            status: status
        };
        const commentSaver = Object.assign(new Comments_1.Comments(), commentToSave);
        const savedComment = await this.commentrepository.save(commentSaver);
        const resComment = {
            id: savedComment.id,
            author: savedComment.author,
            commentBody: savedComment.comment_body,
            postTime: savedComment.post_time,
            blog: {
                id: blog.id,
                blogTitle: blog.blog_title
            },
            status: savedComment.status,
        };
        return resComment;
    }
    async getAllComment(blogId) {
        const comments = await this.commentrepository.find({
            where: {
                blog: {
                    id: blogId,
                }
            },
            relations: {
                blog: true
            }
        });
        const commentArr = [];
        for (const comment of comments) {
            const blog = await this.blogrepository.findOne({
                where: {
                    id: blogId
                }
            });
            if (!blog) {
                return Promise.reject(new Error('BLOG NOT FOUND'));
            }
            commentArr.push({
                id: comment.id,
                author: comment.author,
                blog: {
                    id: blog.id,
                    blogTitle: blog.blog_title
                },
                commentBody: comment.comment_body,
                postTime: comment.post_time,
                status: comment.status
            });
        }
        return commentArr;
    }
    async deleteComment(blogId, commentId) {
        const commentToDelete = await this.commentrepository.findOne({
            where: {
                id: commentId,
                blog: {
                    id: blogId
                }
            }
        });
        if (!commentToDelete) {
            return Promise.reject(new Error('COMMENT IS DELETED'));
        }
        await this.commentrepository.remove(commentToDelete);
        return { result: 'COMMENT DELETED SUCCESSFULLY' };
    }
    async updateComment(blogId, commentId, request) {
        const existingComment = await this.commentrepository.findOne({
            where: {
                id: commentId,
                blog: {
                    id: blogId
                }
            }
        });
        if (!existingComment) {
            return Promise.reject(new Error('EXISITNG COMMENT NOT FOUND'));
        }
        const { status } = request;
        existingComment.status = status;
        const updatedComment = await this.commentrepository.save(existingComment);
        const blog = await this.blogrepository.findOne({
            where: {
                id: blogId
            }
        });
        const resComment = {
            id: updatedComment.id,
            author: updatedComment.author,
            blog: {
                id: blog?.id,
                blogTitle: blog?.blog_title,
                // content: blog?.contents,
                date: blog?.post_time
            },
            commentBody: updatedComment.comment_body,
            postTime: updatedComment.post_time,
            status: updatedComment.status
        };
        return resComment;
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "saveComment", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComment", null);
__decorate([
    (0, tsoa_1.Delete)('/{commentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, tsoa_1.Put)('/{commentId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
exports.CommentController = CommentController = __decorate([
    (0, tsoa_1.Tags)('Comments'),
    (0, tsoa_1.Route)('/blog/{blogId}/comment')
], CommentController);
//# sourceMappingURL=CommentsController.js.map