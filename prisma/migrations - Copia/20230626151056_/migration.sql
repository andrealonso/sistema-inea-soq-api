/*
  Warnings:

  - You are about to drop the column `pessoas_id` on the `propriedades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `propriedades` DROP FOREIGN KEY `propriedades_pessoas_id_fkey`;

-- AlterTable
ALTER TABLE `propriedades` DROP COLUMN `pessoas_id`;

-- CreateTable
CREATE TABLE `DonosDePropriedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dono_id` INTEGER NULL,
    `propriedade_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepreDePropriedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repre_id` INTEGER NULL,
    `propriedade_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DonosDePropriedades` ADD CONSTRAINT `DonosDePropriedades_dono_id_fkey` FOREIGN KEY (`dono_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonosDePropriedades` ADD CONSTRAINT `DonosDePropriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepreDePropriedades` ADD CONSTRAINT `RepreDePropriedades_repre_id_fkey` FOREIGN KEY (`repre_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepreDePropriedades` ADD CONSTRAINT `RepreDePropriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
