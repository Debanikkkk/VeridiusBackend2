// // import { MigrationInterface, QueryRunner } from "typeorm";

// // export class ShowHierarchy1758623181324 implements MigrationInterface {
// //     name = 'ShowHierarchy1758623181324'

// //     public async up(queryRunner: QueryRunner): Promise<void> {
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_7a7f0caf590828c621c8608eb56"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6"`);
// //         await queryRunner.query(`DROP INDEX "public"."IDX_7a7f0caf590828c621c8608eb5"`);
// //         await queryRunner.query(`DROP INDEX "public"."IDX_46e3633d12d2e43c79ae4349fb"`);
// //         await queryRunner.query(`CREATE TABLE "episode" ("id" SERIAL NOT NULL, "title" character varying, "episode_desc" character varying, "file" character varying, "thumbnail" character varying, "season_id" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
// //         await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "title" character varying, "season_no" integer, "season_desc" character varying, "date" TIMESTAMP DEFAULT now(), "show_id" integer, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
// //         await queryRunner.query(`CREATE TYPE "public"."show_rating_enum" AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated', 'Not Rated')`);
// //         await queryRunner.query(`CREATE TYPE "public"."show_show_type_enum" AS ENUM('Movies', 'TV Shows')`);
// //         await queryRunner.query(`CREATE TABLE "show" ("id" SERIAL NOT NULL, "title" character varying, "tile_img" character varying, "desc_img" character varying, "description" character varying, "date" TIMESTAMP DEFAULT now(), "rating" "public"."show_rating_enum", "show_type" "public"."show_show_type_enum", "publisher_id" integer, CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP COLUMN "permission_id"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_dac48bc8a6fe615770b55a0dae8" PRIMARY KEY ("role_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP COLUMN "perimission_id"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD "perimission_id" integer NOT NULL`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_dac48bc8a6fe615770b55a0dae8"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("role_id", "perimission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD "permission_id" integer NOT NULL`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a" PRIMARY KEY ("role_id", "perimission_id", "permission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("perimission_id", "role_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_e8dd17b0dd3b310c0417757a29d" PRIMARY KEY ("role_id", "permission_id")`);
// //         await queryRunner.query(`CREATE INDEX "IDX_46e3633d12d2e43c79ae4349fb" ON "role_n_permission" ("perimission_id") `);
// //         await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id") `);
// //         await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_d8790eefed71394952672828c1c" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //         await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_a5177235001e471bbd7637584d1" FOREIGN KEY ("show_id") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //         await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_05160c4d8108794a9dad485423e" FOREIGN KEY ("publisher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6" FOREIGN KEY ("perimission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //     }

// //     public async down(queryRunner: QueryRunner): Promise<void> {
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_7a7f0caf590828c621c8608eb56"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6"`);
// //         await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT "FK_05160c4d8108794a9dad485423e"`);
// //         await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_a5177235001e471bbd7637584d1"`);
// //         await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_d8790eefed71394952672828c1c"`);
// //         await queryRunner.query(`DROP INDEX "public"."IDX_7a7f0caf590828c621c8608eb5"`);
// //         await queryRunner.query(`DROP INDEX "public"."IDX_46e3633d12d2e43c79ae4349fb"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_e8dd17b0dd3b310c0417757a29d"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a" PRIMARY KEY ("role_id", "perimission_id", "permission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a" PRIMARY KEY ("role_id", "perimission_id", "permission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_1d7f48ee18c220b283f7d256a8a"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("role_id", "perimission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP COLUMN "permission_id"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_dac48bc8a6fe615770b55a0dae8" PRIMARY KEY ("role_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP COLUMN "perimission_id"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD "perimission_id" integer NOT NULL`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT "PK_dac48bc8a6fe615770b55a0dae8"`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("role_id", "perimission_id")`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD "permission_id" integer NOT NULL`);
// //         await queryRunner.query(`DROP TABLE "show"`);
// //         await queryRunner.query(`DROP TYPE "public"."show_show_type_enum"`);
// //         await queryRunner.query(`DROP TYPE "public"."show_rating_enum"`);
// //         await queryRunner.query(`DROP TABLE "season"`);
// //         await queryRunner.query(`DROP TABLE "episode"`);
// //         await queryRunner.query(`CREATE INDEX "IDX_46e3633d12d2e43c79ae4349fb" ON "role_n_permission" ("perimission_id") `);
// //         await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id") `);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6" FOREIGN KEY ("perimission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
// //     }

