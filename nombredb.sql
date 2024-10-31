-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: nombredb
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `iggs` decimal(10,2) NOT NULL DEFAULT '0.00',
  `irtra` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'juan peréz ','Administrador ',7000.00,0.00,NULL),(2,'María García','Diseñadora',4000.00,0.00,NULL),(3,'Pedro Martínez','Gerente',7000.00,0.00,NULL),(4,'jordy lima','programador ',7000.00,0.00,NULL),(5,'junior','maestro',3000.00,0.00,NULL),(10,'Rodrigo','Administrador',6000.00,0.00,NULL),(12,'enrique','gerente',7000.00,0.00,NULL),(13,'antonio ','analista',50000.00,0.00,NULL),(14,'byron ','maestro',2000.00,0.00,NULL);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomina`
--

DROP TABLE IF EXISTS `nomina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nomina` (
  `nomina_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `worked_days` int DEFAULT NULL,
  `extra_hours` int DEFAULT NULL,
  `total_salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`nomina_id`),
  KEY `id` (`id`),
  CONSTRAINT `nomina_ibfk_1` FOREIGN KEY (`id`) REFERENCES `empleados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomina`
--

LOCK TABLES `nomina` WRITE;
/*!40000 ALTER TABLE `nomina` DISABLE KEYS */;
INSERT INTO `nomina` VALUES (1,1,'juan peréz ','Administrador ',7000.00,20,5,4885.42),(2,1,'juan peréz ','Administrador ',7000.00,20,5,4885.42);
/*!40000 ALTER TABLE `nomina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empleado_id` int DEFAULT NULL,
  `permiso` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado_id` (`empleado_id`),
  CONSTRAINT `permisos_ibfk_1` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,1,'Vacaciones','juan perez','administrador',NULL),(2,2,'Embarazo','maria garcia','diseñadora',NULL),(5,10,'Enfermedad','Rodrigo','administrador',NULL);
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `fechaGeneracion` datetime DEFAULT NULL,
  `totalEmpleados` int NOT NULL,
  `totalNominaProcesada` decimal(10,2) NOT NULL,
  `detalles` json NOT NULL,
  `notas` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (1,'Reporte de Nómina - Octubre 2024','2024-10-22 00:00:00',7,41000.00,'[{\"id\": 1, \"cargo\": \"Administrador \", \"nombre\": \"juan peréz \", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 2, \"cargo\": \"Diseñadora\", \"nombre\": \"María García\", \"deducciones\": \"Q400.00\", \"salarioBase\": \"Q4000.00\", \"totalAPagar\": \"Q3600.00\"}, {\"id\": 3, \"cargo\": \"Gerente\", \"nombre\": \"Pedro Martínez\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 4, \"cargo\": \"programador \", \"nombre\": \"jordy lima\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 5, \"cargo\": \"maestro\", \"nombre\": \"junior\", \"deducciones\": \"Q300.00\", \"salarioBase\": \"Q3000.00\", \"totalAPagar\": \"Q2700.00\"}, {\"id\": 10, \"cargo\": \"Administrador\", \"nombre\": \"Rodrigo\", \"deducciones\": \"Q600.00\", \"salarioBase\": \"Q6000.00\", \"totalAPagar\": \"Q5400.00\"}, {\"id\": 12, \"cargo\": \"gerente\", \"nombre\": \"enrique\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}]','Todos los montos están en quetzales (Q).'),(2,'Reporte de Nómina - Octubre 2024','2024-10-22 00:00:00',7,41000.00,'[{\"id\": 1, \"cargo\": \"Administrador \", \"nombre\": \"juan peréz \", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 2, \"cargo\": \"Diseñadora\", \"nombre\": \"María García\", \"deducciones\": \"Q400.00\", \"salarioBase\": \"Q4000.00\", \"totalAPagar\": \"Q3600.00\"}, {\"id\": 3, \"cargo\": \"Gerente\", \"nombre\": \"Pedro Martínez\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 4, \"cargo\": \"programador \", \"nombre\": \"jordy lima\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 5, \"cargo\": \"maestro\", \"nombre\": \"junior\", \"deducciones\": \"Q300.00\", \"salarioBase\": \"Q3000.00\", \"totalAPagar\": \"Q2700.00\"}, {\"id\": 10, \"cargo\": \"Administrador\", \"nombre\": \"Rodrigo\", \"deducciones\": \"Q600.00\", \"salarioBase\": \"Q6000.00\", \"totalAPagar\": \"Q5400.00\"}, {\"id\": 12, \"cargo\": \"gerente\", \"nombre\": \"enrique\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}]','Todos los montos están en quetzales (Q).'),(5,'Reporte de Nómina - Octubre 2024','2024-10-26 00:00:00',9,93000.00,'[{\"id\": 1, \"cargo\": \"Administrador \", \"nombre\": \"juan peréz \", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 2, \"cargo\": \"Diseñadora\", \"nombre\": \"María García\", \"deducciones\": \"Q400.00\", \"salarioBase\": \"Q4000.00\", \"totalAPagar\": \"Q3600.00\"}, {\"id\": 3, \"cargo\": \"Gerente\", \"nombre\": \"Pedro Martínez\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 4, \"cargo\": \"programador \", \"nombre\": \"jordy lima\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 5, \"cargo\": \"maestro\", \"nombre\": \"junior\", \"deducciones\": \"Q300.00\", \"salarioBase\": \"Q3000.00\", \"totalAPagar\": \"Q2700.00\"}, {\"id\": 10, \"cargo\": \"Administrador\", \"nombre\": \"Rodrigo\", \"deducciones\": \"Q600.00\", \"salarioBase\": \"Q6000.00\", \"totalAPagar\": \"Q5400.00\"}, {\"id\": 12, \"cargo\": \"gerente\", \"nombre\": \"enrique\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 13, \"cargo\": \"analista\", \"nombre\": \"antonio \", \"deducciones\": \"Q5000.00\", \"salarioBase\": \"Q50000.00\", \"totalAPagar\": \"Q45000.00\"}, {\"id\": 14, \"cargo\": \"maestro\", \"nombre\": \"byron \", \"deducciones\": \"Q200.00\", \"salarioBase\": \"Q2000.00\", \"totalAPagar\": \"Q1800.00\"}]','Todos los montos están en quetzales (Q).'),(6,'Reporte de Nómina - Octubre 2024','2024-10-28 00:00:00',9,93000.00,'[{\"id\": 1, \"cargo\": \"Administrador \", \"nombre\": \"juan peréz \", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 2, \"cargo\": \"Diseñadora\", \"nombre\": \"María García\", \"deducciones\": \"Q400.00\", \"salarioBase\": \"Q4000.00\", \"totalAPagar\": \"Q3600.00\"}, {\"id\": 3, \"cargo\": \"Gerente\", \"nombre\": \"Pedro Martínez\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 4, \"cargo\": \"programador \", \"nombre\": \"jordy lima\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 5, \"cargo\": \"maestro\", \"nombre\": \"junior\", \"deducciones\": \"Q300.00\", \"salarioBase\": \"Q3000.00\", \"totalAPagar\": \"Q2700.00\"}, {\"id\": 10, \"cargo\": \"Administrador\", \"nombre\": \"Rodrigo\", \"deducciones\": \"Q600.00\", \"salarioBase\": \"Q6000.00\", \"totalAPagar\": \"Q5400.00\"}, {\"id\": 12, \"cargo\": \"gerente\", \"nombre\": \"enrique\", \"deducciones\": \"Q700.00\", \"salarioBase\": \"Q7000.00\", \"totalAPagar\": \"Q6300.00\"}, {\"id\": 13, \"cargo\": \"analista\", \"nombre\": \"antonio \", \"deducciones\": \"Q5000.00\", \"salarioBase\": \"Q50000.00\", \"totalAPagar\": \"Q45000.00\"}, {\"id\": 14, \"cargo\": \"maestro\", \"nombre\": \"byron \", \"deducciones\": \"Q200.00\", \"salarioBase\": \"Q2000.00\", \"totalAPagar\": \"Q1800.00\"}]','Todos los montos están en quetzales (Q).');
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'jordy','jordy.lima007@hotmail.com','Admin'),(2,'enrique mazariegos','enri_maz12@gmail.com','Supervisor'),(3,'jordy','jordy-lima01@gmail.com','Empleado');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 22:00:42
