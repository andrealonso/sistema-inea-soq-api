-- AlterTable
ALTER TABLE `documentos` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `empresas` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `enderecos` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `pessoas` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `propriedades` MODIFY `deleted_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `deleted_at` DATETIME(3) NULL;
