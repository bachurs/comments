-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2018 m. Lie 03 d. 15:03
-- Server version: 10.0.34-MariaDB
-- PHP Version: 7.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `totalt_darbai`
--

-- --------------------------------------------------------

--
-- Sukurta duomenų struktūra lentelei `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 NOT NULL,
  `message` varchar(2048) CHARACTER SET utf8 NOT NULL,
  `creation_date` date NOT NULL,
  `reply_to` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Sukurta duomenų kopija lentelei `comments`
--

INSERT INTO `comments` (`id`, `email`, `name`, `message`, `creation_date`, `reply_to`) VALUES
(160, 'gytisberno@gmail.com', 'Gytis Bernotavičius', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', '2018-07-03', NULL),
(161, 'email@gmail.com', 'Jonas Jonaitis', 'Labai įdomus ir informatyvus komentaras', '2018-07-03', 160),
(162, 'tomas@mail.co.uk', 'Tomas', 'Taip, įdomus ir man.', '2018-07-03', 160),
(163, 'gytisberno@gmail.com', 'Gytis Bernotavičius', 'Dar vienas komentaras', '2018-07-03', NULL),
(164, 'email@email.com', 'John', 'Another reply to a comment', '2018-07-03', 163);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
