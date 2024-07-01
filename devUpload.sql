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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devUpload`
--

LOCK TABLES `devUpload` WRITE;
/*!40000 ALTER TABLE `devUpload` DISABLE KEYS */;
INSERT INTO `devUpload` VALUES (4,'Yaswanth','jj','A','1719641659704-WhatsApp Image 2024-06-05 at 12.56.34 PM.jpeg',NULL),(26,'WhatsApp Image 2024-06-05 at 12.56.34 PM (1).jpeg','Tag1','A','1719817978365-WhatsApp Image 2024-06-05 at 12.56.34 PM (1).jpeg',NULL),(28,'index.html','Tag3','A','1719819072206-index.html',NULL),(31,'Screenshot from 2024-06-24 11-17-23.png','Tag1','B','1719827445673-Screenshot from 2024-06-24 11-17-23.png',NULL);
/*!40000 ALTER TABLE `devUpload` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 15:25:23
