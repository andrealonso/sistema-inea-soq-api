/*
  Warnings:

  - You are about to drop the `DonosDePropriedades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RepreDePropriedades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DonosDePropriedades` DROP FOREIGN KEY `DonosDePropriedades_dono_id_fkey`;

-- DropForeignKey
ALTER TABLE `DonosDePropriedades` DROP FOREIGN KEY `DonosDePropriedades_propriedade_id_fkey`;

-- DropForeignKey
ALTER TABLE `RepreDePropriedades` DROP FOREIGN KEY `RepreDePropriedades_propriedade_id_fkey`;

-- DropForeignKey
ALTER TABLE `RepreDePropriedades` DROP FOREIGN KEY `RepreDePropriedades_repre_id_fkey`;

-- DropTable
DROP TABLE `DonosDePropriedades`;

-- DropTable
DROP TABLE `RepreDePropriedades`;

-- CreateTable
CREATE TABLE `donos_de_propriedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dono_id` INTEGER NULL,
    `propriedade_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repre_de_propriedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `repre_id` INTEGER NULL,
    `propriedade_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `donos_de_propriedades` ADD CONSTRAINT `donos_de_propriedades_dono_id_fkey` FOREIGN KEY (`dono_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donos_de_propriedades` ADD CONSTRAINT `donos_de_propriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repre_de_propriedades` ADD CONSTRAINT `repre_de_propriedades_repre_id_fkey` FOREIGN KEY (`repre_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repre_de_propriedades` ADD CONSTRAINT `repre_de_propriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
