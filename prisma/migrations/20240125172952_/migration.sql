/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `id_registro` on the `logs` table. All the data in the column will be lost.
  - Added the required column `registro_id` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logs` DROP COLUMN `deleted_at`,
    DROP COLUMN `id_registro`,
    ADD COLUMN `registro_id` INTEGER NOT NULL;
