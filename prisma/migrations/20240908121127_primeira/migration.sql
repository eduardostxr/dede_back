-- CreateTable
CREATE TABLE `marcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `velocidade` TINYINT NOT NULL,
    `fisico` TINYINT NOT NULL,
    `defesa` TINYINT NOT NULL,
    `chute` TINYINT NOT NULL,
    `passe` TINYINT NOT NULL,
    `drible` TINYINT NOT NULL,
    `anoNascimento` SMALLINT NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `comercio` BOOLEAN NOT NULL DEFAULT true,
    `foto` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `raridade` ENUM('BRONZE', 'PRATA', 'OURO', 'LENDA') NOT NULL,
    `nacionalidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fotos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(30) NOT NULL,
    `codigoFoto` LONGTEXT NOT NULL,
    `cartaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cartas` ADD CONSTRAINT `cartas_nacionalidadeId_fkey` FOREIGN KEY (`nacionalidadeId`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_cartaId_fkey` FOREIGN KEY (`cartaId`) REFERENCES `cartas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
