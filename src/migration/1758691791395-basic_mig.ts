import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicMig1758691791395 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            INSERT INTO "role" ("name", "description") VALUES 
            ('uploader', 'User can upload and manage files'),
            ('viewer', 'User can only view files')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "role" WHERE "name" IN ('uploader', 'viewer')
        `);
    }

}