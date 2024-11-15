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
exports.Content = void 0;
const typeorm_1 = require("typeorm");
const Blog_1 = require("./Blog");
const SubContent_1 = require("./SubContent");
let Content = class Content {
};
exports.Content = Content;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Content.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 4096,
    }),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 4096,
    }),
    __metadata("design:type", String)
], Content.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 1024,
        nullable: true
    }),
    __metadata("design:type", String)
], Content.prototype, "content_img", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Content.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => (Blog_1.Blog), (blog) => { blog.contents; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({
        name: 'blog_n_content',
        joinColumn: { name: 'content_id' },
        inverseJoinColumn: { name: 'blog_id' }
    }),
    __metadata("design:type", Promise)
], Content.prototype, "blogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => (SubContent_1.SubContent), (subcontent) => (subcontent), { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    __metadata("design:type", Array)
], Content.prototype, "sub_contents", void 0);
exports.Content = Content = __decorate([
    (0, typeorm_1.Entity)()
], Content);
//# sourceMappingURL=Content.js.map