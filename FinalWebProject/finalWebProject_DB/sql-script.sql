-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema new-restaurant
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema new-restaurant
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `new-restaurant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `new-restaurant` ;

-- -----------------------------------------------------
-- Table `new-restaurant`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new-restaurant`.`menu` (
  `id_menu` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `name_ru` VARCHAR(45) NULL DEFAULT NULL,
  `cost` DOUBLE NOT NULL,
  PRIMARY KEY (`id_menu`))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `new-restaurant`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new-restaurant`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 27
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `new-restaurant`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new-restaurant`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `date` DATE NOT NULL,
  `accepted` TINYINT(1) NOT NULL,
  `paid` TINYINT(1) NOT NULL,
  `totalCost` DOUBLE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `IdUserFK_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `IdUserFK`
    FOREIGN KEY (`id_user`)
    REFERENCES `new-restaurant`.`users` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 121
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `new-restaurant`.`orderdishes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `new-restaurant`.`orderdishes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_order` INT NOT NULL,
  `id_menu` INT NOT NULL,
  `number` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idOrder_idx` (`id_order` ASC) VISIBLE,
  INDEX `menuIdOrder_idx` (`id_menu` ASC) VISIBLE,
  CONSTRAINT `dishesIdOrder`
    FOREIGN KEY (`id_order`)
    REFERENCES `new-restaurant`.`orders` (`id`),
  CONSTRAINT `menuIdOrder`
    FOREIGN KEY (`id_menu`)
    REFERENCES `new-restaurant`.`menu` (`id_menu`))
ENGINE = InnoDB
AUTO_INCREMENT = 98
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
