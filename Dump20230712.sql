-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: shopee
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cartId` int NOT NULL AUTO_INCREMENT,
  `quantityCart` int NOT NULL,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`cartId`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Thời Trang Nam'),(2,'Điện Thoại & Phụ Kiện'),(3,'Thời Trang Nữ'),(4,'Thiết Bị Điện Tử'),(5,'Máy Tính & Laptop'),(6,'Giày Dép Nam'),(7,'Giày Dép Nữ');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `images_ibfk_1` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (37,'http://localhost:5000/images/images-1688480466103-68240751.jpg',55),(38,'http://localhost:5000/images/images-1688480466105-306521427.jpg',55),(39,'http://localhost:5000/images/images-1688480466106-377405554.jpg',55),(40,'http://localhost:5000/images/images-1688480466106-490869203.jpg',55),(41,'http://localhost:5000/images/images-1688480466107-768532616.jpg',55),(42,'http://localhost:5000/images/images-1688480867530-387498242.jpg',56),(43,'http://localhost:5000/images/images-1688480867530-768237995.jpg',56),(44,'http://localhost:5000/images/images-1688480867531-422696566.jpg',56),(45,'http://localhost:5000/images/images-1688480867531-970109739.jpg',56),(46,'http://localhost:5000/images/images-1688480867532-309278709.jpg',56),(47,'http://localhost:5000/images/images-1688530062367-214327739.jpg',57),(48,'http://localhost:5000/images/images-1688530062367-783052799.jpg',57),(49,'http://localhost:5000/images/images-1688530062368-984741689.jpg',57),(50,'http://localhost:5000/images/images-1688530062370-387246411.jpg',57);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `orderDetailId` int NOT NULL AUTO_INCREMENT,
  `quantityOrder` int NOT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  KEY `productId` (`productId`),
  KEY `orderdetail_ibfk_2` (`orderId`),
  CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (7,1,11,55),(8,2,11,56),(9,1,11,57),(10,2,12,55),(11,3,12,56);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `createdDate` varchar(255) DEFAULT NULL,
  `phoneOrder` varchar(255) NOT NULL,
  `nameOrder` varchar(255) NOT NULL,
  `statusOrder` varchar(255) DEFAULT NULL,
  `totalPrice` int NOT NULL,
  `userId` int NOT NULL,
  `storeId` int NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `orders_ibfk_2_idx` (`storeId`),
  KEY `orders_ibfk_1` (`userId`),
  CONSTRAINT `ada` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (11,'Thanh Xuân','2023-07-07 11:59:11','0988999888','Quang Minh','success',93750,54,6),(12,'Thanh Xuân','2023-07-07 13:58:28','0975771793','Đức Nguyễn','pending',142500,54,6);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) NOT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  `productId` int NOT NULL,
  `userId` int NOT NULL,
  `rate` int NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `userId` (`userId`),
  KEY `product_reviews_ibfk_1_idx` (`productId`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
INSERT INTO `product_reviews` VALUES (6,'Sản phẩm đẹp quá!!!','2023-07-10 15:33:28',55,54,5),(7,'Sản phẩm tốt nhưng 1 sao!','2023-07-10 16:38:51',55,54,1);
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `price` float NOT NULL,
  `productName` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `statusproduct` int DEFAULT NULL,
  `categoryId` int NOT NULL,
  `storeId` int NOT NULL,
  `quantitySold` int DEFAULT NULL,
  PRIMARY KEY (`productId`),
  KEY `storeId` (`storeId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (55,'Ốp lưng iPhone Adidas Chống sốc cạnh viền vuông Silicon trong suốt mềm dẻo cho 6/6s/7/8/X/XS/11/12/13 Pro Plus Max\n\n☞ Ốp lưng chống sốc cạnh vuông sử dụng cho: IPhone 13 / 13 mini / 13 Pro / 13 Pro Max / 12 / 12 Pro / 12 Pro Max / 11 / 11 Pro / 11 Pro Max / XS MAX / XR / Xs / X / 7 Plus / 8 Plus / 7 / 8 / SE 2020 / 6 Plus / 6s Plus / 6 / 6s☜\n\n☑️ Phong cách: in hình Adidas\n\n♡ Màu sắc: Trong suốt\n\n♡ Chất liệu: Silicon mềm chất lượng cao\n\n♡ Chức năng:\n✔ Chống sốc, Chống va đập, Chống trượt, Chống xước\n✔ Chống bụi bẩn, Dễ dàng vệ sinh bằng khăn lau\n✔ Bảo vệ camera. Bảo vệ mặt sau điện thoại, chất liệu mềm dẻo dễ dàng tháo lắp\n\n♡ Đặc điểm chính:\n✔ Mềm mại khi cầm nắm, cảm giác rất thích\n✔ Vị trí lỗ camera chính xác, bảo vệ hiệu quả kính camera điện thoại\n✔ Có độ đàn hồi và khả năng hấp thụ sốc\n✔ Chống xước\n✔ Trọng lượng nhẹ\n\n♡ Tất cả các model sản phẩm đều đang có sẵn hàng!!! Nếu muốn, bạn có thể liên hệ với dịch vụ chăm sóc khách hàng trực tuyến để cung cấp cho bạn.\n\n♡ Dịch vụ của chúng tôi:\n✔ Vận chuyển nhanh, Trả lời nồng nhiệt kịp thời, Thái độ tích cực\n✔ Giải quyết nhanh chóng vấn đề cho mọi khách hàng\n\n♡ Do sự khác biệt của màn hình và ánh sáng, màu sắc có thể hơi khác một chút, mong các bạn thông cảm.\n\n♡ Nếu có vấn đề về chất lượng hoặc vấn đề khác với sản phẩm bạn nhận được, trước hết xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ giải quyết sớm nhất có thể.\n\n♡ Nếu bạn thích sản phẩm này, xin vui lòng cho chúng tôi đánh giá năm sao, cảm ơn bạn rất nhiều!!!',21750,'Ốp lưng iPhone Adidas Chống sốc cạnh viền vuông Silicon trong suốt mềm dẻo cho 6/6s/7/8/X/XS/11/12/13/14 Pro Plus Max',100,1,2,6,150),(56,'??? Shop CAM KẾT ???\n\n✔Về sản phẩm: Shop cam kết cả về CHẤT LIỆU cũng như HÌNH DÁNG (đúng với những gì được nêu bật trong phần mô tả sản phẩm).\n\n✔Về dịch vụ: Shop sẽ cố gắng trả lời hết những thắc mắc xoay quanh sản phẩm nhé.\n\n✔Thời gian chuẩn bị hàng: Hàng có sẵn.\n\n???Quyền Lợi của Khách Hàng ???\n\n✔ Nếu sản phẩm khách nhận được không đúng với sản phẩm khách đặt, hoặc khác với mô tả sản phẩm, khách hàng đừng vội đánh giá 1 sao mà hãy Inbox ngay cho shop để được shop hỗ trợ khách hàng đổi trả sản phẩm. Shop không hi vọng trường hợp này xảy ra, và sẽ cố gắng hết sức để bạn không có một trải nghiệm mua hàng không tốt tại shop, nhưng nếu có, shop cũng sẽ giải quyết mọi chuyện sao cho thỏa đáng.\n\nThông số chọn size:\n\nSize M      :       Chiều cao 1m45-1m55            |   Cân nặng : 40-55kg \n\nSize L       :       Chiều cao 1m55-1m70            |   Cân nặng : 55-65kg \n\nSize XL    :       Chiều cao 1m70-1m78            |   Cân nặng : 65 - 75kg \n\nSize XXL :       Chiều cao 1m78-1m85            |   Cân nặng : 75 - 85kg \n\n(Bảng trên chỉ mang tính chất tham khảo, chọn mặc form vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)\n\nQUÝ KHÁCH CÒN THẮC MẮC VỀ SIZE SỐ THÌ ib trực tiếp cho shop để shop tư vấn cụ thể hơn nhé Với những khách có dáng người đặc biệt quá gầy hoặc đang tăng cân nên nhắn tin để shop tư vấn size trước khi đặt, shop rất sẵn lòng phục vụ 24/7.\n\n✔️ Gâu Unisex 1999 cam kết sản phẩm giống mô tả 100%. Hình ảnh/video sản phẩm được Shop chụp bằng cam thường chân thật nhất \n\n✔️ Sản phẩm được kiểm tra kĩ lưỡng, cẩn thận và tư vấn nhiệt tình trước khi gói hàng giao cho quý khách \n\n✔️ Hàng luôn sẵn, giao hàng ngay khi nhận được đơn \n\n✔️ Hoàn tiền 100% nếu sản phẩm khác hình, mô tả \n\n✔️ Hỗ trợ nhận đổi size nếu khách không vừa\n\n✔️ Giao hàng toàn quốc, nhận hàng thanh toán tại nhà \n\n✔️ Đổi trả miễn phí nếu shop gửi sai hàng hoặc hàng lỗi do nhà sản xuất\n\n➡ LƯU Ý KHI SỬ DỤNG CÁC SẢN PHẨM CỦA SHOP\n\n- Đối với sản phẩm đa dạng về chất liệu, kiểu dáng, màu sắc, cách bảo quản sản phẩm là phân loại và giặt các sản phẩm cùng màu để giữ được độ bền và màu sắc của vải, tránh bị phai màu từ các loại quần áo khác.\n\n- Đối với những sản phẩm có thể giặt máy, chỉ nên để ở chế độ giặt nhẹ, hoặc mức trung bình \n\n- Nên lộn áo sang mặt trái trước khi phơi sản phẩm ở nơi thoáng mát, tránh ánh nắng trực tiếp dễ bị phai bạc màu, nên làm khô quần áo bằng cách phơi ở những điểm đón gió sẽ giữ được màu vải.\n\n❗️❗️ QUY ĐỊNH ĐỔI/TRẢ HÀNG: \n\n? LƯU Ý: Màu sắc trên hình có thể chênh lệch do điều kiện ánh sáng, mỗi sản phẩm shop sẽ chụp cận chất, để đúng với màu thực tế nhất \n\n? Shop nhận đổi hàng/trả hàng trong vòng 03 ngay sau khi nhận hàng có lỗi của nhà sản xuất (có video bóc hàng), gửi sai màu/sai mẫu \n\n❗️Nếu sản phẩm bị lỗi Quý khách vui lòng inbox liên hệ Shop để được hỗ trợ đổi hàng hoặc Trả hàng/Hoàn tiền cho Khách ạ. Rất mong Quý Khách đừng vì lỗi nhỏ mà cho chúng mình 1 - 2 ⭐️ tội cho shop lắm ạ ?\n\nTuyển Sỉ lẻ : 0975.771.793',33000,'Ốp điện thoại silicon mạ điện dáng vuông cổ điển sang trọng cho For iPhone 14 13 12 11 Pro Max iPhone X XS XR 78Plus SE2020',100,1,2,6,200),(57,'Mèo thần tài đón xuân sắp cập bến a ???\nMèo Thần Tài phú quý tượng trưng cho sự may mắn trong cuộc sống, các mối quan hệ thuận hòa đặc biệt trong tình yêu.\n? theo truyền thuyết những người mang theo Mèo Thần Tài bên mình luôn gặp vận may,điều tốt đẹp bao quanh cả năm cả đời ??\nchị em nhanh tay ib e để rinh Mèo Thần Tài nha',6000,'MÈO THẦN TÀI DÁN ĐIỆN THOẠI VÍ TIỀN CHIÊU TÀI LỘC MAY MẮN / Trâu thần tài / Linh phù',100,1,2,6,200);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `storeId` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `addressStore` varchar(255) NOT NULL,
  `storeName` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  `statusStore` int DEFAULT NULL,
  PRIMARY KEY (`storeId`),
  KEY `userId` (`userId`),
  CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (6,'0988666888','Thanh Xuân','Quang_Minh',13,1);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `userName` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `passwordUser` varchar(255) NOT NULL,
  `passwordConfirm` varchar(255) NOT NULL,
  `avatarURL` longtext,
  `address` varchar(255) DEFAULT NULL,
  `createDate` date DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `statusUser` int DEFAULT NULL,
  `birthDay` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'68@gmail.com','Quang Minh','Nguyễn Quang Minh','$2b$10$K6yEyumfXu.nWEUyc3E/4O6d1tBo5T8LcaHUqTpROdSD1wG9zYShO','$2b$10$K6yEyumfXu.nWEUyc3E/4O6d1tBo5T8LcaHUqTpROdSD1wG9zYShO','http://localhost:5000/avatar/avatar-1688433688292-354299826.jpg','Thanh Xuân',NULL,'0988666888','Nam',1,'02/09/2019'),(54,'1@gmail.com','Hà Trang','Hà Trang','$2b$10$ZgsFgYyrYC.jbYQmOVnu7uwGA/Z3Ud17DCCmMf7GdMRcAi8.63c3W','$2b$10$ZgsFgYyrYC.jbYQmOVnu7uwGA/Z3Ud17DCCmMf7GdMRcAi8.63c3W','http://localhost:5000/avatar/avatar-1688398826739-863198447.jpg','Thanh Xuân',NULL,'0988999888','Nữ',0,'09/09/1993');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-12 16:45:47
