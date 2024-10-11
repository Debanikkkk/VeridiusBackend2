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
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const Blog_1 = require("./Blog");
let Comments = class Comments {
};
exports.Comments = Comments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 4096
    }),
    __metadata("design:type", String)
], Comments.prototype, "comment_body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 108
    }),
    __metadata("design:type", String)
], Comments.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Comments.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], Comments.prototype, "post_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => (Blog_1.Blog), (blog) => { blog.comments; }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'blog_id' }),
    __metadata("design:type", Promise)
], Comments.prototype, "blog", void 0);
exports.Comments = Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
//# sourceMappingURL=Comments.js.map