"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAddedEdited1718789612184 = void 0;
class ImageAddedEdited1718789612184 {
    constructor() {
        this.name = 'ImageAddedEdited1718789612184';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_05924474be158e58458d7bd4665"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_img_url"`);
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "image_id"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_image" character varying(128) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "blog_image"`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "image_id" integer`);
        await queryRunner.query(`ALTER TABLE "blog" ADD "blog_img_url" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_05924474be158e58458d7bd4665" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.ImageAddedEdited1718789612184 = ImageAddedEdited1718789612184;
//# sourceMappingURL=1718789612184-image_added_edited.js.map