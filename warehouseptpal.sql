-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 29, 2025 at 02:15 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouseptpal`
--

-- --------------------------------------------------------

--
-- Table structure for table `distribusi`
--

CREATE TABLE `distribusi` (
  `ID_Distribusi` int NOT NULL,
  `ID_Plat` int NOT NULL,
  `ID_Lokasi_tujuan` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `Jumlah` int NOT NULL,
  `Status` enum('pending','diproses','terdistribusi','disetujui','ditolak') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `Tanggal_permintaan` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Tanggal_distribusi` datetime DEFAULT NULL,
  `Tanggal_validasi` datetime DEFAULT NULL,
  `qr_code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `distribusi`
--

INSERT INTO `distribusi` (`ID_Distribusi`, `ID_Plat`, `ID_Lokasi_tujuan`, `UserID`, `Jumlah`, `Status`, `Tanggal_permintaan`, `Tanggal_distribusi`, `Tanggal_validasi`, `qr_code`) VALUES
(6, 6, 8, 9, 5, 'disetujui', '2025-05-09 19:10:26', '2025-05-09 19:17:02', NULL, NULL),
(7, 6, 8, 8, 5, 'ditolak', '2025-05-09 19:50:46', '2025-05-09 19:51:07', NULL, NULL),
(8, 6, 8, 8, 2, 'ditolak', '2025-05-12 20:16:34', '2025-05-12 20:17:01', NULL, NULL),
(9, 6, 9, 11, 2, 'disetujui', '2025-05-14 11:37:20', '2025-05-14 11:38:20', NULL, NULL),
(10, 6, 9, 8, 5, 'diproses', '2025-05-23 22:45:05', NULL, NULL, NULL),
(11, 6, 9, 8, 2, 'disetujui', '2025-05-23 22:48:20', '2025-05-23 22:48:38', NULL, NULL),
(12, 6, 11, 8, 5, 'disetujui', '2025-05-24 00:41:35', '2025-05-23 00:00:00', NULL, NULL),
(13, 6, 11, 8, 2, 'disetujui', '2025-05-24 01:27:24', '2025-05-23 00:00:00', NULL, NULL),
(14, 6, 9, 8, 5, 'disetujui', '2025-05-24 01:52:43', '2025-05-23 00:00:00', NULL, NULL),
(15, 9, 11, 8, 2, 'disetujui', '2025-05-24 01:54:31', '2025-05-23 00:00:00', NULL, NULL),
(16, 6, 9, 8, 5, 'disetujui', '2025-05-24 02:13:16', '2025-05-23 00:00:00', NULL, NULL),
(17, 9, 11, 8, 20, 'disetujui', '2025-05-24 22:35:40', '2025-05-24 00:00:00', NULL, NULL),
(18, 9, 11, 8, 5, 'disetujui', '2025-05-26 13:26:19', '2025-05-26 00:00:00', NULL, NULL),
(19, 12, 12, 8, 5, 'disetujui', '2025-05-26 15:59:15', '2025-05-27 00:00:00', NULL, NULL),
(20, 9, 11, 8, 5, 'ditolak', '2025-05-26 16:17:17', '2025-05-27 00:00:00', NULL, NULL),
(21, 13, 11, 8, 50, 'disetujui', '2025-05-27 23:07:21', '2025-05-27 00:00:00', NULL, NULL),
(22, 14, 13, 8, 50, 'disetujui', '2025-05-28 02:55:14', '2025-05-28 00:00:00', NULL, NULL),
(23, 14, 13, 8, 123, 'disetujui', '2025-05-28 03:04:21', '2025-05-28 00:00:00', NULL, NULL),
(24, 13, 13, 8, 12, 'disetujui', '2025-05-28 03:15:11', '2025-05-28 00:00:00', NULL, NULL),
(25, 13, 13, 8, 20, 'disetujui', '2025-05-28 14:34:13', '2025-05-28 00:00:00', NULL, NULL),
(26, 13, 12, 8, 10, 'disetujui', '2025-05-28 14:40:46', '2025-05-28 00:00:00', NULL, NULL),
(27, 8, 12, 8, 10, 'ditolak', '2025-05-28 14:42:24', '2025-05-28 00:00:00', NULL, NULL),
(28, 9, 12, 8, 2, 'pending', '2025-05-28 15:43:20', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lokasi`
--

