-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(80) NULL,
    `senha` VARCHAR(100) NULL DEFAULT '',
    `googleId` VARCHAR(45) NULL,
    `nascimento` DATE NULL,
    `facebookId` VARCHAR(45) NULL,
    `foto` VARCHAR(200) NULL,
    `apelido` VARCHAR(45) NULL,
    `nome` VARCHAR(50) NULL,
    `cidade` VARCHAR(50) NULL,
    `sexo` ENUM('F', 'M', 'O') NULL,
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `catalogo` (
    `uuid` VARCHAR(50) NOT NULL,
    `funcionario_autor` INTEGER NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `nomePopular` VARCHAR(45) NOT NULL,
    `nomeCientifico` VARCHAR(45) NOT NULL,
    `som` VARCHAR(45) NULL,
    `medalha` VARCHAR(45) NULL,
    `estrela` DECIMAL(1, 1) NULL,
    `nascimento` DATE NULL,
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `id_UNIQUE`(`uuid`),
    UNIQUE INDEX `funcionario_autor_UNIQUE`(`funcionario_autor`),
    INDEX `fk_arvore_funcionario1_idx`(`funcionario_autor`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catalogo_uuid` VARCHAR(50) NOT NULL,
    `url` VARCHAR(45) NOT NULL,
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `fk_foto_catalogo1_idx`(`catalogo_uuid`),
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
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `dataDaVisita` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `usuario_id_UNIQUE`(`usuario_id`),
    INDEX `fk_visitas_usuario1_idx`(`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lidopelouser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `catalogo_uuid` VARCHAR(50) NOT NULL,
    `dataDaDescoberta` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,

    INDEX `fk_descobertasInteressantes_usuario1_idx`(`usuario_id`),
    INDEX `fk_lidoPeloUser_catalogo1_idx`(`catalogo_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `visitas` ADD CONSTRAINT `visitas_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
