import { MigrationInterface, QueryRunner } from "typeorm";

export class default1657982818458 implements MigrationInterface {
    name = 'default1657982818458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "cpf" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "cpf"`);
    }

}
