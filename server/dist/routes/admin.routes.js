"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
// Lấy toàn bộ users
router.get("/users", async (req, res) => {
    try {
        let data = await database_1.default.execute(`SELECT * FROM users ;`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Khóa và mở tài khoản user
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { statusUser } = req.body;
    try {
        let data = await database_1.default.execute(`UPDATE shopee.users SET statusUser = ? WHERE userId = ?;`, [statusUser, id]);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
//  Lấy toàn bộ danh sách cửa hàng
router.get("/shop", async (req, res) => {
    try {
        let data = await database_1.default.execute(`SELECT * FROM stores ;`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Khóa và mở tài khoản stores
router.put("/shop/:id", async (req, res) => {
    const { id } = req.params;
    const { statusStore } = req.body;
    try {
        let data = await database_1.default.execute(`UPDATE shopee.stores SET statusStore = ? WHERE storeId = ?;`, [statusStore, id]);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
//  Lấy toàn bộ products của tất cả stores
router.get("/products", async (req, res) => {
    try {
        let data = await database_1.default.execute(`SELECT p.*, i.image, i.imageId, s.*, u.avatarURL FROM products p JOIN stores s ON p.storeId = s.storeId JOIN users u ON u.userId = s.userId JOIN images i ON p.productId = i.productId WHERE i.imageId = (SELECT MIN(imageId) FROM images WHERE productId = p.productId);`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Khóa và mở sản phẩm
router.put("/products/:productId/:storeId", async (req, res) => {
    const { productId } = req.params;
    const { storeId } = req.params;
    const { statusproduct } = req.body;
    try {
        let data = await database_1.default.execute(`UPDATE shopee.products SET statusproduct = ? WHERE productId = ? AND storeId = ?;`, [statusproduct, productId, storeId]);
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
