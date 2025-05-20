-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 20, 2025 at 07:03 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `courseorganization`
--

-- --------------------------------------------------------

--
-- Table structure for table `coursework`
--

CREATE TABLE IF NOT EXISTS `coursework` (
  `name` varchar(25) NOT NULL,
  `percentage` int(11) NOT NULL,
  `due_date` date NOT NULL,
  `grade_out_of100` int(11) NOT NULL,
  `grade_out_of_percentage` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `module_code` varchar(22) NOT NULL,
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`course_id`),
  KEY `user_id` (`user_id`),
  KEY `module_code` (`module_code`),
  KEY `module_code_2` (`module_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `coursework`
--

INSERT INTO `coursework` (`name`, `percentage`, `due_date`, `grade_out_of100`, `grade_out_of_percentage`, `user_id`, `module_code`, `course_id`) VALUES
('Theory Test 2', 10, '2025-05-30', 0, 0, 1, 'College Math', 9),
('Theory Test 1', 10, '2025-05-08', 0, 0, 1, 'College Math', 10);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coursework`
--
ALTER TABLE `coursework`
  ADD CONSTRAINT `mod_fk` FOREIGN KEY (`module_code`) REFERENCES `modules` (`mod_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `modules` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
