/*
  Warnings:

  - You are about to drop the column `userID` on the `store` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Store_userID_idx` ON `store`;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `userID`;

-- CreateTable
CREATE TABLE `StoreUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `role` ENUM('OWNER', 'MANAGER', 'STAFF') NOT NULL DEFAULT 'STAFF',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `StoreUser_storeId_idx`(`storeId`),
    UNIQUE INDEX `StoreUser_userId_storeId_key`(`userId`, `storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
