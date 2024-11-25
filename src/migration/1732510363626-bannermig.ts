import { MigrationInterface, QueryRunner } from "typeorm";

export class Bannermig1732510363626 implements MigrationInterface {
    name = 'Bannermig1732510363626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "productName"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "productTag"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "productImg"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "productDescription"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "productLink"`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "product_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "product_tag" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "product_img" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "product_description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "product_link" character varying(512) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "product_link"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "product_description"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "product_img"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "product_tag"`);
        await queryRunner.query(`ALTER TABLE "banners" DROP COLUMN "product_name"`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "productLink" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "productDescription" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "productImg" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "productTag" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banners" ADD "productName" character varying(255) NOT NULL`);
    }

}
