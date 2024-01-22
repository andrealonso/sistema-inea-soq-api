-- AlterTable
ALTER TABLE `documentos` ADD COLUMN `denuncia_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `denuncias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `num_bo` VARCHAR(191) NOT NULL,
    `agendaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `documentos_denuncia_id_fkey` FOREIGN KEY (`denuncia_id`) REFERENCES `denuncias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_agendaId_fkey` FOREIGN KEY (`agendaId`) REFERENCES `agenda`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
