/*
  Warnings:

  - You are about to drop the `marcas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartas` DROP FOREIGN KEY `cartas_nacionalidadeId_fkey`;

-- DropTable
DROP TABLE `marcas`;

-- CreateTable
CREATE TABLE `nacionalidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartas` ADD CONSTRAINT `cartas_nacionalidadeId_fkey` FOREIGN KEY (`nacionalidadeId`) REFERENCES `nacionalidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
