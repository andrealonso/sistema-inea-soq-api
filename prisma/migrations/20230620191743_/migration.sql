-- AlterTable
ALTER TABLE `propriedades` ADD COLUMN `pessoasId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `propriedades` ADD CONSTRAINT `propriedades_pessoasId_fkey` FOREIGN KEY (`pessoasId`) REFERENCES `pessoas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
