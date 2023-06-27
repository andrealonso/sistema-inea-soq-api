/*
  Warnings:

  - You are about to drop the `donos_de_propriedades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repre_de_propriedades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `donos_de_propriedades` DROP FOREIGN KEY `donos_de_propriedades_dono_id_fkey`;

-- DropForeignKey
ALTER TABLE `donos_de_propriedades` DROP FOREIGN KEY `donos_de_propriedades_propriedade_id_fkey`;

-- DropForeignKey
ALTER TABLE `repre_de_propriedades` DROP FOREIGN KEY `repre_de_propriedades_propriedade_id_fkey`;

-- DropForeignKey
ALTER TABLE `repre_de_propriedades` DROP FOREIGN KEY `repre_de_propriedades_repre_id_fkey`;

-- DropTable
DROP TABLE `donos_de_propriedades`;

-- DropTable
DROP TABLE `repre_de_propriedades`;

-- CreateTable
CREATE TABLE `DonosDePropriedades` (
    `dono_id` INTEGER NOT NULL,
    `propriedade_id` INTEGER NOT NULL,
    `obs` VARCHAR(191) NULL,

    PRIMARY KEY (`propriedade_id`, `dono_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RepreDePropriedades` (
    `repre_id` INTEGER NOT NULL,
    `propriedade_id` INTEGER NOT NULL,

    PRIMARY KEY (`repre_id`, `propriedade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DonosDePropriedades` ADD CONSTRAINT `DonosDePropriedades_dono_id_fkey` FOREIGN KEY (`dono_id`) REFERENCES `pessoas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DonosDePropriedades` ADD CONSTRAINT `DonosDePropriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepreDePropriedades` ADD CONSTRAINT `RepreDePropriedades_repre_id_fkey` FOREIGN KEY (`repre_id`) REFERENCES `pessoas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RepreDePropriedades` ADD CONSTRAINT `RepreDePropriedades_propriedade_id_fkey` FOREIGN KEY (`propriedade_id`) REFERENCES `propriedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
