-- Tạo bảng ImageMedia mới (vì database vừa reset, không còn bảng image cũ)
CREATE TABLE `ImageMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191),
    `type` ENUM('PRODUCT', 'CATEGORY', 'BANNER', 'BRAND', 'NEWS', 'SERVICE', 'PROJECT', 'NONE'),
    `size` INTEGER,
    `width` INTEGER,
    `height` INTEGER,
    `productId` INTEGER UNIQUE,
    `bannerId` INTEGER UNIQUE,
    `categoryId` INTEGER UNIQUE,
    `brandId` INTEGER UNIQUE,
    `newsId` INTEGER UNIQUE,
    `serviceId` INTEGER UNIQUE,
    `projectId` INTEGER UNIQUE,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
);


INSERT INTO `ImageMedia` (`id`, `url`, `productId`)
SELECT `id`, `url`,`productId` FROM `image`
WHERE `productId` IS NOT NULL;

-- Xóa bảng image sau khi chuyển xong
DROP TABLE `image`;