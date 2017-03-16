--
-- Table structure for table `tbl_chat_messages`
--

DROP TABLE IF EXISTS `tbl_chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_chat_messages` (
  `pk` int NOT NULL AUTO_INCREMENT,
  `id` varchar(45) DEFAULT NULL,
  `message_body` varchar(500) NOT NULL,
  `time` timestamp NOT NULL,
  `sender_ip` varchar(150) DEFAULT NULL,
  `receiver_ip` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`pk`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;