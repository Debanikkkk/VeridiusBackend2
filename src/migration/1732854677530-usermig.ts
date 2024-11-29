import { MigrationInterface, QueryRunner } from "typeorm";

export class Usermig1732854677530 implements MigrationInterface {
    name = 'Usermig1732854677530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trip" ("id" SERIAL NOT NULL, "startLatitude" double precision NOT NULL, "startLongitude" double precision NOT NULL, "endLatitude" double precision NOT NULL, "endLongitude" double precision NOT NULL, "tariff" double precision NOT NULL, "paymentStatus" character varying NOT NULL DEFAULT 'unpaid', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "geofence" ("id" SERIAL NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "radius" double precision NOT NULL, "tariff" double precision NOT NULL, CONSTRAINT "PK_773a4bb65bbd7e4dbbc21ac1b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trip" ADD CONSTRAINT "FK_64c0a95b91a9b4c120a26d54b69" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trip" DROP CONSTRAINT "FK_64c0a95b91a9b4c120a26d54b69"`);
        await queryRunner.query(`DROP TABLE "geofence"`);
        await queryRunner.query(`DROP TABLE "trip"`);
    }

}
