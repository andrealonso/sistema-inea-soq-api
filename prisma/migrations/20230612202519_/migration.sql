/*
  Warnings:

  - You are about to drop the column `contato_nome` on the `propriedades` table. All the data in the column will be lost.
  - You are about to drop the column `contato_tel` on the `propriedades` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_cnpj` on the `propriedades` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `propriedades` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `propriedades` table. All the data in the column will be lost.
  - Added the required column `area` to the `propriedades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car` to the `propriedades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geolocal` to the `propriedades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `propriedades` DROP COLUMN `contato_nome`,
    DROP COLUMN `contato_tel`,
    DROP COLUMN `cpf_cnpj`,
    DROP COLUMN `email`,
    DROP COLUMN `telefone`,
    ADD COLUMN `area` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `car` VARCHAR(191) NOT NULL,
    ADD COLUMN `empresas_id` INTEGER NULL,
    ADD COLUMN `geolocal` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `propriedades` ADD CONSTRAINT `propriedades_empresas_id_fkey` FOREIGN KEY (`empresas_id`) REFERENCES `empresas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
