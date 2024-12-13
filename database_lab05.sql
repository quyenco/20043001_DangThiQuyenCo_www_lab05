-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.3.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for works
CREATE DATABASE IF NOT EXISTS `works` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `works`;

-- Dumping structure for table works.address
CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `country` smallint(6) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `street` varchar(150) DEFAULT NULL,
  `zipcode` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.address: ~22 rows (approximately)
INSERT INTO `address` (`id`, `city`, `country`, `number`, `street`, `zipcode`) VALUES
	(1, 'Hanoi', 1, 'A1', '123 Main St', '100000'),
	(2, 'HCMC', 1, 'B2', '456 High St', '700000'),
	(3, 'Da Nang', 1, 'C3', '789 Elm St', '550000'),
	(4, 'Hai Phong', 1, 'D4', '321 Oak St', '180000'),
	(5, 'Can Tho', 1, 'E5', '654 Pine St', '900000'),
	(6, 'Nha Trang', 1, 'F6', '987 Cedar St', '570000'),
	(7, 'Hue', 1, 'G7', '147 Birch St', '530000'),
	(8, 'Vung Tau', 1, 'H8', '258 Spruce St', '790000'),
	(9, 'Quang Ninh', 1, 'I9', '369 Maple St', '200000'),
	(10, 'Bac Ninh', 1, 'J10', '741 Palm St', '220000'),
	(11, 'Lang Son', 1, 'K11', '852 Aspen St', '240000'),
	(12, 'Lao Cai', 1, 'L12', '963 Willow St', '330000'),
	(13, 'Thanh Hoa', 1, 'M13', '135 Fir St', '440000'),
	(14, 'Nghe An', 1, 'N14', '246 Redwood St', '460000'),
	(15, 'Binh Duong', 1, 'O15', '357 Cypress St', '820000'),
	(16, 'Phu Quoc', 1, 'P16', '468 Sequoia St', '920000'),
	(17, 'Dalat', 1, 'Q17', '579 Sycamore St', '670000'),
	(18, 'Pleiku', 1, 'R18', '681 Banyan St', '600000'),
	(19, 'Tam Ky', 1, 'S19', '792 Acacia St', '510000'),
	(20, 'Soc Trang', 1, 'T20', '903 Magnolia St', '910000'),
	(21, 'HCM', NULL, NULL, 'nguyen van nghi', '700000'),
	(22, 'hcm', NULL, NULL, 'duong so 6', '10000');

-- Dumping structure for table works.candidate
CREATE TABLE IF NOT EXISTS `candidate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dob` date NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UK_m8qhlm4wu215gr34dhxp0dour` (`address`) USING BTREE,
  CONSTRAINT `FKa8gnyyhbb2qnhp94grci1n0o9` FOREIGN KEY (`address`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.candidate: ~11 rows (approximately)
INSERT INTO `candidate` (`id`, `dob`, `email`, `full_name`, `password`, `phone`, `address`) VALUES
	(1, '1990-01-01', 'candidate1@example.com', 'Candidate One', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345678', 1),
	(2, '1992-02-02', 'candidate2@example.com', 'Candidate Two', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345679', 2),
	(3, '1994-03-03', 'candidate3@example.com', 'Candidate Three', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345680', 3),
	(4, '1996-04-04', 'candidate4@example.com', 'Candidate Four', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345681', 4),
	(5, '1998-05-05', 'candidate5@example.com', 'Candidate Five', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345682', 5),
	(6, '2000-06-06', 'candidate6@example.com', 'Candidate Six', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345683', 6),
	(7, '1988-07-07', 'candidate7@example.com', 'Candidate Seven', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345684', 7),
	(8, '1986-08-08', 'candidate8@example.com', 'Candidate Eight', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345685', 8),
	(9, '1984-09-09', 'candidate9@example.com', 'Candidate Nine', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345686', 9),
	(10, '1982-10-10', 'candidate10@example.com', 'Candidate Ten', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0912345687', 10),
	(11, '2002-01-31', 'dangthiquyenco2002@gmail.com', ' Quyen Co', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', ' 0326045366', 22);

-- Dumping structure for table works.candidate_skill
CREATE TABLE IF NOT EXISTS `candidate_skill` (
  `serial_versionuid` bigint(20) NOT NULL,
  `more_infos` varchar(1000) DEFAULT NULL,
  `skill_level` tinyint(4) NOT NULL CHECK (`skill_level` between 0 and 4),
  `can_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  PRIMARY KEY (`can_id`,`serial_versionuid`,`skill_id`),
  KEY `FKb7cxhiqhcah7c20a2cdlvr1f8` (`skill_id`),
  CONSTRAINT `FKb0m5tm3fi0upa3b3kjx3vrlxs` FOREIGN KEY (`can_id`) REFERENCES `candidate` (`id`),
  CONSTRAINT `FKb7cxhiqhcah7c20a2cdlvr1f8` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.candidate_skill: ~0 rows (approximately)

