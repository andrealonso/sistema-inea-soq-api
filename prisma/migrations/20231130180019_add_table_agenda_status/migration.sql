-- AlterTable
ALTER TABLE `agenda` ADD COLUMN `agenda_Status_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `agenda_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_agenda_Status_id_fkey` FOREIGN KEY (`agenda_Status_id`) REFERENCES `agenda_status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
