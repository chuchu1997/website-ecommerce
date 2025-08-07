/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `image`;

-- CreateTable
CREATE TABLE `ImageMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NULL,
    `type` ENUM('PRODUCT', 'CATEGORY', 'BANNER', 'BRAND', 'NEWS', 'SERVICE', 'PROJECT', 'NONE') NULL,
    `size` INTEGER NULL,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `productId` INTEGER NULL,
    `bannerId` INTEGER NULL,
    `categoryId` INTEGER NULL,
    `brandId` INTEGER NULL,
    `newsId` INTEGER NULL,
    `serviceId` INTEGER NULL,
    `projectId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ImageMedia_productId_key`(`productId`),
    UNIQUE INDEX `ImageMedia_bannerId_key`(`bannerId`),
    UNIQUE INDEX `ImageMedia_categoryId_key`(`categoryId`),
    UNIQUE INDEX `ImageMedia_brandId_key`(`brandId`),
    UNIQUE INDEX `ImageMedia_newsId_key`(`newsId`),
    UNIQUE INDEX `ImageMedia_serviceId_key`(`serviceId`),
    UNIQUE INDEX `ImageMedia_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
