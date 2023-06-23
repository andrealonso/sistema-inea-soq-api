-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `parceira_inea` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `propriedades` ADD COLUMN `area_cana` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    MODIFY `area` DECIMAL(65, 30) NOT NULL DEFAULT 0;
