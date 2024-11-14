"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role2rolem2m21727851109697 = void 0;
class Role2rolem2m21727851109697 {
    constructor() {
        this.name = 'Role2rolem2m21727851109697';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "role_role" ("role_id" integer NOT NULL, "sub_role_id" integer NOT NULL, CONSTRAINT "PK_5606e76159c080c6d2d722b0468" PRIMARY KEY ("role_id", "sub_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4b799b51771843ea2d9dba397c" ON "role_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4b05ca4310a15d9a8e225393a" ON "role_role" ("sub_role_id") `);
        await queryRunner.query(`ALTER TABLE "role_role" ADD CONSTRAINT "FK_4b799b51771843ea2d9dba397c9" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_role" ADD CONSTRAINT "FK_d4b05ca4310a15d9a8e225393a5" FOREIGN KEY ("sub_role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "role_role" DROP CONSTRAINT "FK_d4b05ca4310a15d9a8e225393a5"`);
        await queryRunner.query(`ALTER TABLE "role_role" DROP CONSTRAINT "FK_4b799b51771843ea2d9dba397c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4b05ca4310a15d9a8e225393a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b799b51771843ea2d9dba397c"`);
        await queryRunner.query(`DROP TABLE "role_role"`);
    }
}
exports.Role2rolem2m21727851109697 = Role2rolem2m21727851109697;
//# sourceMappingURL=1727851109697-role2rolem2m2.js.map