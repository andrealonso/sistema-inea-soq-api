-- AlterTable
ALTER TABLE `denuncias` ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
