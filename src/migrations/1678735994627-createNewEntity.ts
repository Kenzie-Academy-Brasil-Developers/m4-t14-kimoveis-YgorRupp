import { MigrationInterface, QueryRunner } from "typeorm";

export class createNewEntity1678735994627 implements MigrationInterface {
    name = 'createNewEntity1678735994627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" DROP CONSTRAINT "FK_84422cba9c661a0039d78e55dbc"`);
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" ADD CONSTRAINT "FK_f511c63a0c986153caf2bc34eb6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" DROP CONSTRAINT "FK_f511c63a0c986153caf2bc34eb6"`);
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "schdules_users_properties" ADD CONSTRAINT "FK_84422cba9c661a0039d78e55dbc" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
