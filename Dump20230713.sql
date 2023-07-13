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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (37,'http://localhost:5000/images/images-1688480466103-68240751.jpg',55),(38,'http://localhost:5000/images/images-1688480466105-306521427.jpg',55),(39,'http://localhost:5000/images/images-1688480466106-377405554.jpg',55),(40,'http://localhost:5000/images/images-1688480466106-490869203.jpg',55),(41,'http://localhost:5000/images/images-1688480466107-768532616.jpg',55),(42,'http://localhost:5000/images/images-1688480867530-387498242.jpg',56),(43,'http://localhost:5000/images/images-1688480867530-768237995.jpg',56),(44,'http://localhost:5000/images/images-1688480867531-422696566.jpg',56),(45,'http://localhost:5000/images/images-1688480867531-970109739.jpg',56),(46,'http://localhost:5000/images/images-1688480867532-309278709.jpg',56),(47,'http://localhost:5000/images/images-1688530062367-214327739.jpg',57),(48,'http://localhost:5000/images/images-1688530062367-783052799.jpg',57),(49,'http://localhost:5000/images/images-1688530062368-984741689.jpg',57),(50,'http://localhost:5000/images/images-1688530062370-387246411.jpg',57),(57,'http://localhost:5000/images/images-1689212797364-143096327.jpg',63),(58,'http://localhost:5000/images/images-1689212797364-254515860.jpg',63),(59,'http://localhost:5000/images/images-1689212797364-301198382.jpg',63),(60,'http://localhost:5000/images/images-1689212797365-346972743.jpg',63),(61,'http://localhost:5000/images/images-1689212797366-752318958.jpg',63),(62,'http://localhost:5000/images/images-1689212969716-779727742.jpg',64),(63,'http://localhost:5000/images/images-1689212969719-727569907.jpg',64),(64,'http://localhost:5000/images/images-1689212969720-17684516.jpg',64),(65,'http://localhost:5000/images/images-1689212969720-222114268.jpg',64),(66,'http://localhost:5000/images/images-1689212969720-835499038.jpg',64),(77,'http://localhost:5000/images/images-1689214153636-920605738.PNG',67),(78,'http://localhost:5000/images/images-1689214153638-396901580.PNG',67),(79,'http://localhost:5000/images/images-1689214153640-623261460.PNG',67),(80,'http://localhost:5000/images/images-1689214153642-402255847.PNG',67),(81,'http://localhost:5000/images/images-1689214153644-950556641.PNG',67),(82,'http://localhost:5000/images/images-1689214239885-419706702.jpg',68),(83,'http://localhost:5000/images/images-1689214239885-970184371.jpg',68),(84,'http://localhost:5000/images/images-1689214239886-786006135.jpg',68),(85,'http://localhost:5000/images/images-1689214239887-656844687.jpg',68),(86,'http://localhost:5000/images/images-1689214239887-75635963.jpg',68),(87,'http://localhost:5000/images/images-1689214327987-488213274.jpg',69),(88,'http://localhost:5000/images/images-1689214327987-460587514.jpg',69),(89,'http://localhost:5000/images/images-1689214327987-817984920.jpg',69),(90,'http://localhost:5000/images/images-1689214327987-894004971.jpg',69),(91,'http://localhost:5000/images/images-1689214327987-509662118.jpg',69),(92,'http://localhost:5000/images/images-1689214491159-27678058.jpg',70),(93,'http://localhost:5000/images/images-1689214491159-608227863.jpg',70),(94,'http://localhost:5000/images/images-1689214491160-342745637.jpg',70),(95,'http://localhost:5000/images/images-1689214491161-692907630.jpg',70),(96,'http://localhost:5000/images/images-1689214491161-269029216.jpg',70),(97,'http://localhost:5000/images/images-1689214618326-877394090.jpg',71),(98,'http://localhost:5000/images/images-1689214618326-576098349.jpg',71),(99,'http://localhost:5000/images/images-1689214618326-122571161.jpg',71),(100,'http://localhost:5000/images/images-1689214618326-475050921.jpg',71),(101,'http://localhost:5000/images/images-1689214618327-950507234.jpg',71),(102,'http://localhost:5000/images/images-1689216750269-872314925.jpg',72),(103,'http://localhost:5000/images/images-1689216750269-796701698.jpg',72),(104,'http://localhost:5000/images/images-1689216750270-969660988.jpg',72),(105,'http://localhost:5000/images/images-1689216750270-252418929.jpg',72),(106,'http://localhost:5000/images/images-1689216750271-574008246.jpg',72),(107,'http://localhost:5000/images/images-1689216794519-528013269.jpg',73),(108,'http://localhost:5000/images/images-1689216794521-467514561.jpg',73),(109,'http://localhost:5000/images/images-1689216794522-636586228.jpg',73),(110,'http://localhost:5000/images/images-1689216794524-38939936.jpg',73),(111,'http://localhost:5000/images/images-1689216794528-549670119.jpg',73),(112,'http://localhost:5000/images/images-1689216845366-716907167.jpg',74),(113,'http://localhost:5000/images/images-1689216845367-321585943.jpg',74),(114,'http://localhost:5000/images/images-1689216845368-605466663.jpg',74),(115,'http://localhost:5000/images/images-1689216845369-364662002.jpg',74),(116,'http://localhost:5000/images/images-1689216845370-986871270.jpg',74),(117,'http://localhost:5000/images/images-1689216910518-637653948.jpg',75),(118,'http://localhost:5000/images/images-1689216910518-302911052.jpg',75),(119,'http://localhost:5000/images/images-1689216910518-247361639.jpg',75),(120,'http://localhost:5000/images/images-1689216910518-292773631.jpg',75),(121,'http://localhost:5000/images/images-1689216910519-565052735.jpg',75);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (7,1,11,55),(8,2,11,56),(9,1,11,57),(10,2,12,55),(11,3,12,56),(25,4,33,69);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (11,'Thanh Xuân','2023-07-07 11:59:11','0988999888','Quang Minh','success',93750,54,6),(12,'Thanh Xuân','2023-07-07 13:58:28','0975771793','Đức Nguyễn','pending',142500,54,6),(33,'Thanh Xuân - Hà Nội','2023-07-13 11:04:36','0975771793','Nguyễn Văn Đức','pending',420000,56,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (55,'Ốp lưng iPhone Adidas Chống sốc cạnh viền vuông Silicon trong suốt mềm dẻo cho 6/6s/7/8/X/XS/11/12/13 Pro Plus Max\n\n☞ Ốp lưng chống sốc cạnh vuông sử dụng cho: IPhone 13 / 13 mini / 13 Pro / 13 Pro Max / 12 / 12 Pro / 12 Pro Max / 11 / 11 Pro / 11 Pro Max / XS MAX / XR / Xs / X / 7 Plus / 8 Plus / 7 / 8 / SE 2020 / 6 Plus / 6s Plus / 6 / 6s☜\n\n☑️ Phong cách: in hình Adidas\n\n♡ Màu sắc: Trong suốt\n\n♡ Chất liệu: Silicon mềm chất lượng cao\n\n♡ Chức năng:\n✔ Chống sốc, Chống va đập, Chống trượt, Chống xước\n✔ Chống bụi bẩn, Dễ dàng vệ sinh bằng khăn lau\n✔ Bảo vệ camera. Bảo vệ mặt sau điện thoại, chất liệu mềm dẻo dễ dàng tháo lắp\n\n♡ Đặc điểm chính:\n✔ Mềm mại khi cầm nắm, cảm giác rất thích\n✔ Vị trí lỗ camera chính xác, bảo vệ hiệu quả kính camera điện thoại\n✔ Có độ đàn hồi và khả năng hấp thụ sốc\n✔ Chống xước\n✔ Trọng lượng nhẹ\n\n♡ Tất cả các model sản phẩm đều đang có sẵn hàng!!! Nếu muốn, bạn có thể liên hệ với dịch vụ chăm sóc khách hàng trực tuyến để cung cấp cho bạn.\n\n♡ Dịch vụ của chúng tôi:\n✔ Vận chuyển nhanh, Trả lời nồng nhiệt kịp thời, Thái độ tích cực\n✔ Giải quyết nhanh chóng vấn đề cho mọi khách hàng\n\n♡ Do sự khác biệt của màn hình và ánh sáng, màu sắc có thể hơi khác một chút, mong các bạn thông cảm.\n\n♡ Nếu có vấn đề về chất lượng hoặc vấn đề khác với sản phẩm bạn nhận được, trước hết xin vui lòng liên hệ với chúng tôi. Chúng tôi sẽ giải quyết sớm nhất có thể.\n\n♡ Nếu bạn thích sản phẩm này, xin vui lòng cho chúng tôi đánh giá năm sao, cảm ơn bạn rất nhiều!!!',21750,'Ốp lưng iPhone Adidas Chống sốc cạnh viền vuông Silicon trong suốt mềm dẻo cho 6/6s/7/8/X/XS/11/12/13/14 Pro Plus Max',100,1,2,6,150),(56,'??? Shop CAM KẾT ???\n\n✔Về sản phẩm: Shop cam kết cả về CHẤT LIỆU cũng như HÌNH DÁNG (đúng với những gì được nêu bật trong phần mô tả sản phẩm).\n\n✔Về dịch vụ: Shop sẽ cố gắng trả lời hết những thắc mắc xoay quanh sản phẩm nhé.\n\n✔Thời gian chuẩn bị hàng: Hàng có sẵn.\n\n???Quyền Lợi của Khách Hàng ???\n\n✔ Nếu sản phẩm khách nhận được không đúng với sản phẩm khách đặt, hoặc khác với mô tả sản phẩm, khách hàng đừng vội đánh giá 1 sao mà hãy Inbox ngay cho shop để được shop hỗ trợ khách hàng đổi trả sản phẩm. Shop không hi vọng trường hợp này xảy ra, và sẽ cố gắng hết sức để bạn không có một trải nghiệm mua hàng không tốt tại shop, nhưng nếu có, shop cũng sẽ giải quyết mọi chuyện sao cho thỏa đáng.\n\nThông số chọn size:\n\nSize M      :       Chiều cao 1m45-1m55            |   Cân nặng : 40-55kg \n\nSize L       :       Chiều cao 1m55-1m70            |   Cân nặng : 55-65kg \n\nSize XL    :       Chiều cao 1m70-1m78            |   Cân nặng : 65 - 75kg \n\nSize XXL :       Chiều cao 1m78-1m85            |   Cân nặng : 75 - 85kg \n\n(Bảng trên chỉ mang tính chất tham khảo, chọn mặc form vừa vặn thoải mái, lên xuống size tuỳ theo sở thích ăn mặc của bạn)\n\nQUÝ KHÁCH CÒN THẮC MẮC VỀ SIZE SỐ THÌ ib trực tiếp cho shop để shop tư vấn cụ thể hơn nhé Với những khách có dáng người đặc biệt quá gầy hoặc đang tăng cân nên nhắn tin để shop tư vấn size trước khi đặt, shop rất sẵn lòng phục vụ 24/7.\n\n✔️ Gâu Unisex 1999 cam kết sản phẩm giống mô tả 100%. Hình ảnh/video sản phẩm được Shop chụp bằng cam thường chân thật nhất \n\n✔️ Sản phẩm được kiểm tra kĩ lưỡng, cẩn thận và tư vấn nhiệt tình trước khi gói hàng giao cho quý khách \n\n✔️ Hàng luôn sẵn, giao hàng ngay khi nhận được đơn \n\n✔️ Hoàn tiền 100% nếu sản phẩm khác hình, mô tả \n\n✔️ Hỗ trợ nhận đổi size nếu khách không vừa\n\n✔️ Giao hàng toàn quốc, nhận hàng thanh toán tại nhà \n\n✔️ Đổi trả miễn phí nếu shop gửi sai hàng hoặc hàng lỗi do nhà sản xuất\n\n➡ LƯU Ý KHI SỬ DỤNG CÁC SẢN PHẨM CỦA SHOP\n\n- Đối với sản phẩm đa dạng về chất liệu, kiểu dáng, màu sắc, cách bảo quản sản phẩm là phân loại và giặt các sản phẩm cùng màu để giữ được độ bền và màu sắc của vải, tránh bị phai màu từ các loại quần áo khác.\n\n- Đối với những sản phẩm có thể giặt máy, chỉ nên để ở chế độ giặt nhẹ, hoặc mức trung bình \n\n- Nên lộn áo sang mặt trái trước khi phơi sản phẩm ở nơi thoáng mát, tránh ánh nắng trực tiếp dễ bị phai bạc màu, nên làm khô quần áo bằng cách phơi ở những điểm đón gió sẽ giữ được màu vải.\n\n❗️❗️ QUY ĐỊNH ĐỔI/TRẢ HÀNG: \n\n? LƯU Ý: Màu sắc trên hình có thể chênh lệch do điều kiện ánh sáng, mỗi sản phẩm shop sẽ chụp cận chất, để đúng với màu thực tế nhất \n\n? Shop nhận đổi hàng/trả hàng trong vòng 03 ngay sau khi nhận hàng có lỗi của nhà sản xuất (có video bóc hàng), gửi sai màu/sai mẫu \n\n❗️Nếu sản phẩm bị lỗi Quý khách vui lòng inbox liên hệ Shop để được hỗ trợ đổi hàng hoặc Trả hàng/Hoàn tiền cho Khách ạ. Rất mong Quý Khách đừng vì lỗi nhỏ mà cho chúng mình 1 - 2 ⭐️ tội cho shop lắm ạ ?\n\nTuyển Sỉ lẻ : 0975.771.793',33000,'Ốp điện thoại silicon mạ điện dáng vuông cổ điển sang trọng cho For iPhone 14 13 12 11 Pro Max iPhone X XS XR 78Plus SE2020',100,1,2,6,200),(57,'Mèo thần tài đón xuân sắp cập bến a ???\nMèo Thần Tài phú quý tượng trưng cho sự may mắn trong cuộc sống, các mối quan hệ thuận hòa đặc biệt trong tình yêu.\n? theo truyền thuyết những người mang theo Mèo Thần Tài bên mình luôn gặp vận may,điều tốt đẹp bao quanh cả năm cả đời ??\nchị em nhanh tay ib e để rinh Mèo Thần Tài nha',6000,'MÈO THẦN TÀI DÁN ĐIỆN THOẠI VÍ TIỀN CHIÊU TÀI LỘC MAY MẮN / Trâu thần tài / Linh phù',100,1,2,6,200),(63,'- Ốp lưng  Cao cấp!!!\n***Mô tả chi tiết sản phẩm:\n- Chất liệu ép trên bề mặt keo phủ cực chắc chắn.\n- Viền TPU mềm mại bo khít viền máy\n- Góc thiết kế chống sốc ngầm bảo vệ cực tốt khi rơi và thẩm mỹ vẫn rất đẹp\n- Sản phẩm nhẹ, chắc và bền.\n\n#14promax\n#14pro\n#14plus\n#14\n#13promax\n#13pro\n#13\n#13mini\n#12promax\n#iphone12\n#iphone12pro\n#iphone11promax\n#iphone11\n#iphone11pro\n#iphonexsmax\n#oplungkinhiphone\n#opiphone12promax\n#opiphone\n#optrong\n#oplungkinhcuongluc',36000,'Ốp lưng trong suốt Cao Cấp không ố chống xước tuyệt đối Iphone 13 promax 12 12pro 12promax,11 promax 14 promax',100,1,2,6,0),(64,'Thời gian giao hàng dự kiến cho sản phẩm này là từ 7-9 ngày\n\nMIẾNG PPF DÁN VIỀN IP 12/13 SIÊU THỊNH HÀNH\n\n? Độ mỏng : 0.25mm\n? Độ cứng 9H, cứng gấp chục lần so với các sản phẩm khác\n? Độ trong suốt đạt chuẩn HD, sáng bóng (Điểm chất lượng vượt trội so với phần còn lại)\n? Chống va đập cực mạnh, cào cấu, va chấn, bao trầy\n? Các góc bo tròn với chất liệu PET cực tốt, cảm giác không bị cấn, khó chịu khi sử dụng.\n\n\n?Thông tin sản phẩm:\n- Chất liệu: TPU\n- Thiết kế: Bo khít máy\n- Dòng máy tương thích: 12/12 pro/12 mini/12 pro max/ 12 mini pro promax/13/13 Mini/13 Pro/13 Pro Max\n- Xuất xứ: Việt Nam\n- Công dụng: giữ điện thoại chắc chắn trên tay, an toàn chống trầy xước,  bảo vệ chiếc điện thoại khỏi va đập.\n\n? Gói hàng bao gồm :\n* Miếng hít bụi\n* Miếng lau màn hình\n\n? Hướng dẫn dán.\n* Bước 1: Vệ sinh\n* Vệ sinh sạch màn hình bằng khăn hoặc 2 miếng giấy ướt và khô đánh dấu số 1, 2 kèm theo. Mục đích tránh bụi bẩn bám trên viền.Dùng băng keo lấy sạch bụi, sợi lông bám trên màn hình. Phải lấy sạch bụi\n* Bước 3: Thực hiện\n* Lột bỏ miếng ppf nhẹ nhàng đặt lại lên viền. Sau khi đã khớp và kiểm tra viền có sót bụi bẩn nào không. Nếu sót nhẹ nhàng dùng băng keo giấy lấy hạt bụi ra.  Vuốt như vậy sẽ hạn chế xuất hiện bọt khí.\nChúc các bạn dán được sản phẩm hoàn toàn ưng ý!',3000,'Miếng PPF dán viền bảo vệ cho Iphone 14 13 Pro Max / 12 Pro Max / 13 Mini',100,1,2,6,0),(67,'TÊN SẢN PHẨM: Áo Thun Unisex Rage Of The Sea (ROTS STUDIO)\n\nTHÔNG SỐ:\n-Chất vải: vải thun 4 chiều định lượng 220gsm, thấm hút mồ hôi, xù lông nhẹ, form áo oversize\n- Đường kim mũi chỉ cẩn thận, chắc chắn\n- Sản phẩm cắt chỉ rất tỉ mỉ, gần như không có chỉ thừa\n\nHướng Dẫn Chọn Size\n-Size S: dưới 55kg, Cao dưới 1m6\n-Size M: từ 55kg - 75kg , Cao 1m60 - 1m7\n-Size L: từ 75 kg -100 kg, Cao : 1m7 – 1m85\n(VÌ ÁO FORM RỘNG VÀ DÀI NÊN BẠN LƯU Ý CHỌN ĐÚNG SAI NHƯ TRÊN, NẾU BẠN MUỐN MẶC RỘNG DÀI OVERSIZE BẠN MỚI CỘNG SIZE THUI Ạ)\n\nCam kết của shop:\n-Shop luôn đặt chất lượng sản phẩm và dịch vụ khách hàng làm ƯU TIÊN HÀNG ĐẦU\n-Nếu nhận sản phẩm về bạn mặc không vừa, Shop hỗ trợ đổi size / đổi màu thoải mái ạ!\n-Nếu Bạn không ưng Bạn được Trả lại sản phẩm, Shop hoàn lại tiền 100% ạ. Mọi chi phí trả lại shop sẽ chi trả ạ.\n-Dạ nếu như bạn nhận được sản phẩm lỗi, Shop luôn sẵn sàng gửi sản phẩm mới đổi lại cho bạn.\n-Nếu shop giao nhầm sản phẩm, hoặc giao thiếu sản phẩm Bạn Inbox Ngay cho shop để shop giao sản phẩm đổi lại, hoặc shop giao bù sản phẩm mới hoặc Hoàn Tiền cho bạn Ngay ạ (Bạn nhớ quay lại video hoặc chụp hình đơn hàng trước khi khui gói hàng ạ)\n-Nếu cần hỗ trợ bất kì điều gì bạn hãy Inbox ngay hoặc Gọi ngay vào số Hotline của shop là  0772989705 ạ! Shop luôn sẵn sàng hỗ trợ tối đa nhất khi có thể!\n\n? ROTS STUDIO 311/37 Kênh Tân Hóa, Phường Hòa Thành, quận Tân Phú, Hồ Chí Minh\n☎️ Hotline: 0772989705\n? Shopee: Rage Of The Sea\n?Facebook: Rage Of The Sea\n\n#rageofthesea #aothun #aothununisex #aothunoversize #local #freeship #sale #99k #shopee #tiktok #tee #áothun #sale #SHOPEE #AOTHUN #UNISEX #REVIEW ',99000,'ÁO THUN UNISEX FORM ÂU RAGE OF THE SEA “VIETNAM IN HEART”',100,1,3,7,0),(68,'Đầm tiểu thơ xinh xắn ⚡ HOT TREND ⚡ Váy dáng dài, cổ vuông siêu xinh cho nàng\n\n⚠️ CAM KẾT 1 ĐỔI 1 TRONG 7 NGÀY NẾU CÓ LỖI CỦA SHOP ⚠️\n                                \nGiao hàng tận nơi trên toàn quốc, Nhận hàng nhanh chóng tại nhà.\n\n======================\n\n⭐️ Thông tin sản phẩm:\n\n- Xuât xứ: Trung Quốc\n- Chất liệu: Sợi tổng hợp\n\n Váy dáng dài:\n- Size: S, M, L, XL,\nNgực: 86 - 89 - 92 - 95 - 98\nỐng tay: 26 - 26 - 26 - 28 - 28\nDài váy: 108 - 109 - 110 - 111 -111\n- Màu sắc: Be, Trắng\n\nVáy dáng ngắn:\n- Size: S, M, L, XL, \nNgực: 84 - 87 - 90 - 93 - 96\nDài váy: 87 - 88 - 89 - 90 - 91 \nTay: 25 - 26 - 26 - 26 - 26\n- Mùa sắc: Be, trắng\n\n⭐️ CHÚNG TÔI CAM KẾT BÁN HÀNG\n\n✅ Tất cả các mặt hàng đều qua kiểm định và thử chất lượng, không bán hàng trôi nổi, phương châm của chúng tôi là mang những điều tốt đẹp nhất đến với khách hàng!\n✅ Sản phẩm luôn kèm ảnh thật và video shop tự quay\n✅ Đổi trả trong vòng 7 ngày nếu hàng hỏng lỗi\n✅ Tất cả các thông tin về Shop đều được công khai \n✅ Luôn tư vấn tận tình để mang sản phẩm phù hợp nhất đến với bạn\n✅ Hỗ trợ online 24/24\n✅ Tiếp nhận phản ảnh và xử lí tích cực\n✅ Đặt hàng Bình luận trực tiếp vào sản phẩm hoặc inbox cho shop, sẽ có nhân viên trả lời ngay!\n\n ------------------------------------------------\n\n#mẫu_váy_xòe_liền_thân_đẹp #váy_liền_thân #váy_liền #vay_lien #váy_xòe_liền_thân_dáng_dài #váy_liền_dài\n#váy_liền_thân_dài_qua_gối #váy_liền_chữ_a_mùa_hè #váy_liên_thân_mùa_hè #đầm_liền_thân #váy_liền_trắng\n#váy_liền_mùa_hè #váy_bò_liền #váy_trắng_liền_thân #váy_liền_dáng_dài #vaylienthan #váy #váy_liền_thân_mùa_hè',109000,'Đầm tiểu thơ xinh xắn HOT TREND Váy trắng đính nơ Váy dáng dài, cổ vuông siêu xinh cho nàng [Kèm ảnh thật 100%]',100,1,3,7,0),(69,'Đầm váy nữ basic cổ sơ mi cài cúc chiết eo lưng chun nhiều màu thời trang Banamo fashion váy nữ cộc tay nhiều màu 5915\n\n\n\nU là trời một em váy siêu basic mà siêu đẹp-rẻ là đây chứ đâu ạ.Sẵn kho đủ màu nha các bác ơi.Ghé ship e rinh ngay về đi ạ.Bảng màu siêu xịn 5 màu siêu xinh nha.\n\nVáy có chun eo sau lưng nên rất dễ mặc Dài váy 85-90cm nhé,chất vải thô đứng form lắm ạ\n\nLưu ý nhỏ là mỗi đợt về phần cúc có thể to nhỏ khác nhau ko đáng kể nhé\n\n Màu sắc vải/ sản phẩm váy sơ mi nữ có thể chênh lệch thực tế một phần nhỏ do ảnh hưởng ánh sáng nhưng vẫn đảm bảo về chất lượng tuyệt đối ạ.\n\n\n\nThông số :Size S-M-L-XL-2Xl-3XL(40-75kg)\n\nSize S: 40-47kg\n\nSize M: 48-54kg\n\nSize L: 55-60kg\n\nSize XL:(60-65kg)\n\nSize 2XL(65-70kg)\n\nSize 3XL(70-75kg)\n\n\n\n\n\nThông số SIZE shop để là tương đối theo body phổ thông, khách có body chênh lệch vui lòng tăng size mặc cho thoải mái. Nếu khó chọn size hãy liên hệ với shop để được tư vấn ạ.\n\n\n\nGiá trực tiếp từ nhà sản xuất đến thẳng tay người tiêu dùng, ko qua trung gian, ko đội giá\n\n\n\nSỉ - ctv ib: 0989888999\n\n\n\n#banamo #vaynu #damnu #vaysomi #damsomi #thomem #lungchun#vaysomi #damcongso #vaydam #vaynu #damnu #damthietke #vaythietke #vayulzzang #vayulzzangnu #damsuong #damsomithateo #vaysomithateo #damsuong',105000,'Đầm váy nữ basic Banamo fashion cổ sơ mi cài cúc chiết eo lưng chun cộc tay nhiều màu 5915',96,1,3,7,4),(70,'Áo sơ mi nữ dài tay voan mỏng khoác ngoài đi biển oversize nhiều màu, Áo khoác đi biển voan tơ giấy trong suốt\n\nThông tin sản phẩm:\n\n?Áo form rộng phù hợp khoác ngoài với áo 2 dây, bra... bên trong để đi biển\n\n? Kiểu dáng đuôi tôm nhẹ\n\n? Chất liệu: Voan giấy\n\n? Kích Cỡ: Freesize dưới 70kg tùy chiều cao\n\n? Màu sắc sản phẩm: Trắng, be, xanh\n\n? Đặc điểm riêng: mặc thoải mái\n\n\n\n??? Thông số chi tiết\n\n? Chiều dài áo : vạt trước 65cm, vạt sau 75cm\n\n? Chiều ngang áo: 58cmx2\n\n- Đường may chuẩn chỉnh, tỉ mỉ, chắc chắn.\n\n- Mặc ở nhà, mặc đi chơi hoặc khi vận động thể thao. Phù hợp khi mix đồ với nhiều loại quần hoặc chân váy\n\n- Thiết kế hiện đại, trẻ trung, năng động. Dễ phối đồ.\n\nLưu ý: \n\n- Số đo trên có thể sẽ chênh lệch 2-3cm k đáng kể. Để tư vấn size kĩ hơn các bạn ib số đo chiều cao, cân nặng cho shop hỗ trợ thêm nhé\n\n- Do màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 5-10%\n\n\n\nHướng dẫn sử dụng sản phẩm Áo sơ mi nữ dài tay voan mỏng khoác ngoài đi biển oversize nhiều màu, Áo khoác đi biển sơ mi nữ voan tơ giấy trong suốt:\n\n- Nhớ lộn trái áo khi giặt và không giặt ngâm\n\n- Không giặt máy trong 10 ngày đầu\n\n- Không sử dụng thuốc tẩy\n\n- Khi phơi lộn trái và không phơi trực tiếp dưới ánh nắng mặt trời\n\n\n\nCHÚNG TÔI XIN CAM KẾT:\n\nÁo sơ mi nữ dài tay voan mỏng khoác ngoài đi biển oversize nhiều màu, Áo khoác đi biển sơ mi nữ voan tơ giấy trong suốt:\n\nĐảm bảo vải chuẩn lụa hàn 100% chất lượng .\n\nHàng có sẵn, giao hàng ngay khi nhận được đơn đặt hàng .\n\nHoàn tiền 100% nếu sản phẩm lỗi, nhầm hoặc không giống với mô tả.\n\nChấp nhận đổi hàng khi size không vừa (vui lòng nhắn tin riêng cho shop).\n\nGiao hàng toàn quốc, thanh toán khi nhận hàng.\n\n\n\nHỗ trợ đổi trả theo quy định của Shopee .\n\n\n\n1. Điều kiện áp dụng đổi sản phẩm (trong vòng 07 ngày kể từ khi nhận sản phẩm) \n\n- Hàng hoá vẫn còn mới nguyên tem mác, chưa qua sử dụng.\n\n- Hàng hoá bị lỗi hoặc hư hỏng do vận chuyển hoặc do nhà sản xuất \n\n\n\n2. Trường hợp không đủ điều kiện áp dụng chính sách: \n\n- Quá 07 ngày kể từ khi Quý khách nhận hàng từ shopee.\n\n- Gửi lại hàng không đúng mẫu mã, không phải sản phẩm của Annaa House\n\n- Không thích, không hợp, đặt nhầm mã, nhầm màu, yêu cầu kiểm tra hàng trước khi thanh toán.\n\n\n\nAnnaa House không chịu trách nhiệm trong trường hợp quý khách chọn nhầm màu sắc, hoa văn, kích thước; bên cạnh đó các vấn đề khiếm khuyết nhỏ không đáng kể hay độ lệch màu ít giữa sản phẩm thực tế và hình ảnh minh họa sẽ không gây ảnh hưởng đến vấn đề chất lượng...\n\nNếu sp nhận đc có vấn đề khác đừng vội đánh giá xấu vui lòng nhắn tin hoặc liên hệ số 0387007915 cho shop để được hỗ trợ nhanh nhất\n\n#ao #khoac #aomong #somi #tron #hanquoc #formrong #sominu#AnnaaHouse#taydai#sominhieumau#aonu#somitayngan#somitron#somidibien#aodibien#aokhoacngoai',215000,'Áo sơ mi nữ dài tay voan mỏng khoác ngoài đi biển oversize nhiều màu, Áo khoác đi biển voan tơ giấy trong suốt',100,1,3,7,0),(71,'Tên Sản Phẩm : Đầm váy sơ mi nữ màu xanh kẻ sọc, Váy sơmi suông tay dài cổ đức ulzzang form rộng kiểu hàn cài cúc basic\n\n- Xuất xứ váy sơ mi: Quảng Châu\n- Tên Shop: Lady Quảng Châu\n\nMàu Sắc: Xanh kẻ sọc\nFreesize < 63kg\n Vòng Eo 82-84cm, Vòng Ngực 96cm, Dài váy: 91cm\n\n\n✅ Đặc điểm nổi bật: Đầm váy sơ mi nữ màu xanh kẻ sọc, Váy sơmi suông tay dài cổ đức ulzzang form rộng kiểu hàn cài cúc basic\nĐầm váy nữ cổ sơ mi là một trong những “item” thời trang không thể thiếu những nàng sành điệu. Váy nữ kiểu tay dài,tay ngắn,ôm được thiết kế tỉ mỉ kiểu dáng hiện đại dễ thương . đầm nữ quảng châu vừa năng động, trẻ trung lại quyến rũ và hấp dẫn vì vậy đây chính là một “item HOT” rất được yêu thích trong “làng” thời trang nữ. Khoảng thời gian gần đây, thời trang áo đầm babydoll, váy babydoll cổ vuông,có cổ dần được biến tấu theo nhiều phong cách khác nhau, phù hợp với nhiều vóc dáng và nhu cầu người mặc, đa dạng với nhiều kiểu thiết kế. Mỗi thiết kế mang một điểm nhấn, sự nổi bật, tự tin cho bất cứ cô nàng nào.\n\n✅Hình Thức Đổi - Trả: Đầm váy sơ mi nữ màu xanh kẻ sọc, Váy sơmi suông tay dài cổ đức ulzzang form rộng kiểu hàn cài cúc basic\n\n- Do lỗi sản phẩm, nhầm mẫu, nhầm màu, nhầm size... và do quy định của shopee\n- Shop sẽ Hỗ Trợ đổi hàng cho khách nếu bị “chật” ạ ?\n- Nếu do lỗi của shop khách hàng không phải chịu bất kỳ chi phí nào\n\n\n✔️HƯỚNG DẪN BẢO QUẢN: Đầm váy sơ mi nữ màu xanh kẻ sọc, Váy sơmi suông tay dài cổ đức ulzzang form rộng kiểu hàn cài cúc basic\n- Để giữ sản phẩm Váy nữ basic được bền đẹp các bạn nên giặt bằng tay hoặc máy giặt với lực quay nhẹ. \n- Không nên ngâm đầm Váy nữ basic  bánh bèo quá lâu hoặc sử dụng các chất có tính tẩy mạnh, tránh chà xát bằng bàn chải, hạn chế phơi ở nơi có ánh nắng gắt. \n- Lưu trữ sản phẩmVáy nữ basic  bằng móc áo trong tủ sẽ giữ  đẹp hơn khi sử dụng.\n\n#ladyquangchau #damvaynu #vaysomi #damsomi #vaydangdai #damdangdai #nau #be #den #lady #vaynu #damnu #vay #nu #dam #so #mi #ulzzang #han #quoc #gia #re #dep #basic #big #size #big #size #form #rong #vaysomingan #vaybigsize #hanquoc #vayxanh #vaycoduc #damcoduc #damxanh #ke #soc',165000,'Đầm váy sơ mi nữ màu xanh kẻ sọc, Váy sơmi suông tay dài cổ đức kèm đai thắt ulzzang form rộng kiểu hàn cài cúc basic',100,1,3,7,0),(72,'? Thông tin sản phẩm : Bộ thể thao nam quần áo cộc tay vải Linen\n\n♥️ Đồ Bộ Nam là phụ kiện thời trang đơn giản nhưng không thể thiếu. Các anh có thể mặc đồ bộ nam ờ nhà, hay dùng làm đồ thể thao, tập gym rất mát mẻ và thoải mái\n\n?Trong thế giới thời trang của phái mạnh các set thể thao hay bộ quần áo nam luôn chiếm một vị trí quan trọng.\n\nMang tới cho các anh chàng sự thoải mái khi đi dạo phố hoặc hẹn hò bè bạn , những bộ đồ thể thao nam cao cấp đã trở thành người bạn không thể thiếu các chàng.\n\nVà nếu bạn cũng đang đi tìm một set bộ cộc tay nam đẹp thời trang thể thể hiện được cá tính của bản thân một cách rõ nét nhất và đang... lạc lối, thì hãy cùng khám phá và cảm nhận trên sản phẩm của chúng mình nhé\n\n? Luôn là nơi cập nhật những xu hướng quần áo thể thao, bộ quần áo nam, quần áo hè nam mới nhất\n\nShop đã khẳng định vị trí của mình với nhiều bạn trẻ bởi phong cách thời trang sang trọng, thanh lịch nhưng không thiếu sự năng động và cá tính.\n\nKhéo léo kết hợp trang phục cùng phụ kiện, bạn dễ dàng mang lại một set đồ hài hòa, thể hiện được cá tính riêng của bạn\n\n?  Mẹo Nhỏ Giúp Bạn Bảo Quản Quần áo nam : \n-  Đối với sản phẩm quần áo mới mua về, nên giặt tay lần đâu tiên để tránh phai màu sang quần áo khác\n-  Khi giặt nên lộn mặt trái ra để đảm bảo độ bền \n-  Sản phẩm phù hợp cho giặt máy/giặt tay\n - Không giặt chung đồ Trắng và đồ Tối màu \n\n1.Thông tin xuất xứ hàng hoá\n- Cơ Sở Sản Xuất: Nhà may An Nguyễn\n- Chủ cơ sở : Nguyễn Bình An\n- Địa chỉ : Xóm Thị Kiều, Xã Lộc An, Thành Phố Nam Định, Tỉnh Nam Định\n\na) Thành phần :  \n♥️ Chất liệu:  chất vải Linen , lên dáng chuẩn form ,chất xốp nhẹ , không bám dính mồ hôi nên người dùng sẽ cảm thấy rất thoải mái\nb) Thông số kỹ thuật; \n♥️ Màu sắc: Đen, Trắng, Ghi \n♥️ Size : \n- M (35 - 53kg)\n- L (53 - 63kg)\n- XL (63 - 73kg)\n- 2XL (73 - 83 kg)\n- 3XL (83 - 99 kg)\nc) Thông tin cảnh báo;\n- Với tất cả các sản phẩm thời trang -> Giặt 1 lần trước khi sử dụng để đảm bảo an toàn cho da\nd) Hướng dẫn sử dụng, hướng dẫn bảo quản;\n- Không dùng móc dị dạng phơi quần áo\n- Khi giặt Lộn trái quần để quần áo được bền nhất\n- Không giặt chung với chất tẩy rửa mạnh\nđ) Năm sản xuất: 2022\n\n? SHOP CAM KẾT\nSản phẩm 100% giống mô tả. Kiểu dáng hoàn toàn giống ảnh mẫu\nÁo được kiểm tra kĩ càng, cẩn thận và tư vấn nhiệt tình trước khi gói hàng giao cho Quý Khách\nHàng có sẵn, giao hàng ngay khi nhận được đơn \nHoàn tiền nếu sản phẩm không giống với mô tả\nChấp nhận đổi hàng khi size không vừa\nGiao hàng trên toàn quốc, nhận hàng trả tiền \nHỗ trợ đổi trả theo quy định của Shopee\nDo màn hình và điều kiện ánh sáng khác nhau, màu sắc thực tế của sản phẩm có thể chênh lệch khoảng 3-5\n\n#bothethao #dobo #bomacnha #quanaothethao #dothethao #dotapthethao #dobonam #bothethaonam #boquanaonam #setthethao #dothethaonam #donam #bodomacnha #quanaohenam #dotapgymnam #bococtay',119999,'Bộ quần áo nam full size 35 - 99kg thể thao. Đồ bộ xốp nam cộc tay vải Linen hot trend mềm mại siêu co giãn',100,1,1,8,0),(73,'?  CÁCH CHỌN SIZE\n\n? Size 27 : Từ 38 - 45kg Cao trên 1m55\n? Size 28 : Từ 45 - 52kg Cao trên 1m55\n? Size 29 : Từ 53 - 57kg Cao trên 1m55\n? Size 30 : Từ 58 - 62kg Cao trên 1m60 ( là mặc đẹp nhất )\n? Size 31 : Từ 63 - 67kg Cao trên 1m60 ( là mặc đẹp nhất )\n? Size 32 : Từ 68 - 75 kg Cao trên 1m60 ( là mặc đẹp nhất )\n? Size 33 : Từ 76 - 83 kg Cao trên 1m60 ( là mặc đẹp nhất )\n.\nLƯU Ý: SHOP Có 2 loại rách Gối và không rách gối , Khách có yêu cầu gì đặc biệt có thể inbox shop hỗ trợ ạ !\nQuần jean rách gối bên mình khá đẹp và giá rẻ nên mọi người ủng hộ shop mình nhé\n✔️ Loại  : Quần Jean COTTON Co Giản , ống suông , rách gối !\n✔️ Kiểu dáng  : Hàn Quốc,  Đi Chơi,  Công Sở, Đời Thường\n✔️Chất liệu  : Vải Jean Cotton , co dãn\n✔️Thương hiệu  : Muidoi\n✔️Thích hợp  : 4 mùa\n\n#quần_jean\n#quần_jeans\n#quần_jean_nam\n#quần_bò_ống_rộng\n#quần_bò_nam\n#quần_bò\n#quần_jean_ống_suông\n#quần_baggy\n#quần_baggy_nam\n#quần_jean_rách_gối\n#quần_bò_nam\n#quần_jean_ống_rộng\n#quần_bò_rách_gối\n#quần_jean_giá_rẻ\n#quan_jean_nam\n#quan_bo_nam_dep\n#quần_bò_nam_đẹp\n#quần_jean_ống_côn',139000,'quần jean nam dáng baggy cắt gấu chất liệu co dãn',100,1,1,8,0),(74,'   ?    V7men Chuyên Phụ Kiện Cao Cấp     ?\n\n[ Giá Sốc ] Thắt lưng nam LV, thắt lưng da cao cấp mặt kim loại nguyên khối trẻ trung lịch lãm TLLV001\n\n ? Dây Lưng Được Đục Sẵn 5 Lỗ\n\n   *  MỤC ĐÍCH SỬ DỤNG\n-  Đeo đi chơi, dạo phố, dự tiệc đều tạo một phong cách đầy cá tính sang trọng.\n- Có thể dùng làm món quà tặng anh, em, bạn bè đồng nghiệp trong các dịp sự kiện, sinh nhật đều rất đẹp và ý nghĩa. \n? Tinh xảo và sắc nét được tạo khối và mạ vàng đẹp mắt tạo nên nét sang trọng và đẳng cấp cho món phụ kiện luôn dễ dàng hấp dẫn các quý ông và là điểm sáng tinh tế cho mọi trang phục. \n      -------------------------------------------------------------------\nCHI TIẾT SẢN PHẨM : Thắt lưng nam, Thắt lưng da, Dây nịt nam, Dây lưng nam \n- Thắt lưng da mềm, chất liệu da PVC cao cấp.\n- Dây lưng nam thiết kế kẻ ô vuông kiểu dáng thời trang lịch lãm.\n- Kích thước thắt lưng da nam: 3,5x120cm\n-------------------------------------------------------------------\n? V7men CAM KẾT:\n1)	Cam kết chất lượng và sản phẩm dây thắt lưng giống với hình ảnh.\n2)	Thắt lưng da được shop tuyển chọn kỹ càng trước khi giao đến tay khách.\n3)	Hoàn tiền nếu sản phẩm không giống với mô tả.\n4)	Trả hàng hoàn tiền trong 15 ngày nếu lỗi sai sót từ phía V7men\n❤ Nếu khách nhận hàng ko ưng , khách cứ inbox shop nhé,  shop cam kết sẽ nhận lại hàng và hoàn tiền cho khách ạ !\n-------\n #daythatlung #daynitnam  #dâylưngnam #daylungnam  #thắtlưngnam, #thatlungnam #thắt_lưng_nam #that_lung_nam  #thắtlưng_nam #that_lung_nam #dây_nịt_nam #day_nit_nam #dây_nịt_nam #dâynịt_nam #daynit_nam #thatlung_nam #thắtlưngnam #thăt_lưng_nam',29000,'[ Giá Sốc ] Thắt lưng nam LV, thắt lưng da cao cấp mặt kim loại nguyên khối trẻ trung lịch lãm TLLV001',100,1,1,8,0),(75,'Bộ Thể Thao Nam Cộc Tổ Ong Mặc Nhà, Bộ Quần Áo Nam Mềm Nhẹ Co Giãn Thoải Mái BO08 - PROMAN\n\nThông tin sản phẩm Bộ thể thao nam\n\n- Bộ thể thao nam được thiết kế theo đúng form chuẩn của nam giới Việt Nam\n\n- Sản phẩm Bộ thể thao nam chính là mẫu thiết kế mới nhất cho mùa hè này\n\n- Chất liệu: Xốp tổ ong mềm mịn, co dãn 4 chiểu cao cấp (thoáng mát, thấm hút mồ hôi)\n\n- Đem lại sự thoải mái tiện lợi nhất cho người mặc\n\n\n\nHướng dẫn sử dụng Bộ thể thao nam\n\n- Đối với sản phẩm quần áo mới mua về, nên giặt tay lần đâu tiên để tránh phai màu sang quần áo khác\n\n- Khi giặt nên lộn mặt trái ra để đảm bảo độ bền của hình in/decal\n\n- Sản phẩm phù hợp cho giặt máy/giặt tay',108000,'Bộ Thể Thao Nam Cộc Tổ Ong Mặc Nhà, Bộ Quần Áo Nam Mềm Nhẹ Co Giãn Thoải Mái (Big Size đến 95Kg) - BO08 - PROMAN',100,1,1,8,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (6,'0988666888','Thanh Xuân','Quang_Minh',13,1),(7,'0989888999','Thanh Xuân - Hà Nội','Shop Thời Trang Nữ',54,1),(8,'0989999888','Nam Từ Liêm - Hà Nội','Shop Thời Trang Nam',56,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'68@gmail.com','Quang Minh','Nguyễn Quang Minh','$2b$10$K6yEyumfXu.nWEUyc3E/4O6d1tBo5T8LcaHUqTpROdSD1wG9zYShO','$2b$10$K6yEyumfXu.nWEUyc3E/4O6d1tBo5T8LcaHUqTpROdSD1wG9zYShO','http://localhost:5000/avatar/avatar-1688433688292-354299826.jpg','Thanh Xuân',NULL,'0988666888','Nam',1,'02/09/2019'),(54,'1@gmail.com','Hà Trang','Hà Trang','$2b$10$ZgsFgYyrYC.jbYQmOVnu7uwGA/Z3Ud17DCCmMf7GdMRcAi8.63c3W','$2b$10$ZgsFgYyrYC.jbYQmOVnu7uwGA/Z3Ud17DCCmMf7GdMRcAi8.63c3W','http://localhost:5000/avatar/avatar-1688398826739-863198447.jpg','Thanh Xuân',NULL,'0988999888','Nữ',1,'09/09/1993'),(55,'admin@gmail.com','admin','Cấp Cao','$2b$10$5He9omx8FBnTv/mW2TAGR.LPSbVlo7Gd4aLtlcJqgJ1uPOpzb/NLy','$2b$10$5He9omx8FBnTv/mW2TAGR.LPSbVlo7Gd4aLtlcJqgJ1uPOpzb/NLy','http://localhost:5000/avatar/avatar-1689213287007-677959234.jpg','Cà Mau',NULL,'0969888999','Nam',0,'12-12-1993'),(56,'6@gmail.com','Đức Nguyễn','Nguyễn Văn Đức','$2b$10$mQJi.SWLXGXVXzTkViD3t.41.EFm0dZyJ9hDVSzbPHzjkiFmoOJ5u','$2b$10$mQJi.SWLXGXVXzTkViD3t.41.EFm0dZyJ9hDVSzbPHzjkiFmoOJ5u','http://localhost:5000/avatar/avatar-1689216327215-158258601.jpg','Thanh Xuân - Hà Nội',NULL,'0989999888','Nam',1,'12-12-1993');
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

-- Dump completed on 2023-07-13 11:59:16
