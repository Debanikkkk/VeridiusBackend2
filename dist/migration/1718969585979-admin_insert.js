"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInsert1718969585979 = void 0;
class AdminInsert1718969585979 {
    async up(queryRunner) {
        await queryRunner.query(`
            insert into admin(name, password) values('Babita.dhaked@chronicpestcontrolagencies.org', '031e76e1d43679eae394ffcea0e200b4');
            `);
    }
    async down(_queryRunner) {
    }
}
exports.AdminInsert1718969585979 = AdminInsert1718969585979;
//# sourceMappingURL=1718969585979-admin_insert.js.map