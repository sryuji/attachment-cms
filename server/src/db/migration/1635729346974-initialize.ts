import {MigrationInterface, QueryRunner} from "typeorm";

export class initialize1635729346974 implements MigrationInterface {
    name = 'initialize1635729346974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "email" varchar NOT NULL, "lastName" varchar(64), "firstName" varchar(64), "avatarUrl" varchar, "jwtRefreshToken" varchar, "jwtRefreshTokenIssuedAt" datetime, "googleAccessToken" varchar, "googleRefreshToken" varchar, "authenticatedAt" datetime, CONSTRAINT "UQ_e1c69664a17457849a4c43cfcef" UNIQUE ("jwtRefreshToken"), CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "content_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "releaseId" integer NOT NULL, "path" varchar NOT NULL, "selector" text, "content" text, "action" varchar, "inactive" boolean NOT NULL DEFAULT (0), "sourceContentHistoryId" integer)`);
        await queryRunner.query(`CREATE TABLE "release" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "name" varchar NOT NULL, "limitedReleaseToken" varchar(255), "limitedReleaseTokenIssuedAt" datetime, "releasedAt" datetime, "rollbackedAt" datetime, "sourceReleaseId" integer)`);
        await queryRunner.query(`CREATE TABLE "scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "domain" varchar(255), "description" text, "token" varchar(255) NOT NULL, "defaultReleaseId" integer, CONSTRAINT "UQ_a168d00d3432bab2cb122c83981" UNIQUE ("token"), CONSTRAINT "REL_a86075db6f83ca160b07fb9f73" UNIQUE ("defaultReleaseId"))`);
        await queryRunner.query(`CREATE TABLE "account_scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "accountId" integer NOT NULL, "scopeId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_content_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "releaseId" integer NOT NULL, "path" varchar NOT NULL, "selector" text, "content" text, "action" varchar, "inactive" boolean NOT NULL DEFAULT (0), "sourceContentHistoryId" integer, CONSTRAINT "FK_bded2e3ba0d5e4c76ed8cd9f7bb" FOREIGN KEY ("scopeId") REFERENCES "scope" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a431a2b1b4b5b1fe9f15e77615b" FOREIGN KEY ("releaseId") REFERENCES "release" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_content_history"("id", "createdAt", "updatedAt", "scopeId", "releaseId", "path", "selector", "content", "action", "inactive", "sourceContentHistoryId") SELECT "id", "createdAt", "updatedAt", "scopeId", "releaseId", "path", "selector", "content", "action", "inactive", "sourceContentHistoryId" FROM "content_history"`);
        await queryRunner.query(`DROP TABLE "content_history"`);
        await queryRunner.query(`ALTER TABLE "temporary_content_history" RENAME TO "content_history"`);
        await queryRunner.query(`CREATE TABLE "temporary_release" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "name" varchar NOT NULL, "limitedReleaseToken" varchar(255), "limitedReleaseTokenIssuedAt" datetime, "releasedAt" datetime, "rollbackedAt" datetime, "sourceReleaseId" integer, CONSTRAINT "FK_fa7c49ba5fb106c6cd9f7519cca" FOREIGN KEY ("scopeId") REFERENCES "scope" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_release"("id", "createdAt", "updatedAt", "scopeId", "name", "limitedReleaseToken", "limitedReleaseTokenIssuedAt", "releasedAt", "rollbackedAt", "sourceReleaseId") SELECT "id", "createdAt", "updatedAt", "scopeId", "name", "limitedReleaseToken", "limitedReleaseTokenIssuedAt", "releasedAt", "rollbackedAt", "sourceReleaseId" FROM "release"`);
        await queryRunner.query(`DROP TABLE "release"`);
        await queryRunner.query(`ALTER TABLE "temporary_release" RENAME TO "release"`);
        await queryRunner.query(`CREATE TABLE "temporary_scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "domain" varchar(255), "description" text, "token" varchar(255) NOT NULL, "defaultReleaseId" integer, CONSTRAINT "UQ_a168d00d3432bab2cb122c83981" UNIQUE ("token"), CONSTRAINT "REL_a86075db6f83ca160b07fb9f73" UNIQUE ("defaultReleaseId"), CONSTRAINT "FK_a86075db6f83ca160b07fb9f73a" FOREIGN KEY ("defaultReleaseId") REFERENCES "release" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_scope"("id", "createdAt", "updatedAt", "name", "domain", "description", "token", "defaultReleaseId") SELECT "id", "createdAt", "updatedAt", "name", "domain", "description", "token", "defaultReleaseId" FROM "scope"`);
        await queryRunner.query(`DROP TABLE "scope"`);
        await queryRunner.query(`ALTER TABLE "temporary_scope" RENAME TO "scope"`);
        await queryRunner.query(`CREATE TABLE "temporary_account_scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "accountId" integer NOT NULL, "scopeId" integer NOT NULL, CONSTRAINT "FK_bcd612bd76bc51820a9ead87f70" FOREIGN KEY ("accountId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d563a8542d949344519634a8f80" FOREIGN KEY ("scopeId") REFERENCES "scope" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_account_scope"("id", "createdAt", "updatedAt", "accountId", "scopeId") SELECT "id", "createdAt", "updatedAt", "accountId", "scopeId" FROM "account_scope"`);
        await queryRunner.query(`DROP TABLE "account_scope"`);
        await queryRunner.query(`ALTER TABLE "temporary_account_scope" RENAME TO "account_scope"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_scope" RENAME TO "temporary_account_scope"`);
        await queryRunner.query(`CREATE TABLE "account_scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "accountId" integer NOT NULL, "scopeId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "account_scope"("id", "createdAt", "updatedAt", "accountId", "scopeId") SELECT "id", "createdAt", "updatedAt", "accountId", "scopeId" FROM "temporary_account_scope"`);
        await queryRunner.query(`DROP TABLE "temporary_account_scope"`);
        await queryRunner.query(`ALTER TABLE "scope" RENAME TO "temporary_scope"`);
        await queryRunner.query(`CREATE TABLE "scope" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar(255) NOT NULL, "domain" varchar(255), "description" text, "token" varchar(255) NOT NULL, "defaultReleaseId" integer, CONSTRAINT "UQ_a168d00d3432bab2cb122c83981" UNIQUE ("token"), CONSTRAINT "REL_a86075db6f83ca160b07fb9f73" UNIQUE ("defaultReleaseId"))`);
        await queryRunner.query(`INSERT INTO "scope"("id", "createdAt", "updatedAt", "name", "domain", "description", "token", "defaultReleaseId") SELECT "id", "createdAt", "updatedAt", "name", "domain", "description", "token", "defaultReleaseId" FROM "temporary_scope"`);
        await queryRunner.query(`DROP TABLE "temporary_scope"`);
        await queryRunner.query(`ALTER TABLE "release" RENAME TO "temporary_release"`);
        await queryRunner.query(`CREATE TABLE "release" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "name" varchar NOT NULL, "limitedReleaseToken" varchar(255), "limitedReleaseTokenIssuedAt" datetime, "releasedAt" datetime, "rollbackedAt" datetime, "sourceReleaseId" integer)`);
        await queryRunner.query(`INSERT INTO "release"("id", "createdAt", "updatedAt", "scopeId", "name", "limitedReleaseToken", "limitedReleaseTokenIssuedAt", "releasedAt", "rollbackedAt", "sourceReleaseId") SELECT "id", "createdAt", "updatedAt", "scopeId", "name", "limitedReleaseToken", "limitedReleaseTokenIssuedAt", "releasedAt", "rollbackedAt", "sourceReleaseId" FROM "temporary_release"`);
        await queryRunner.query(`DROP TABLE "temporary_release"`);
        await queryRunner.query(`ALTER TABLE "content_history" RENAME TO "temporary_content_history"`);
        await queryRunner.query(`CREATE TABLE "content_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "scopeId" integer NOT NULL, "releaseId" integer NOT NULL, "path" varchar NOT NULL, "selector" text, "content" text, "action" varchar, "inactive" boolean NOT NULL DEFAULT (0), "sourceContentHistoryId" integer)`);
        await queryRunner.query(`INSERT INTO "content_history"("id", "createdAt", "updatedAt", "scopeId", "releaseId", "path", "selector", "content", "action", "inactive", "sourceContentHistoryId") SELECT "id", "createdAt", "updatedAt", "scopeId", "releaseId", "path", "selector", "content", "action", "inactive", "sourceContentHistoryId" FROM "temporary_content_history"`);
        await queryRunner.query(`DROP TABLE "temporary_content_history"`);
        await queryRunner.query(`DROP TABLE "account_scope"`);
        await queryRunner.query(`DROP TABLE "scope"`);
        await queryRunner.query(`DROP TABLE "release"`);
        await queryRunner.query(`DROP TABLE "content_history"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
