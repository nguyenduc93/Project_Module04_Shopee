"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const router = express_1.default.Router();
// Lấy trạng thái order để cho người dùng bình luận
router.get("/:id/:productId", async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.params;
    try {
        let data = await database_1.default.execute(`SELECT orders.statusOrder FROM users JOIN orders ON orders.userId = users.userId JOIN orderdetail ON orders.orderId = orderdetail.orderId JOIN products ON products.productId = orderdetail.productId WHERE users.userId = ${userId} AND products.productId = ${productId};`);
        res.status(200).json({
            status: 200,
            message: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Thêm bình luận
router.post("/", async (req, res) => {
    const { contents, productId, userId, rate } = req.body;
    const createdDate = (0, moment_timezone_1.default)()
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DD HH:mm:ss");
    try {
        let response = await database_1.default.execute(`INSERT INTO shopee.product_reviews (contents, rate,createDate , userId, productId) VALUES (?, ?, ?, ?, ?);`, [contents, rate, createdDate, userId, productId]);
        res.status(200).json({
            status: 200,
            message: response
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Lấy tất cả bình luận
router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT product_reviews.*, users.avatarURL, users.userName FROM product_reviews JOIN users ON users.userId = product_reviews.userId JOIN products ON products.productId = product_reviews.productId WHERE products.productId = ${productId};`);
        res.status(200).json({
            status: 200,
            message: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
