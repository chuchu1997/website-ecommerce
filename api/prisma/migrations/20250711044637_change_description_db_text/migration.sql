-- AlterTable
ALTER TABLE `project` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `service` MODIFY `shortDescription` TEXT NULL,
    MODIFY `description` TEXT NOT NULL;
