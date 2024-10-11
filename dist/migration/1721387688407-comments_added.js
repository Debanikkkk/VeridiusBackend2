"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsAdded1721387688407 = void 0;
class CommentsAdded1721387688407 {
    constructor() {
        this.name = 'CommentsAdded1721387688407';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "comment_body" character varying(4096) NOT NULL, "author" character varying(108) NOT NULL, "status" boolean NOT NULL, "post_time" TIMESTAMP NOT NULL DEFAULT now(), "blog_id" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_6754bf738cb68004be154e1d1d5" FOREIGN KEY ("blog_id") REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_6754bf738cb68004be154e1d1d5"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
exports.CommentsAdded1721387688407 = CommentsAdded1721387688407;
//# sourceMappingURL=1721387688407-comments_added.js.map