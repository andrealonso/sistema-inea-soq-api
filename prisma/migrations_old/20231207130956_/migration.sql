/*
  Warnings:

  - Added the required column `updated_at` to the `denuncias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `denuncias` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `mudar_datas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data_inicio_old` DATETIME(3) NOT NULL,
    `data_fim_old` DATETIME(3) NOT NULL,
    `data_inicio_new` DATETIME(3) NOT NULL,
    `data_fim_new` DATETIME(3) NOT NULL,
    `agenda_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mudar_datas` ADD CONSTRAINT `mudar_datas_agenda_id_fkey` FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
