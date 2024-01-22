/*
  Warnings:

  - You are about to drop the column `agendaId` on the `denuncias` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `denuncias` DROP FOREIGN KEY `denuncias_agendaId_fkey`;

-- AlterTable
ALTER TABLE `denuncias` DROP COLUMN `agendaId`,
    ADD COLUMN `agenda_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_agenda_id_fkey` FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