// // }
// import { MigrationInterface, QueryRunner } from "typeorm";

// export class ShowHierarchy1758623181324 implements MigrationInterface {
//     name = 'ShowHierarchy1758623181324'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         // Drop existing constraints and indexes
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "FK_7a7f0caf590828c621c8608eb56"`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "FK_46e3633d12d2e43c79ae4349fb6"`);
//         await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_7a7f0caf590828c621c8608eb5"`);
//         await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_46e3633d12d2e43c79ae4349fb"`);

//         // Create new tables for show hierarchy
//         await queryRunner.query(`CREATE TABLE "episode" ("id" SERIAL NOT NULL, "title" character varying, "episode_desc" character varying, "file" character varying, "thumbnail" character varying, "season_id" integer, CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "season" ("id" SERIAL NOT NULL, "title" character varying, "season_no" integer, "season_desc" character varying, "date" TIMESTAMP DEFAULT now(), "show_id" integer, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        
//         // Create enums for show
//         await queryRunner.query(`CREATE TYPE "public"."show_rating_enum" AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated', 'Not Rated')`);
//         await queryRunner.query(`CREATE TYPE "public"."show_show_type_enum" AS ENUM('Movies', 'TV Shows')`);
        
//         await queryRunner.query(`CREATE TABLE "show" ("id" SERIAL NOT NULL, "title" character varying, "tile_img" character varying, "desc_img" character varying, "description" character varying, "date" TIMESTAMP DEFAULT now(), "rating" "public"."show_rating_enum", "show_type" "public"."show_show_type_enum", "publisher_id" integer, CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id"))`);

//         // Fix role_n_permission table structure
//         // First, drop the existing primary key
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "PK_f3fb6ec0a20502dd1b873569466"`);
        
//         // Ensure we have the correct columns (fix any typos)
//         // Check if perimission_id column exists (typo version) and rename it if needed
//         const hasTypoColumn = await queryRunner.hasColumn('role_n_permission', 'perimission_id');
//         if (hasTypoColumn) {
//             await queryRunner.query(`ALTER TABLE "role_n_permission" RENAME COLUMN "perimission_id" TO "permission_id"`);
//         }
        
//         // Make sure we have the correct columns
//         const hasPermissionId = await queryRunner.hasColumn('role_n_permission', 'permission_id');
//         if (!hasPermissionId) {
//             await queryRunner.query(`ALTER TABLE "role_n_permission" ADD "permission_id" integer NOT NULL`);
//         }
        
//         // Recreate the primary key with correct columns
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("role_id", "permission_id")`);
        
//         // Create indexes
//         await queryRunner.query(`CREATE INDEX "IDX_46e3633d12d2e43c79ae4349fb" ON "role_n_permission" ("role_id")`);
//         await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id")`);

//         // Add foreign key constraints
//         await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_d8790eefed71394952672828c1c" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_a5177235001e471bbd7637584d1" FOREIGN KEY ("show_id") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_05160c4d8108794a9dad485423e" FOREIGN KEY ("publisher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         // Drop foreign key constraints
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "FK_7a7f0caf590828c621c8608eb56"`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "FK_46e3633d12d2e43c79ae4349fb6"`);
//         await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT IF EXISTS "FK_05160c4d8108794a9dad485423e"`);
//         await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT IF EXISTS "FK_a5177235001e471bbd7637584d1"`);
//         await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT IF EXISTS "FK_d8790eefed71394952672828c1c"`);
        
//         // Drop indexes
//         await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_7a7f0caf590828c621c8608eb5"`);
//         await queryRunner.query(`DROP INDEX IF EXISTS "public"."IDX_46e3633d12d2e43c79ae4349fb"`);
        
//         // Drop primary key
//         await queryRunner.query(`ALTER TABLE "role_n_permission" DROP CONSTRAINT IF EXISTS "PK_f3fb6ec0a20502dd1b873569466"`);
        
//         // Restore original column name if it was changed
//         const hasPermissionId = await queryRunner.hasColumn('role_n_permission', 'permission_id');
//         if (hasPermissionId) {
//             await queryRunner.query(`ALTER TABLE "role_n_permission" RENAME COLUMN "permission_id" TO "perimission_id"`);
//         }
        
