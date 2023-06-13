/*
  Warnings:

  - You are about to drop the column `descri` on the `ativo_status` table. All the data in the column will be lost.
  - You are about to drop the column `descri` on the `usuarios_tipo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descricao]` on the table `ativo_status` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descricao]` on the table `usuarios_tipo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descricao` to the `ativo_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `usuarios_tipo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ativo_status_descri_key` ON `ativo_status`;

-- DropIndex
DROP INDEX `usuarios_tipo_descri_key` ON `usuarios_tipo`;

-- AlterTable
ALTER TABLE `ativo_status` DROP COLUMN `descri`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios_tipo` DROP COLUMN `descri`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ativo_status_descricao_key` ON `ativo_status`(`descricao`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_tipo_descricao_key` ON `usuarios_tipo`(`descricao`);
