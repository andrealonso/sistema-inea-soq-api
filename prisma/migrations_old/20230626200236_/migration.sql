/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `empresas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `empresas_nome_key` ON `empresas`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `empresas_cnpj_key` ON `empresas`(`cnpj`);