//         // Restore original primary key
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "PK_f3fb6ec0a20502dd1b873569466" PRIMARY KEY ("role_id", "perimission_id")`);
        
//         // Drop new tables
//         await queryRunner.query(`DROP TABLE "show"`);
//         await queryRunner.query(`DROP TYPE "public"."show_show_type_enum"`);
//         await queryRunner.query(`DROP TYPE "public"."show_rating_enum"`);
//         await queryRunner.query(`DROP TABLE "season"`);
//         await queryRunner.query(`DROP TABLE "episode"`);
        
//         // Restore original indexes and foreign keys
//         await queryRunner.query(`CREATE INDEX "IDX_46e3633d12d2e43c79ae4349fb" ON "role_n_permission" ("perimission_id")`);
//         await queryRunner.query(`CREATE INDEX "IDX_7a7f0caf590828c621c8608eb5" ON "role_n_permission" ("permission_id")`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_46e3633d12d2e43c79ae4349fb6" FOREIGN KEY ("perimission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//         await queryRunner.query(`ALTER TABLE "role_n_permission" ADD CONSTRAINT "FK_7a7f0caf590828c621c8608eb56" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
//     }
// }
import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowHierarchy1758623181324 implements MigrationInterface {
    name = 'ShowHierarchy1758623181324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enums first
        await queryRunner.query(`CREATE TYPE "public"."show_rating_enum" AS ENUM('G', 'PG', 'PG-13', 'R', 'NC-17', 'Unrated', 'Not Rated')`);
        await queryRunner.query(`CREATE TYPE "public"."show_show_type_enum" AS ENUM('Movies', 'TV Shows')`);
        
        // Create show table
        await queryRunner.query(`
            CREATE TABLE "show" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "tile_img" character varying,
                "desc_img" character varying,
                "description" character varying,
                "date" TIMESTAMP DEFAULT now(),
                "rating" "public"."show_rating_enum",
                "show_type" "public"."show_show_type_enum",
                "publisher_id" integer,
                CONSTRAINT "PK_e9993c2777c1d0907e845fce4d1" PRIMARY KEY ("id")
            )
        `);
        
        // Create season table
        await queryRunner.query(`
            CREATE TABLE "season" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "season_no" integer,
                "season_desc" character varying,
                "date" TIMESTAMP DEFAULT now(),
                "show_id" integer,
                CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id")
            )
        `);
        
        // Create episode table
        await queryRunner.query(`
            CREATE TABLE "episode" (
                "id" SERIAL NOT NULL,
                "title" character varying,
                "episode_desc" character varying,
                "file" character varying,
                "thumbnail" character varying,
                "season_id" integer,
                CONSTRAINT "PK_7258b95d6d2bf7f621845a0e143" PRIMARY KEY ("id")
            )
        `);
        
        // Add foreign key for show -> user (publisher)
        await queryRunner.query(`ALTER TABLE "show" ADD CONSTRAINT "FK_05160c4d8108794a9dad485423e" FOREIGN KEY ("publisher_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        
        // Add foreign key for season -> show
        await queryRunner.query(`ALTER TABLE "season" ADD CONSTRAINT "FK_a5177235001e471bbd7637584d1" FOREIGN KEY ("show_id") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        
        // Add foreign key for episode -> season
        await queryRunner.query(`ALTER TABLE "episode" ADD CONSTRAINT "FK_d8790eefed71394952672828c1c" FOREIGN KEY ("season_id") REFERENCES "season"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first
        await queryRunner.query(`ALTER TABLE "episode" DROP CONSTRAINT "FK_d8790eefed71394952672828c1c"`);
        await queryRunner.query(`ALTER TABLE "season" DROP CONSTRAINT "FK_a5177235001e471bbd7637584d1"`);
        await queryRunner.query(`ALTER TABLE "show" DROP CONSTRAINT "FK_05160c4d8108794a9dad485423e"`);
        
        // Drop tables
        await queryRunner.query(`DROP TABLE "episode"`);
        await queryRunner.query(`DROP TABLE "season"`);
        await queryRunner.query(`DROP TABLE "show"`);
        
        // Drop enums
        await queryRunner.query(`DROP TYPE "public"."show_show_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."show_rating_enum"`);
    }
}