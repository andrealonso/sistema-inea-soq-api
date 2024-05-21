/*
  Warnings:

  - You are about to drop the column `doc_destinoId` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the `doc_destino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `documentos_doc_destinoId_fkey`;

-- AlterTable
ALTER TABLE `documentos` DROP COLUMN `doc_destinoId`,
    ADD COLUMN `agenda_id` INTEGER NULL,
    ADD COLUMN `proprietarios_id` INTEGER NULL,
    ADD COLUMN `representantes_id` INTEGER NULL;

-- DropTable
DROP TABLE `doc_destino`;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_representantes_id_fkey` FOREIGN KEY (`representantes_id`) REFERENCES `representantes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_proprietarios_id_fkey` FOREIGN KEY (`proprietarios_id`) REFERENCES `proprietarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_agenda_id_fkey` FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
