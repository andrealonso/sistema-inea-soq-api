/*
  Warnings:

  - You are about to drop the column `user_tipo_id` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `usuarios_tipo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_user_tipo_id_fkey`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `user_tipo_id`,
    ADD COLUMN `pessoas_tipo_id` INTEGER NULL;

-- DropTable
DROP TABLE `usuarios_tipo`;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_pessoas_tipo_id_fkey` FOREIGN KEY (`pessoas_tipo_id`) REFERENCES `pessoas_tipo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
