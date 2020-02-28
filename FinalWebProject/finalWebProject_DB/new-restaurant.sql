-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: new-restaurant
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `name_ru` varchar(45) DEFAULT NULL,
  `cost` double NOT NULL,
  PRIMARY KEY (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Beef','Говядина',30),(2,'Pork','Свинина',25),(3,'Fish','Рыба',15),(4,'Bread','Хлеб',1),(5,'Potato','Картофель',1.5),(6,'Wine','Вино',5),(7,'Juice','Сок',2),(8,'Salad','Салат',13),(9,'Coffee','Кофе',4),(10,'Chicken','Курица',15),(11,'Pizza','Пицца',20),(12,'Pasta','Макароны',10),(16,'Tea','Чай',4),(17,'Hambuger','Гамбургер',11.69),(18,'Milk','Молоко',2.99),(19,'Soup','Суп',5);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdishes`
--

DROP TABLE IF EXISTS `orderdishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdishes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_menu` int NOT NULL,
  `number` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOrder_idx` (`id_order`),
  KEY `menuIdOrder_idx` (`id_menu`),
  CONSTRAINT `dishesIdOrder` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`),
  CONSTRAINT `menuIdOrder` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdishes`
--

LOCK TABLES `orderdishes` WRITE;
/*!40000 ALTER TABLE `orderdishes` DISABLE KEYS */;
INSERT INTO `orderdishes` VALUES (4,5,2,1),(5,5,4,2),(6,5,6,1),(25,21,3,2),(26,21,5,1),(27,21,7,1),(28,21,6,1),(29,23,1,1),(30,23,5,1),(31,23,7,1),(32,23,6,1),(81,116,1,2),(82,116,3,2),(83,116,5,2),(84,116,6,1),(85,117,1,1),(86,117,5,2),(87,117,7,1),(88,118,2,2),(89,118,1,2),(90,118,6,1),(91,118,7,2),(92,119,1,1),(93,119,2,2),(94,119,6,2),(95,120,11,1),(96,120,12,1),(97,120,9,1);
/*!40000 ALTER TABLE `orderdishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `date` date NOT NULL,
  `accepted` tinyint(1) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `totalCost` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IdUserFK_idx` (`id_user`),
  CONSTRAINT `IdUserFK` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,5,'2019-11-23',1,1,32),(21,9,'2019-09-21',1,0,38.5),(23,20,'2020-01-26',1,0,38.5),(116,5,'2020-02-18',1,1,98),(117,26,'2020-02-18',1,1,35),(118,26,'2020-02-18',1,0,119),(119,23,'2020-02-20',1,1,90),(120,23,'2020-02-22',1,1,34);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Admin','viks1886@mail.ru','admin','Admin01'),(5,'Kate','kate@mail.ru','customer','Ka111'),(9,'Vika','vika@mail.ru','customer','Vi111'),(20,'Alex','alex@mail.ru','customer','Al111'),(21,'Mike','mike@mail.ru','customer','Mi111'),(22,'Bob','bob@mail.ru','customer','Bo111'),(23,'Andrey','andrey@mail.ru','customer','Ak111'),(24,'Olga1981','Olga1981@mail.ru','customer','Ol111'),(26,'Andrey81','andrey81@mail.ru','customer','Ak111');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-28 21:02:47
