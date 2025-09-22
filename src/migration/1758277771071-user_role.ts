import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1758277771071 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert default roles
        await queryRunner.query(`
            INSERT INTO "role" ("name", "description") VALUES 
            ('uploader', 'User can upload and manage files'),
            ('viewer', 'User can only view files')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the seeded roles
        await queryRunner.query(`
            DELETE FROM "role" WHERE "name" IN ('uploader', 'viewer')
        `);
    }

}
