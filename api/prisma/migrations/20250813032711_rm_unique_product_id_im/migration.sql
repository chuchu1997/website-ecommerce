-- 1. Drop unique index cũ ở productId nếu tồn tại
-- DROP INDEX `ImageMedia_productId_key` ON `ImageMedia`;

-- 2. Tạo index thường cho productId
CREATE INDEX `ImageMedia_productId_idx` ON `ImageMedia`(`productId`);

-- 3. Thêm cột bannerId vào Category
ALTER TABLE `Category` ADD COLUMN `bannerId` INT NULL;

-- 4. Thêm cột categoryBannerId vào ImageMedia
ALTER TABLE `ImageMedia` ADD COLUMN `categoryBannerId` INT NULL;

-- 5. Tạo unique index cho bannerId của Category
CREATE UNIQUE INDEX `Category_bannerId_key` ON `Category`(`bannerId`);

-- 6. Tạo unique index cho categoryBannerId của ImageMedia
CREATE UNIQUE INDEX `ImageMedia_categoryBannerId_key` ON `ImageMedia`(`categoryBannerId`);

-- 7. Thêm foreign key từ Category.bannerId -> ImageMedia.id
ALTER TABLE `Category`
ADD CONSTRAINT `Category_bannerId_fkey`
FOREIGN KEY (`bannerId`) REFERENCES `ImageMedia`(`id`)
ON DELETE SET NULL ON UPDATE CASCADE;

-- 8. Thêm foreign key từ ImageMedia.categoryBannerId -> Category.id
ALTER TABLE `ImageMedia`
ADD CONSTRAINT `ImageMedia_categoryBannerId_fkey`
FOREIGN KEY (`categoryBannerId`) REFERENCES `Category`(`id`)
ON DELETE SET NULL ON UPDATE CASCADE;