CREATE TABLE `lokasi` (
  `ID_Lokasi` int NOT NULL,
  `Nama_Lokasi` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lokasi`
--

INSERT INTO `lokasi` (`ID_Lokasi`, `Nama_Lokasi`, `latitude`, `longitude`) VALUES
(8, 'kaprang', -7.13921917, 112.60891145),
(9, 'DKN', -7.13921917, 112.60891145),
(11, 'gudang pusat', -7.20434900, 112.74260500),
(12, 'Harkan', -7.20401400, 112.74160200),
(13, 'Harkan2', -7.20401400, 112.74160200),
(16, 'kaprang', -7.20196000, 112.74019100);

-- --------------------------------------------------------

--
-- Table structure for table `plat`
--

CREATE TABLE `plat` (
  `ID_Plat` int NOT NULL,
  `Nama_plat` varchar(100) DEFAULT NULL,
  `Lot_Batch_Number` varchar(100) DEFAULT NULL,
  `Kuantitas` int DEFAULT NULL,
  `ID_Lokasi` int DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `stok` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plat`
--

INSERT INTO `plat` (`ID_Plat`, `Nama_plat`, `Lot_Batch_Number`, `Kuantitas`, `ID_Lokasi`, `Status`, `stok`) VALUES
(6, 'plat baja 2x2', '2313212', 50, 8, 'Ready', 50),
(8, 'plat baja 4x4', '1234587', 50, 8, 'Ready', 50),
(9, 'Plat Baja X12', 'LOT-123', 100, 11, 'Ready', 100),
(12, 'Plat Baja X14', 'LOT-12345', 100, 12, 'Ready', 100),
(13, 'Plat Baja X14', 'LOT-123456', 100, 11, 'Ready', 100),
(14, 'Plat Baja X15', 'LOT-1234567', 100, 13, 'Tidak Tersedia', 100);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_stok`
--

CREATE TABLE `transaksi_stok` (
  `ID_Transaksi` int NOT NULL,
  `ID_Plat` int DEFAULT NULL,
  `ID_User` int DEFAULT NULL,
  `Jumlah_masuk` int DEFAULT '0',
  `Jumlah_keluar` int DEFAULT '0',
  `Sisa_stok` int DEFAULT NULL,
  `Tanggal_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` enum('masuk','keluar') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID_User` int NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Role` enum('1','2') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID_User`, `Username`, `Email`, `Password`, `Role`) VALUES
(8, 'muchtar', 'user1@gmail.com', '$2b$10$YVeCv0nYdFSSdyrIUZEIm.IQhHi3eKkD7emIqRGBg.gpYy9iCrNju', '2'),
(9, 'muslik', 'admin@gmail.com', '$2b$10$VJQynW39Xel1.xtRorCSIuGRYmL7dWtCNK/6evKA6ezzoE16sehHy', '1'),
(11, 'dani', 'user2@gmail.com', '$2b$10$AYYH4k8ADPDUJQnce7pusu33yonz87rxOW83d3.5s6CwnKVBN4M.W', '2'),
(12, 'dani', 'user3@gmail.com', '$2b$10$qiMmoWW1M5gLQwcVWiEPa.g0Isb3PnCNBYNs.ycIZP0wmneiYwWCS', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `distribusi`
--
ALTER TABLE `distribusi`
  ADD PRIMARY KEY (`ID_Distribusi`),
  ADD KEY `ID_Plat` (`ID_Plat`),
  ADD KEY `ID_Lokasi_tujuan` (`ID_Lokasi_tujuan`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `lokasi`
--
ALTER TABLE `lokasi`
  ADD PRIMARY KEY (`ID_Lokasi`);

--
-- Indexes for table `plat`
--
ALTER TABLE `plat`
  ADD PRIMARY KEY (`ID_Plat`),
  ADD KEY `ID_Lokasi` (`ID_Lokasi`);

--
-- Indexes for table `transaksi_stok`
--
ALTER TABLE `transaksi_stok`
  ADD PRIMARY KEY (`ID_Transaksi`),
  ADD KEY `ID_Plat` (`ID_Plat`),
  ADD KEY `ID_User` (`ID_User`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID_User`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `distribusi`
--
ALTER TABLE `distribusi`
  MODIFY `ID_Distribusi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `lokasi`
--
ALTER TABLE `lokasi`
  MODIFY `ID_Lokasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `plat`
--
ALTER TABLE `plat`
  MODIFY `ID_Plat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transaksi_stok`
--
ALTER TABLE `transaksi_stok`
  MODIFY `ID_Transaksi` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID_User` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `distribusi`
--
ALTER TABLE `distribusi`
  ADD CONSTRAINT `distribusi_ibfk_1` FOREIGN KEY (`ID_Plat`) REFERENCES `plat` (`ID_Plat`),
  ADD CONSTRAINT `distribusi_ibfk_2` FOREIGN KEY (`ID_Lokasi_tujuan`) REFERENCES `lokasi` (`ID_Lokasi`),
  ADD CONSTRAINT `distribusi_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID_User`);

--
-- Constraints for table `plat`
--
ALTER TABLE `plat`
  ADD CONSTRAINT `plat_ibfk_1` FOREIGN KEY (`ID_Lokasi`) REFERENCES `lokasi` (`ID_Lokasi`);

--
-- Constraints for table `transaksi_stok`
--
ALTER TABLE `transaksi_stok`
  ADD CONSTRAINT `transaksi_stok_ibfk_1` FOREIGN KEY (`ID_Plat`) REFERENCES `plat` (`ID_Plat`),
  ADD CONSTRAINT `transaksi_stok_ibfk_2` FOREIGN KEY (`ID_User`) REFERENCES `user` (`ID_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
