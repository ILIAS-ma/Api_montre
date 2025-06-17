-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 17 juin 2025 à 10:09
-- Version du serveur : 8.0.30
-- Version de PHP : 8.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `watch_store`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin') DEFAULT 'admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@watch-store.com', '$2a$10$tUKNTw31zZgcJsDawbez9OQ.XUNvZRII5iLrNmEZf3pkIwn/vdtNG', 'Admin', 'admin', '2025-06-15 15:25:57', '2025-06-15 15:25:57');

-- --------------------------------------------------------

--
-- Structure de la table `watches`
--

CREATE TABLE `watches` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` int NOT NULL COMMENT 'Taille en millimètres',
  `movement` enum('Automatique','Quartz','Manuel') NOT NULL,
  `material` varchar(255) NOT NULL,
  `waterResistance` int NOT NULL COMMENT 'Résistance à l''eau en mètres',
  `images` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `watches`
--

INSERT INTO `watches` (`id`, `name`, `brand`, `description`, `price`, `size`, `movement`, `material`, `waterResistance`, `images`, `createdAt`, `updatedAt`, `quantity`) VALUES
(1, 'Rolex Submariner', 'Rolex', 'Montre de plongée légendaire', 8999.99, 41, 'Automatique', 'Acier inoxydable', 300, '[\"https://example.com/rolex-submariner.jpg\"]', '2025-06-15 15:34:48', '2025-06-15 15:34:48', 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`);

--
-- Index pour la table `watches`
--
ALTER TABLE `watches`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `watches`
--
ALTER TABLE `watches`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
