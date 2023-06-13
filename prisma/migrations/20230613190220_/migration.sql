/*
  Warnings:

  - You are about to drop the column `cpf_cnpj` on the `empresas` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` DROP COLUMN `cpf_cnpj`,
    ADD COLUMN `cnpj` VARCHAR(191) NOT NULL;
