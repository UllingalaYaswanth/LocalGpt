-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: localgpt
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.24.04.1

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
-- Table structure for table `adm_acc_create`
--

DROP TABLE IF EXISTS `adm_acc_create`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adm_acc_create` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','developer','user') NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm_acc_create`
--

LOCK TABLES `adm_acc_create` WRITE;
/*!40000 ALTER TABLE `adm_acc_create` DISABLE KEYS */;
INSERT INTO `adm_acc_create` VALUES (1,'sai','300','sai','user',1),(2,'sruthi','301','sruthi','user',2),(3,'sree','202','sree','user',2),(4,'sai','100','100','user',2),(7,'hihi','233','hihi','user',2),(8,'gegeg','333','333','user',2),(9,'anjali','203','anjali','user',1),(12,'sweety','232','232','user',3),(15,'1234','12341234','2341','admin',1),(18,'asdcfv','105','2341qaz','admin',1);
/*!40000 ALTER TABLE `adm_acc_create` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adm_grp_create`
--

DROP TABLE IF EXISTS `adm_grp_create`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adm_grp_create` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupName` varchar(255) NOT NULL,
  `users` json NOT NULL,
  `documentTypes` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm_grp_create`
--

LOCK TABLES `adm_grp_create` WRITE;
/*!40000 ALTER TABLE `adm_grp_create` DISABLE KEYS */;
INSERT INTO `adm_grp_create` VALUES (14,'gdfh','[\"sai\"]','[\"Document 1\"]');
/*!40000 ALTER TABLE `adm_grp_create` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devUpload`
--

DROP TABLE IF EXISTS `devUpload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devUpload` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(255) DEFAULT NULL,
  `Tags` varchar(255) DEFAULT NULL,
  `level` enum('A','B','C') DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `Actions` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devUpload`
--

LOCK TABLES `devUpload` WRITE;
/*!40000 ALTER TABLE `devUpload` DISABLE KEYS */;
INSERT INTO `devUpload` VALUES (4,'Yaswanth','jj','A','1719641659704-WhatsApp Image 2024-06-05 at 12.56.34 PM.jpeg',NULL),(26,'WhatsApp Image 2024-06-05 at 12.56.34 PM (1).jpeg','Tag1','A','1719817978365-WhatsApp Image 2024-06-05 at 12.56.34 PM (1).jpeg',NULL),(28,'index.html','Tag3','A','1719819072206-index.html',NULL),(31,'Screenshot from 2024-06-24 11-17-23.png','Tag1','B','1719827445673-Screenshot from 2024-06-24 11-17-23.png',NULL),(32,'HSL_QR highlight points.odt','wer','A','1719829155128-HSL_QR highlight points.odt',NULL),(33,'package-lock.json','wersdvg','A','1719831230677-package-lock.json',NULL),(34,'package-lock.json','dsbgf','A','1719831450610-package-lock.json',NULL),(35,'abc.png','sdasdfgasdf','B','1719831659476-abc.png',NULL),(36,'abc.png','dsbgf','A','1719831728253-abc.png',NULL);
/*!40000 ALTER TABLE `devUpload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UID` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'100','100','admin'),(2,'101','101','developer'),(3,'102','102','user');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 17:02:41
