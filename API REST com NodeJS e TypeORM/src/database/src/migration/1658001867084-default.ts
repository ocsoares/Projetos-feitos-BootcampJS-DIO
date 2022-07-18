import { MigrationInterface, QueryRunner } from "typeorm";

export class default1658001867084 implements MigrationInterface {
    name = 'default1658001867084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "name_bank" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "type_user" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "type_user"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "name_bank"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "name" text NOT NULL`);
    }

}
