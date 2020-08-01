-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 01-08-2020 a las 15:27:07
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `testconstant`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EmployeeMeets`
--

CREATE TABLE `EmployeeMeets` (
  `id` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `meetId` int(11) NOT NULL,
  `meetDate` datetime NOT NULL,
  `meetStart` varchar(255) NOT NULL,
  `meetEnd` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Employees`
--

CREATE TABLE `Employees` (
  `id` int(11) NOT NULL,
  `employeeName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Employees`
--

INSERT INTO `Employees` (`id`, `employeeName`, `createdAt`, `updatedAt`) VALUES
(1, 'Patricio Sartore', '2020-08-01 17:23:10', '2020-08-01 17:23:10'),
(2, 'Martí Cristòbal\r\n', '2020-08-01 17:23:10', '2020-08-01 17:23:10'),
(3, 'Mireya Dafis Folgueiro', '2020-08-01 17:24:37', '2020-08-01 17:24:37'),
(4, 'Leonel Messi', '2020-08-01 17:24:37', '2020-08-01 17:24:37'),
(5, 'Pedro Sanchez', '2020-08-01 17:25:11', '2020-08-01 17:25:11'),
(6, 'Juan Martinez', '2020-08-01 17:25:11', '2020-08-01 17:25:11'),
(7, 'Mario Perez', '2020-08-01 17:25:39', '2020-08-01 17:25:39'),
(8, 'Oscar Fernandez', '2020-08-01 17:25:39', '2020-08-01 17:25:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Meets`
--

CREATE TABLE `Meets` (
  `id` int(11) NOT NULL,
  `meetName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `EmployeeMeets`
--
ALTER TABLE `EmployeeMeets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EmployeeMeets_meetId_employeeId_unique` (`employeeId`,`meetId`),
  ADD KEY `meetId` (`meetId`);

--
-- Indices de la tabla `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Meets`
--
ALTER TABLE `Meets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `EmployeeMeets`
--
ALTER TABLE `EmployeeMeets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Employees`
--
ALTER TABLE `Employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Meets`
--
ALTER TABLE `Meets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `EmployeeMeets`
--
ALTER TABLE `EmployeeMeets`
  ADD CONSTRAINT `EmployeeMeets_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `EmployeeMeets_ibfk_2` FOREIGN KEY (`meetId`) REFERENCES `Meets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
