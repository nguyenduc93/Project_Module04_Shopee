"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const createdDate = (0, moment_timezone_1.default)()
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DD HH:mm:ss");
    const { address, phoneOrder, nameOrder, totalPrice, userId, storeId } = req.body;
    const statusOrder = "pending";
    try {
        // Thực hiện câu lệnh SQL để lưu thông tin sản phẩm vào CSDL
        let insertData = await database_1.default.execute(`INSERT INTO shopee.orders (address, phoneOrder, nameOrder,createdDate, statusOrder, totalPrice,storeId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [address, phoneOrder, nameOrder, createdDate, statusOrder, totalPrice, storeId, userId]);
        const orderId = insertData[0].insertId;
        res.json({
            status: "Success",
            orderId,
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
//Tất cả Đơn hàng của 1 stores
router.get("/:id", async (req, res) => {
    const storeId = req.params.id;
    try {
        let data = await database_1.default.execute(`
     SELECT orders.*, first_image.image, orderDetail.quantityOrder,orderDetail.productId, users.avatarURL, products.productName, users.userName
FROM stores
JOIN orders ON stores.storeId = orders.storeId
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
JOIN users ON orders.userId = users.userId
WHERE stores.storeId = ${storeId} ORDER BY createdDate DESC;
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
//  Cập nhật lại trạng thái đơn hàng
router.put("/:id", async (req, res) => {
    const orderId = req.params.id;
    const { statusOrder } = req.body;
    try {
        let data = await database_1.default.execute(`UPDATE shopee.orders SET statusOrder = ? WHERE orderId = ${orderId}`, [statusOrder]);
        res.status(200).json({
            status: 200,
            data
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
