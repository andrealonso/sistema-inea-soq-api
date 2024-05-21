/*
  Warnings:

  - You are about to drop the column `prorietario_id` on the `propriedades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `propriedades` DROP FOREIGN KEY `propriedades_prorietario_id_fkey`;

-- AlterTable
ALTER TABLE `propriedades` DROP COLUMN `prorietario_id`,
    ADD COLUMN `proprietario_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `propriedades` ADD CONSTRAINT `propriedades_proprietario_id_fkey` FOREIGN KEY (`proprietario_id`) REFERENCES `proprietarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
