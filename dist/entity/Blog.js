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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const typeorm_1 = require("typeorm");
const Tags_1 = require("./Tags");
const Content_1 = require("./Content");
const Comments_1 = require("./Comments");
let Blog = class Blog {
};
exports.Blog = Blog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Blog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "blog_title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "blog_description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "blog_thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "blog_subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Blog.prototype, "blog_author", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], Blog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Blog.prototype, "post_time", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => (Tags_1.Tag), (tag) => { tag.blogs; }, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: 'blog_n_tags',
        joinColumn: { name: 'blog_id' },
        inverseJoinColumn: { name: 'tag_id' }
    }),
    __metadata("design:type", Promise)
], Blog.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => (Content_1.Content), (content) => { content.blogs; }, { nullable: true }),
    (0, typeorm_1.JoinTable)({
        name: 'blog_n_content',
        joinColumn: { name: 'blog_id' },
        inverseJoinColumn: { name: 'content_id' }
    }),
    __metadata("design:type", Promise)
], Blog.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => (Comments_1.Comments), (comment) => { comment.blog; }),
    __metadata("design:type", Promise)
], Blog.prototype, "comments", void 0);
exports.Blog = Blog = __decorate([
    (0, typeorm_1.Entity)()
], Blog);
//# sourceMappingURL=Blog.js.map