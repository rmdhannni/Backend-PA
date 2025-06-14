-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 14, 2025 at 05:27 PM
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
  `ID_Lokasi_tujuan` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Jenis_distribusi` enum('masuk','keluar') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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

INSERT INTO `distribusi` (`ID_Distribusi`, `ID_Plat`, `ID_Lokasi_tujuan`, `UserID`, `Jenis_distribusi`, `Jumlah`, `Status`, `Tanggal_permintaan`, `Tanggal_distribusi`, `Tanggal_validasi`, `qr_code`) VALUES
(54, 18, NULL, 8, 'masuk', 3, 'ditolak', '2025-06-13 02:12:17', '2025-06-13 02:23:52', '2025-06-13 02:30:03', '280dfdde-47c1-11f0-a9eb-88f4dad5f86c'),
(55, 19, 18, 11, 'keluar', 2, 'disetujui', '2025-06-13 02:21:37', '2025-06-13 02:23:36', '2025-06-13 02:26:20', '75fb5351-47c2-11f0-a9eb-88f4dad5f86c'),
(56, 20, NULL, 8, 'masuk', 4, 'pending', '2025-06-13 02:30:31', NULL, NULL, 'b3dd6f86-47c3-11f0-a9eb-88f4dad5f86c'),
(57, 37, 21, 8, 'keluar', 3, 'terdistribusi', '2025-06-14 12:54:45', '2025-06-14 12:55:31', NULL, '12d10e4f-48e4-11f0-8cc6-88f4dad5f86c'),
(58, 37, NULL, 8, 'masuk', 5, 'ditolak', '2025-06-14 12:56:29', '2025-06-14 12:56:41', '2025-06-14 13:02:38', '51095b4f-48e4-11f0-8cc6-88f4dad5f86c'),
(59, 37, NULL, 8, 'masuk', 5, 'disetujui', '2025-06-14 13:00:31', '2025-06-14 13:01:23', '2025-06-14 13:02:19', 'e14296e6-48e4-11f0-8cc6-88f4dad5f86c'),
(60, 18, NULL, 8, 'masuk', 21, 'terdistribusi', '2025-06-14 16:51:55', '2025-06-14 16:52:37', NULL, '34dc5ce2-4905-11f0-a350-88f4dad5f86c'),
(61, 37, NULL, 8, 'masuk', 10, 'pending', '2025-06-14 16:59:14', NULL, NULL, '3a60fc07-4906-11f0-a350-88f4dad5f86c'),
(62, 37, NULL, 8, 'masuk', 12, 'disetujui', '2025-06-14 17:07:13', '2025-06-14 17:07:44', '2025-06-14 17:08:06', '578bb88b-4907-11f0-a350-88f4dad5f86c'),
(63, 18, NULL, 8, 'masuk', 3, 'terdistribusi', '2025-06-14 17:11:05', '2025-06-14 17:12:00', NULL, 'e25ec152-4907-11f0-a350-88f4dad5f86c'),
(64, 37, NULL, 8, 'masuk', 20, 'disetujui', '2025-06-14 17:25:27', '2025-06-14 17:25:36', '2025-06-14 17:26:01', 'e3f9e171-4909-11f0-a350-88f4dad5f86c'),
(65, 37, 21, 8, 'keluar', 12, 'disetujui', '2025-06-14 17:27:49', '2025-06-14 17:28:00', '2025-06-14 17:28:32', '3862ae32-490a-11f0-a350-88f4dad5f86c'),
(66, 18, NULL, 8, 'masuk', 3, 'disetujui', '2025-06-14 19:29:45', '2025-06-14 19:30:52', '2025-06-14 19:32:14', '41074a06-491b-11f0-a350-88f4dad5f86c');

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
(17, '2MF0A2', -7.20504700, 112.73940800),
(18, 'KPR01A', -7.20413100, 112.74038400),
(19, 'HARKAN01', -7.20066700, 112.74045400),
(20, 'KPMM1', -7.20111000, 112.73805000),
(21, '01', -7.20496100, 112.74250300);

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
(18, 'PLATE, METAL; THK 40MM X W 2540MM X LG 9144MM, GRADE EH 36, ST 50, PLAIN, C/W LR CLASS CERTIFICATE', 'P04292-13-W000304', NULL, 21, 'Ready', 7),
(19, 'PLATE METAL THK 12MM X W 1524MM X LG 9144MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '30411-23-1', NULL, 17, 'Ready', 4),
(20, 'PLATE METAL THK 25MM X W 1829MM X LG 12192MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '28619-37-1', NULL, 20, 'Ready', 4),
(21, 'PLATE METAL THK 10.5MM X W 2032MM X LG 6096MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', 'P02088-92-W000304', NULL, 21, 'Ready', 3),
(22, 'PLATE METAL THK 6.5MM X W 1524MM X LG 9144MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', '30284-8-2', NULL, 17, 'Ready', 3),
(23, 'PLATE METAL THK 7MM X W 2032MM X LG 6096MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', '21048-25-1', NULL, 17, 'Ready', 3),
(24, 'PLATE METAL THK 8MM X W 1829MM X LG 12192MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '30160-58-7', NULL, 18, 'Ready', 5),
(25, 'PLATE METAL THK 12MM X W 1524MM X LG 12192MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', '30160-34-3', NULL, 20, 'Ready', 7),
(26, 'PLATE METAL THK 12MM X W 1829MM X LG 6096MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', 'P01284-2-R23SPPXA', NULL, 19, 'Ready', 5),
(27, 'PLATE METAL THK 10MM X W 1524MM X LG 9144MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '30160-2-6', NULL, 21, 'Ready', 8),
(28, 'PLATE METAL THK 20MM X W 1829MM X LG 6096MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', 'P02088-100-W000304', NULL, 17, 'Ready', 7),
(29, 'PLATE METAL THK 14MM X W 2032MM X LG 9144MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', '30284-31-1', NULL, 17, 'Ready', 5),
(30, 'PLATE, METAL; THK 16.5MM X W 1829MM X LG 9144MM, GRADE A, ST 41, PLAIN, C/W LR CLASS CERTIFICATE', '30160-85-1', NULL, 18, 'Ready', 5),
(31, 'PLATE METAL THK 16MM X W 1524MM X LG 6096MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '30100-32-2', NULL, 17, 'Ready', 1),
(32, 'PLATE METAL THK 16MM X W 1524MM X LG 9144MM GRADE AH 36 ST 50 PLAIN CW LR CLASS CERTIFICATE', 'P03899-96-W000306', NULL, 21, 'Ready', 3),
(33, 'PLATE METAL THK 17MM X W 1524MM X LG 9144MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', 'P00641-76-W000308', NULL, 18, 'Ready', 3),
(34, 'PLATE, METAL; THK 25MM X W 2400MM X LG 12192MM, GRADE A, ST 41, PLAIN, C/W LR CLASS CERTIFICATE', 'P00641-34-W000308', NULL, 18, 'Ready', 5),
(35, 'PLATE METAL THK 8MM X W 1524MM X LG 9144MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '28619-6-1', NULL, 17, 'Ready', 7),
(36, 'PLATE METAL THK 9MM X W 1524MM X LG 6096MM GRADE A ST 41 PLAIN CW LR CLASS CERTIFICATE', '30160-271-W000308', NULL, 18, 'Ready', 3),
(37, 'Plat Baja ASTM A36', 'L202506-001', NULL, 21, 'Ready', 225);

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

--
-- Dumping data for table `transaksi_stok`
--

INSERT INTO `transaksi_stok` (`ID_Transaksi`, `ID_Plat`, `ID_User`, `Jumlah_masuk`, `Jumlah_keluar`, `Sisa_stok`, `Tanggal_update`, `Status`) VALUES
(17, 19, 11, 0, 2, 4, '2025-06-13 02:26:20', 'keluar'),
(18, 37, 8, 5, 0, 205, '2025-06-14 13:02:19', 'masuk'),
(19, 37, 8, 12, 0, 217, '2025-06-14 17:08:06', 'masuk'),
(20, 37, 8, 20, 0, 237, '2025-06-14 17:26:01', 'masuk'),
(21, 37, 8, 0, 12, 225, '2025-06-14 17:28:32', 'keluar'),
(22, 18, 8, 3, 0, 7, '2025-06-14 19:32:14', 'masuk');

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
(12, 'dani', 'user3@gmail.com', '$2b$10$qiMmoWW1M5gLQwcVWiEPa.g0Isb3PnCNBYNs.ycIZP0wmneiYwWCS', '2'),
(13, 'hendro', 'user12@gmail.com', '$2b$10$NYFULQqxI1dGwYIvMgI0C.0AF8b9Yne/KhGTFne/fjjfWmTRLB4Sq', '2');

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
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `idx_role` (`Role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `distribusi`
--
ALTER TABLE `distribusi`
  MODIFY `ID_Distribusi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `lokasi`
--
ALTER TABLE `lokasi`
  MODIFY `ID_Lokasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `plat`
--
ALTER TABLE `plat`
  MODIFY `ID_Plat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `transaksi_stok`
--
ALTER TABLE `transaksi_stok`
  MODIFY `ID_Transaksi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID_User` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