-- Dumping structure for table works.company
CREATE TABLE IF NOT EXISTS `company` (
  `comp_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `about` varchar(2000) DEFAULT NULL,
  `comp_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `web_url` varchar(255) DEFAULT NULL,
  `address` bigint(20) NOT NULL,
  PRIMARY KEY (`comp_id`),
  UNIQUE KEY `UK_rvp2hunsq4sgmpxe3a7i1ym3m` (`address`),
  CONSTRAINT `FKd5occp4cjwihejbxdbpvkp5tv` FOREIGN KEY (`address`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.company: ~11 rows (approximately)
INSERT INTO `company` (`comp_id`, `about`, `comp_name`, `email`, `password`, `phone`, `web_url`, `address`) VALUES
	(1, 'Company One Description', 'Company One', 'company1@example.com', '$2a$10$zQsyhSV635a9hX9.3tQdV.z0o0KaV18sKTj08.yez3TAfj5DySpF6', '0987654321', 'https://company1.com', 11),
	(2, 'Company Two Description', 'Company Two', 'company2@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654322', 'https://company2.com', 12),
	(3, 'Company Three Description', 'Company Three', 'company3@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654323', 'https://company3.com', 13),
	(4, 'Company Four Description', 'Company Four', 'company4@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654324', 'https://company4.com', 14),
	(5, 'Company Five Description', 'Company Five', 'company5@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654325', 'https://company5.com', 15),
	(6, 'Company Six Description', 'Company Six', 'company6@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654326', 'https://company6.com', 16),
	(7, 'Company Seven Description', 'Company Seven', 'company7@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654327', 'https://company7.com', 17),
	(8, 'Company Eight Description', 'Company Eight', 'company8@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654328', 'https://company8.com', 18),
	(9, 'Company Nine Description', 'Company Nine', 'company9@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654329', 'https://company9.com', 19),
	(10, 'Company Ten Description', 'Company Ten', 'company10@example.com', '$2a$10$5SYl.xgUsXFrCF2VnyHk3e//ZX3h4.KUX07q1nk/82QDjY.187DAe', '0987654330', 'https://company10.com', 20),
	(11, '', 'Quyen Co dev', '1@gmail.com', '$2a$10$zQsyhSV635a9hX9.3tQdV.z0o0KaV18sKTj08.yez3TAfj5DySpF6', '1111111111', 'http://ecomm.com', 21);

-- Dumping structure for table works.experience
CREATE TABLE IF NOT EXISTS `experience` (
  `exp_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `from_date` date NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `to_date` date NOT NULL,
  `work_desc` varchar(255) NOT NULL,
  `can_id` bigint(20) NOT NULL,
  PRIMARY KEY (`exp_id`),
  KEY `FK8d5oqe0wxh52v352i04qnuady` (`can_id`),
  CONSTRAINT `FK8d5oqe0wxh52v352i04qnuady` FOREIGN KEY (`can_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.experience: ~10 rows (approximately)
INSERT INTO `experience` (`exp_id`, `company_name`, `from_date`, `role`, `to_date`, `work_desc`, `can_id`) VALUES
	(1, 'TechCorp', '2015-01-01', 'Software Engineer', '2018-12-31', 'Developed enterprise solutions', 1),
	(2, 'WebSolutions', '2016-03-01', 'Frontend Developer', '2019-06-30', 'Designed responsive websites', 2),
	(3, 'DataAnalytics', '2017-07-01', 'Data Analyst', '2020-11-30', 'Analyzed business data trends', 3),
	(4, 'CloudNet', '2018-02-15', 'Cloud Engineer', '2021-08-31', 'Implemented cloud architectures', 4),
	(5, 'CyberSecure', '2019-01-01', 'Security Analyst', '2022-05-31', 'Conducted penetration testing', 5),
	(6, 'MobileWorld', '2020-06-01', 'Mobile Developer', '2023-03-31', 'Built mobile applications', 6),
	(7, 'FinanceTech', '2014-09-01', 'Business Analyst', '2017-12-31', 'Worked on financial systems', 7),
	(8, 'DesignHub', '2013-04-01', 'UI/UX Designer', '2016-08-31', 'Created user-friendly interfaces', 8),
	(9, 'EduPlatform', '2012-01-01', 'Backend Developer', '2015-12-31', 'Developed learning platforms', 9),
	(10, 'HealthTech', '2011-05-01', 'Project Manager', '2014-10-31', 'Managed healthcare projects', 10);

-- Dumping structure for table works.job
CREATE TABLE IF NOT EXISTS `job` (
  `job_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_desc` varchar(2000) NOT NULL,
  `job_name` varchar(255) NOT NULL,
  `company` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `FKbaqlvluu78phmo9ld89um7wnm` (`company`),
  CONSTRAINT `FKbaqlvluu78phmo9ld89um7wnm` FOREIGN KEY (`company`) REFERENCES `company` (`comp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.job: ~12 rows (approximately)
INSERT INTO `job` (`job_id`, `job_desc`, `job_name`, `company`) VALUES
	(1, 'Develop enterprise software solutions', 'Software Engineer', 1),
	(2, 'Design and develop user interfaces', 'Frontend Developer', 2),
	(3, 'Analyze business data trends and insights', 'Data Analyst', 3),
	(4, 'Implement and manage cloud solutions', 'Cloud Engineer', 4),
	(5, 'Ensure system security and compliance', 'Security Analyst', 5),
	(6, 'Build and maintain mobile applications', 'Mobile Developer', 6),
	(7, 'Analyze and optimize business processes', 'Business Analyst', 7),
	(8, 'Design user-centered interfaces', 'UI/UX Designer', 8),
	(9, 'Develop backend systems for platforms', 'Backend Developer', 9),
	(10, 'Manage and execute projects', 'Project Manager', 10),
	(11, 'Test webside and create report ', 'Tester webside', 11),
	(12, 'execute the code in java', 'Website development', 11);

-- Dumping structure for table works.job_skill
CREATE TABLE IF NOT EXISTS `job_skill` (
  `more_infos` varchar(1000) DEFAULT NULL,
  `skill_level` tinyint(4) NOT NULL CHECK (`skill_level` between 0 and 4),
  `job_id` bigint(20) NOT NULL,
  `skill_id` bigint(20) NOT NULL,
  PRIMARY KEY (`job_id`,`skill_id`),
  KEY `FKj33qbbf3vk1lvhqpcosnh54u1` (`skill_id`),
  CONSTRAINT `FK9ix4wg520ii2gu2felxdhdup6` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`),
  CONSTRAINT `FKj33qbbf3vk1lvhqpcosnh54u1` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.job_skill: ~24 rows (approximately)
INSERT INTO `job_skill` (`more_infos`, `skill_level`, `job_id`, `skill_id`) VALUES
	('Expert in Java programming', 0, 1, 1),
	('Proficient in Python programming', 1, 1, 2),
	('Knowledgeable in Web Development', 2, 1, 3),
	('Skilled in HTML/CSS', 1, 2, 3),
	('Experience with UI/UX Design', 2, 2, 8),
	('Experience with Java for data analysis', 1, 3, 1),
	('Proficient in Data Analysis using Excel', 1, 3, 6),
	('Familiar with Cloud Computing', 0, 3, 7),
	('Familiar with Excel for cloud-related data analysis', 0, 4, 6),
	('Expert in AWS Cloud Solutions', 0, 4, 7),
	('Skilled in backend development and machine learning', 1, 5, 9),
	('Experienced in Penetration Testing for Cybersecurity', 1, 5, 10),
	('Proficient in Python for mobile app development', 2, 6, 2),
	('Proficient in Android mobile development', 2, 6, 5),
	('Familiar with TensorFlow for Machine Learning', 0, 7, 9),
	('Experienced in designing interfaces with Figma', 1, 8, 8),
	('Proficient in SQL and Database Management', 1, 9, 4),
	('Knowledgeable in Data Analysis for Business Insights', 2, 9, 6),
	('Basic understanding of SQL for managing projects', 0, 10, 4),
	('Skilled in Mobile Development for project management', 1, 10, 5),
	('', 2, 11, 6),
	('', 1, 11, 10),
	('', 1, 12, 1),
	('', 1, 12, 3);

-- Dumping structure for table works.skill
CREATE TABLE IF NOT EXISTS `skill` (
  `skill_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `skill_description` varchar(255) DEFAULT NULL,
  `skill_name` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL CHECK (`type` between 0 and 2),
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table works.skill: ~10 rows (approximately)
INSERT INTO `skill` (`skill_id`, `skill_description`, `skill_name`, `type`) VALUES
	(1, 'Java programming', 'Java', 0),
	(2, 'Python programming', 'Python', 0),
	(3, 'Web Development', 'HTML/CSS', 1),
	(4, 'Database Management', 'SQL', 2),
	(5, 'Mobile Development', 'Android', 1),
	(6, 'Data Analysis', 'Excel', 2),
	(7, 'Cloud Computing', 'AWS', 0),
	(8, 'UI/UX Design', 'Figma', 2),
	(9, 'Machine Learning', 'TensorFlow', 1),
	(10, 'Cybersecurity', 'Penetration Testing', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
