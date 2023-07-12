"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { quantityOrder, orderId, productId } = req.body;
    try {
        // Thực hiện câu lệnh SQL để lưu thông tin sản phẩm vào CSDL
        let insertData = await database_1.default.execute(`INSERT INTO shopee.orderDetail (quantityOrder, orderId, productId) VALUES (?, ?, ?);`, [quantityOrder, orderId, productId]);
        res.json({
            status: "Success",
            insertData,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed",
            error: error.message,
        });
    }
});
// Lấy chi tiết đơn hàng của người dùng
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        let data = await database_1.default.execute(`
     SELECT orders.*, first_image.image, orderDetail.quantityOrder,orderDetail.productId, users.avatarURL, stores.storeName, products.productName
     FROM users
     JOIN orders ON users.userId = orders.userId
     JOIN orderDetail ON orderDetail.orderId = orders.orderId
     JOIN products ON products.productId = orderDetail.productId
     JOIN (
       SELECT images.*
       FROM images
       INNER JOIN (
         SELECT MIN(imageId) AS minImageId, productId
         FROM images
         GROUP BY productId
       ) AS min_images ON images.imageId = min_images.minImageId
     ) AS first_image ON products.productId = first_image.productId
     JOIN stores ON stores.storeId = orders.storeId
     WHERE users.userId = ${userId};
     `);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
