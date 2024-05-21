-- CreateTable
CREATE TABLE `agenda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `talhao` VARCHAR(191) NOT NULL,
    `area_queima` DECIMAL(65, 30) NOT NULL,
    `ordem_corte_interna` VARCHAR(191) NULL,
    `obs` TEXT NULL,
    `propriedades_id` INTEGER NULL,
    `empresas_id` INTEGER NULL,
    `user_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_propriedades_id_fkey` FOREIGN KEY (`propriedades_id`) REFERENCES `propriedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_empresas_id_fkey` FOREIGN KEY (`empresas_id`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda` ADD CONSTRAINT `agenda_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
