-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `ativo_status_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `ativo_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descri` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ativo_status_descri_key`(`descri`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ativo_status_id_fkey` FOREIGN KEY (`ativo_status_id`) REFERENCES `ativo_status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
