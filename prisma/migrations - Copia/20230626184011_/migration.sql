/*
  Warnings:

  - The primary key for the `DonosDePropriedades` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `DonosDePropriedades` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`dono_id`, `propriedade_id`);
