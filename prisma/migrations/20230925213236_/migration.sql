/*
  Warnings:

  - You are about to drop the column `doc_destino_id` on the `documentos` table. All the data in the column will be lost.
  - Added the required column `ext` to the `documentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage` to the `documentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `documentos_doc_destino_id_fkey`;

-- AlterTable
ALTER TABLE `documentos` DROP COLUMN `doc_destino_id`,
    ADD COLUMN `doc_destinoId` INTEGER NULL,
    ADD COLUMN `ext` VARCHAR(191) NOT NULL,
    ADD COLUMN `propriedades_id` INTEGER NULL,
    ADD COLUMN `storage` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_propriedades_id_fkey` FOREIGN KEY (`propriedades_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_doc_destinoId_fkey` FOREIGN KEY (`doc_destinoId`) REFERENCES `doc_destino`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
