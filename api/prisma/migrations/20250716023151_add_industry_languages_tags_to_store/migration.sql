-- AlterTable
ALTER TABLE `store` ADD COLUMN `industry` VARCHAR(191) NULL,
    ADD COLUMN `languages` VARCHAR(191) NULL,
    ADD COLUMN `tags` JSON NULL;
