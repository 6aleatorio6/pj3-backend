-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(80) NULL,
    `senha` VARCHAR(100) NULL DEFAULT '',
    `googleId` VARCHAR(45) NULL,
    `nascimento` DATE NULL,
    `facebookId` VARCHAR(45) NULL,
    `foto` VARCHAR(200) NULL,
    `apelido` VARCHAR(50) NULL,
    `nome` VARCHAR(50) NULL,
    `cidade` VARCHAR(50) NULL,
    `sexo` ENUM('F', 'M', 'O') NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalogo` (
    `uuid` VARCHAR(60) NOT NULL,
    `funcionarioId` INTEGER NOT NULL,
    `descricao` VARCHAR(800) NOT NULL,
    `nomePopular` VARCHAR(50) NOT NULL,
    `nomeCientifico` VARCHAR(50) NOT NULL,
    `especie` VARCHAR(50) NULL,
    `som` VARCHAR(200) NULL,
    `ftModel` VARCHAR(200) NULL,
    `medalha` VARCHAR(200) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `catalogo_uuid_key`(`uuid`),
    INDEX `catalogo_funcionarioId_idx`(`funcionarioId`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalogoGaleria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catalogo_uuid` VARCHAR(60) NOT NULL,
    `url` VARCHAR(200) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `catalogoGaleria_id_key`(`id`),
    INDEX `catalogoGaleria_catalogo_uuid_idx`(`catalogo_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(80) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `nome` VARCHAR(50) NOT NULL,
    `roles` ENUM('ADM', 'TOTEM') NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `funcionario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `dataDaVisita` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `visitas_id_key`(`id`),
    INDEX `visitas_usuario_id_idx`(`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lidoPeloUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `catalogo_uuid` VARCHAR(60) NOT NULL,
    `dataDaDescoberta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    INDEX `lidoPeloUser_usuario_id_idx`(`usuario_id`),
    INDEX `lidoPeloUser_catalogo_uuid_idx`(`catalogo_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fileBasePaia` (
    `uuid` VARCHAR(191) NOT NULL,
    `file` LONGBLOB NOT NULL,
    `mimeType` VARCHAR(50) NOT NULL,

    INDEX `fileBasePaia_uuid_idx`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `catalogo` ADD CONSTRAINT `catalogo_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `funcionario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `catalogoGaleria` ADD CONSTRAINT `catalogoGaleria_catalogo_uuid_fkey` FOREIGN KEY (`catalogo_uuid`) REFERENCES `catalogo`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visitas` ADD CONSTRAINT `visitas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lidoPeloUser` ADD CONSTRAINT `lidoPeloUser_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lidoPeloUser` ADD CONSTRAINT `lidoPeloUser_catalogo_uuid_fkey` FOREIGN KEY (`catalogo_uuid`) REFERENCES `catalogo`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
