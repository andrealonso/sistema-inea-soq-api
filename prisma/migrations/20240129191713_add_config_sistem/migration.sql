/*
  Warnings:

  - Made the column `data_hora` on table `logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `logs` MODIFY `data_hora` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `config_sistem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mail_user` VARCHAR(191) NULL,
    `mail_pass` VARCHAR(191) NULL,
    `mail_smtp` VARCHAR(191) NULL,
    `mail_port` VARCHAR(191) NULL,
    `mail_ssl` VARCHAR(191) NULL,
    `mail_from` VARCHAR(191) NULL,
    `prazo_alteracao_ordem` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
