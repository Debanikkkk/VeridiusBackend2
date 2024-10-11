"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAdded1718781156801 = void 0;
class ImageAdded1718781156801 {
    constructor() {
        this.name = 'ImageAdded1718781156801';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "blogTitle" character varying(24) NOT NULL, "content" text NOT NULL, "blog_img_url" character varying(128) NOT NULL, "post_time" TIMESTAMP NOT NULL DEFAULT now(), "image_id" integer, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "filename" character varying, "path" character varying, "mimetype" character varying, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "name" character varying(32) NOT NULL, "password" character varying(16) NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog" ADD CONSTRAINT "FK_05924474be158e58458d7bd4665" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "blog" DROP CONSTRAINT "FK_05924474be158e58458d7bd4665"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "blog"`);
    }
}
exports.ImageAdded1718781156801 = ImageAdded1718781156801;
//# sourceMappingURL=1718781156801-image_added.js.map