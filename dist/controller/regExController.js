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
exports.resExController = void 0;
const tsoa_1 = require("tsoa");
const data_source_1 = require("../data-source");
const Blog_1 = require("../entity/Blog");
const Tags_1 = require("../entity/Tags");
const typeorm_1 = require("typeorm");
let resExController = class resExController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.blogrepository = data_source_1.AppDataSource.getRepository(Blog_1.Blog);
        this.tagrepository = data_source_1.AppDataSource.getRepository(Tags_1.Tag);
    }
    async regexSearch(searchItem) {
        const contents = await this.blogrepository.find({
            relations: {
                tags: true
            }
        });
        const generalTag = await this.tagrepository.find();
        if (!contents) {
            return contents;
        }
        // Check if searchTerm is a string
        if (typeof searchItem !== 'string') {
            // Handle the case where searchTerm is not a string (undefined or any other type)
            return contents; // or return an empty array or handle it as needed
        }
        // Perform regex search on the contents
        const regex = new RegExp(searchItem, 'i');
        const result = contents.filter(content => regex.test(content.blog_title));
        const resultTags = generalTag.filter(content => regex.test(content.name));
        const resultTagIdArr = [];
        for (const resulttag of resultTags) {
            resultTagIdArr.push(resulttag.id);
        }
        const blogtagsearch = await this.blogrepository.find({
            where: {
                tags: {
                    id: (0, typeorm_1.In)(resultTagIdArr)
                }
            }
        });
        if (!blogtagsearch) {
            return Promise.reject(new Error('BLOG FROM TAGS NOT FOUND'));
        }
        // const blogfromtags=resultTags.filter(content=> regex.test())
        const finalresultArr = [];
        for (const resultz of result) {
            finalresultArr.push(resultz);
        }
        for (const blogtagz of blogtagsearch) {
            finalresultArr.push(blogtagz);
        }
        // finalresultArr.push(blogtagsearch)
        return finalresultArr;
    }
};
exports.resExController = resExController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], resExController.prototype, "regexSearch", null);
exports.resExController = resExController = __decorate([
    (0, tsoa_1.Route)('regex'),
    (0, tsoa_1.Tags)('Regex')
], resExController);
//# sourceMappingURL=regExController.js.map