-- MySQL dump 10.13  Distrib 5.7.13, for Linux (x86_64)
--
-- Host: localhost    Database: escolarespi
-- ------------------------------------------------------
-- Server version	5.7.13-0ubuntu0.16.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `turno` int(4) NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `hora_fin` datetime NOT NULL,
  `tiempo_estimado` int(2) NOT NULL,
  `estado` int(12) NOT NULL,
  `carrera` int(12) NOT NULL,
  `ficha_inscripcion` int(10) NOT NULL,
  `indice` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carreraFk` (`carrera`) COMMENT 'Carrera de inscripción',
  CONSTRAINT `carreraFk` FOREIGN KEY (`carrera`) REFERENCES `carreras` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (53,'ivan gastelum',1,'2015-11-03 13:11:16','2015-11-03 13:27:22',11,2,6,1,'2015-11-03'),(54,'David Guillens',2,'2015-11-03 13:11:38','2015-11-03 13:52:11',11,2,3,2,'2015-11-03'),(58,'ivan romero',3,'2015-11-03 13:11:02','2015-11-03 13:25:48',15,2,3,5,'2015-11-03'),(60,'ivan gasdsets',4,'2015-11-03 13:11:04','2015-11-03 13:25:59',29,2,6,6,'2015-11-03'),(61,'juan juanca',5,'2015-11-03 13:11:24','2015-11-03 13:27:26',25,2,2,56,'2015-11-03'),(62,'Manuel Solano',6,'2015-11-03 18:11:16','2015-11-03 18:16:02',20,2,6,12345,'2015-11-03'),(63,'David Guillen',1,'2015-11-04 22:11:26','0000-00-00 00:00:00',11,1,3,123,'2015-11-04');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carreras` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (1,'Ing. Electrónica'),(2,'Ing. Electrómecanica'),(3,'Ing. Gestión Empresarial'),(4,'Ing. Industrial'),(5,'Ing. Mecatrónica'),(6,'Ing. Sistemas Computacionales'),(7,'Lic. Administación');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `usuario` varchar(60) NOT NULL,
  `password` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,'david','david','12345');
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

-- Dump completed on 2016-11-15 12:03:08
