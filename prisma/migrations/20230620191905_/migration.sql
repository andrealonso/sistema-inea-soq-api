/*
  Warnings:

  - You are about to drop the column `pessoasId` on the `propriedades` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `propriedades` DROP FOREIGN KEY `propriedades_pessoasId_fkey`;

-- AlterTable
ALTER TABLE `propriedades` DROP COLUMN `pessoasId`,
    ADD COLUMN `pessoas_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `propriedades` ADD CONSTRAINT `propriedades_pessoas_id_fkey` FOREIGN KEY (`pessoas_id`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
