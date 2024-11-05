import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTicketUserRelation1730794124042 implements MigrationInterface {
    name = 'ServiceTicketUserRelation1730794124042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_ticket" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL, "service_ticket_number" character varying(17) NOT NULL, "technician_id" integer NOT NULL, CONSTRAINT "REL_158977193099c0625411d5d208" UNIQUE ("technician_id"), CONSTRAINT "PK_ce829d561a217cafc769fcd8de6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_158977193099c0625411d5d2082" FOREIGN KEY ("technician_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_158977193099c0625411d5d2082"`);
        await queryRunner.query(`DROP TABLE "service_ticket"`);
    }

}
