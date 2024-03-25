-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbPj3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dbPj3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbPj3` DEFAULT CHARACTER SET utf8 ;
USE `dbPj3` ;

-- -----------------------------------------------------
-- Table `dbPj3`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(80) NULL,
  `senhaHash` VARCHAR(100) NULL,
  `foto` VARCHAR(45) NULL,
  `nome` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(1) NOT NULL,
  `telefone` VARCHAR(45) NOT NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPj3`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`funcionario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(80) NOT NULL,
  `senhaHash` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `adm` TINYINT NOT NULL DEFAULT 0,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPj3`.`visitas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`visitas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `funcionario_id` INT NULL,
  `dataDaVisita` DATETIME NOT NULL,
  INDEX `fk_visitas_funcionario1_idx` (`funcionario_id` ASC),
  PRIMARY KEY (`id`, `usuario_id`),
  INDEX `fk_visitas_usuario1_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_visitas_funcionario1`
    FOREIGN KEY (`funcionario_id`)
    REFERENCES `dbPj3`.`funcionario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_visitas_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `dbPj3`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPj3`.`catalogo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`catalogo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `funcionario_autor` INT NOT NULL,
  `descricao` VARCHAR(45) NOT NULL,
  `nomePopular` VARCHAR(45) NOT NULL,
  `nomeCientifico` VARCHAR(45) NOT NULL,
  `som` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_arvore_funcionario1_idx` (`funcionario_autor` ASC),
  CONSTRAINT `fk_arvore_funcionario1`
    FOREIGN KEY (`funcionario_autor`)
    REFERENCES `dbPj3`.`funcionario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPj3`.`lidoPeloUser`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`lidoPeloUser` (
  `usuario_id` INT NOT NULL,
  `catalogo_id` INT NOT NULL,
  `dataDaDescoberta` DATETIME NOT NULL,
  PRIMARY KEY (`usuario_id`, `catalogo_id`),
  INDEX `fk_descobertasInteressantes_usuario1_idx` (`usuario_id` ASC),
  INDEX `fk_lidoPeloUser_catalogo1_idx` (`catalogo_id` ASC),
  CONSTRAINT `fk_descobertasInteressantes_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `dbPj3`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lidoPeloUser_catalogo1`
    FOREIGN KEY (`catalogo_id`)
    REFERENCES `dbPj3`.`catalogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPj3`.`foto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbPj3`.`foto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `catalogo_id` INT NOT NULL,
  `url` VARCHAR(45) NOT NULL,
  `mostrarNoCarrosel` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `catalogo_id`),
  INDEX `fk_foto_catalogo1_idx` (`catalogo_id` ASC),
  CONSTRAINT `fk_foto_catalogo1`
    FOREIGN KEY (`catalogo_id`)
    REFERENCES `dbPj3`.`catalogo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
