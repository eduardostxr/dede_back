-- CreateTable
CREATE TABLE `clientes` (
    `id` VARCHAR(36) NOT NULL,
    `nome` VARCHAR(60) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nacionalidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(60) NOT NULL,
    `velocidade` TINYINT NOT NULL,
    `fisico` TINYINT NOT NULL,
    `defesa` TINYINT NOT NULL,
    `chute` TINYINT NOT NULL,
    `passe` TINYINT NOT NULL,
    `drible` TINYINT NOT NULL,
    `overall` TINYINT NOT NULL,
    `anoNascimento` SMALLINT NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `comercio` BOOLEAN NOT NULL DEFAULT true,
    `foto` VARCHAR(191) NOT NULL,
    `descricao` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `raridade` ENUM('BRONZE', 'PRATA', 'OURO', 'LENDA') NOT NULL,
    `nacionalidadeId` INTEGER NOT NULL,
    `clienteId` VARCHAR(191) NULL,

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
ALTER TABLE `cartas` ADD CONSTRAINT `cartas_nacionalidadeId_fkey` FOREIGN KEY (`nacionalidadeId`) REFERENCES `nacionalidades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartas` ADD CONSTRAINT `cartas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fotos` ADD CONSTRAINT `fotos_cartaId_fkey` FOREIGN KEY (`cartaId`) REFERENCES `cartas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
