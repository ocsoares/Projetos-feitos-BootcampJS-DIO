import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657989394345 implements MigrationInterface {
    name = 'default1657989394345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "person_password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "person_password"`);
    }

}
