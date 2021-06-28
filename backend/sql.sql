-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.14-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para sb4games
DROP DATABASE IF EXISTS `sb4games`;
CREATE DATABASE IF NOT EXISTS `sb4games` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `sb4games`;

-- Copiando estrutura para tabela sb4games.games
DROP TABLE IF EXISTS `games`;
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `banner_url` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sb4games.games: ~2 rows (aproximadamente)
DELETE FROM `games`;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`id`, `name`, `banner_url`) VALUES
	(1, 'Complexo Paulista RP', 'https://cdn.discordapp.com/attachments/661387442984583188/836997292144721920/logo.png'),
	(2, 'Evolution PVP', 'https://cdn.discordapp.com/attachments/661387442984583188/829784523209703424/EvolutionPVP.png');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;

-- Copiando estrutura para tabela sb4games.game_counters
DROP TABLE IF EXISTS `game_counters`;
CREATE TABLE IF NOT EXISTS `game_counters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `game` varchar(255) DEFAULT NULL,
  `counter` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sb4games.game_counters: ~2 rows (aproximadamente)
DELETE FROM `game_counters`;
/*!40000 ALTER TABLE `game_counters` DISABLE KEYS */;
INSERT INTO `game_counters` (`id`, `username`, `game`, `counter`) VALUES
	(1, 'gabrielh2c', 'Complexo Paulista RP', 456342),
	(2, 'gabrielh2c', 'Evolution PVP', 2010);
/*!40000 ALTER TABLE `game_counters` ENABLE KEYS */;

-- Copiando estrutura para tabela sb4games.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(90) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userLogin` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthDate` varchar(255) NOT NULL,
  `avatarIndex` smallint(6) DEFAULT 1,
  `backgroundIndex` smallint(6) DEFAULT 1,
  `profile_desc` text DEFAULT 'Nenhuma descrição',
  `user_level` smallint(6) DEFAULT 1,
  `friend_requests` text DEFAULT '[]',
  `friend_list` text DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sb4games.users: ~6 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `userLogin`, `password`, `email`, `birthDate`, `avatarIndex`, `backgroundIndex`, `profile_desc`, `user_level`, `friend_requests`, `friend_list`) VALUES
	('1ccd7363-8d75-4ee5-9b49-126793011130', 'Evaldo', 'evaldomtb', '$2b$10$G2d42mspqo4ep2zEdlT21usxHdAxe2esl1/AbK/jyuy55ABkQ2Sfi', 'evaldomtb@gmail.com', '2003-02-27', 9, 1, 'Nenhuma descrição', 1, '[]', '["gabrielh2c"]'),
	('4b260034-ca90-4ace-a2b7-1de9a80c16d6', 'Rayllan santos de souza', 'Rayllan5111', '88157033', 'rayllan51@gmail.com', '10/11/1999', 2, 1, 'Nenhuma descrição', 1, '[]', '[]'),
	('7028f33e-7851-458c-aaa8-b48e665632d1', 'Rayllan santos de souza', 'Rayllan511111', '$2b$10$JD59nUNv4DhLSKe.ckF2uepaCELjBcD2JDWSWALF99FKjc3TjOykC', 'rayllan51@gmail.com', '10/11/1999', 3, 1, 'Nenhuma descrição', 1, '["gabrielh2c", "Rayllan51111"]', '[]'),
	('74d2c0a8-fe41-43a1-a01f-739359f03b84', 'Rayllan santos de souza', 'Rayllan511', '88157033', 'rayllan51@gmail.com', '10/11/1999', 6, 1, 'Nenhuma descrição', 1, '[]', '[]'),
	('831e8cf6-6651-4170-a7ee-a92c05cafc8e', 'Rayllan santos de souza', 'Rayllan5', '88157033', 'rayllan51@gmail.com', '10/11/1999', 5, 1, 'Nenhuma descrição', 1, '[]', '["gabrielh2c"]'),
	('ab2281e8-71f5-4a56-b4f6-262f889529b6', 'Gabriel Hoppe', 'gabrielh2c', '$2b$10$N/Nj8OVLjmkve8MMQ2.fZ.KRolCxAjL.bNMQfEqMTpJDRV.czLvuq', 'gabrielh2c@hotmail.com', '2003-02-27', 8, 6, '🚀 Engenheiro de software<br />🥇 Contratado pela NASA<br />🚀 Criador do the crew dragon<br />🐺 Lobinhu', 56, '[]', '["Rayllan51111","Rayllan5","evaldomtb"]'),
	('adfawdafawdawd', 'rayllan souza', 'Rayllan51', '88157033', 'rayllan51@gmail.com', '27/06/1999', 9, 1, 'Nenhuma descrição', 1, '[]', '[]'),
	('c64b8e7a-4afd-4995-a1d2-f4ca5e3a37e2', 'Teste', 'testando', '$2b$10$PmMJJH9OAER88IXzY6YQU.YJesEHi2E1S1k6OB79Jqp0eWBmxYp06', 'testando@gmail.com', '00-00-00', 11, 1, 'Nenhuma descrição', 1, '[]', '[]'),
	('eebf1ca6-34bb-4913-b9b4-613af0bb82cc', 'Rayllan santos de souza', 'Rayllan51111', '88157033', 'rayllan51@gmail.com', '10/11/1999', 3, 1, 'Nenhuma descrição', 1, '[]', '["gabrielh2c"]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
