"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
// Lấy dữ liệu bảng stores
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT * FROM shopee.stores WHERE userId = "${userId}"`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Thêm mới thông tin vào bảng stores
router.post("/", async (req, res) => {
    const { phone, addressStore, storeName, userId } = req.body;
    let statusStore = 1;
    try {
        let response = await database_1.default.execute(`INSERT INTO shopee.stores (phone, addressStore, storeName, userId, statusStore) VALUES (?, ?, ?, ?, ?);`, [phone, addressStore, storeName, userId, statusStore]);
        res.status(200).json({
            status: 200,
            message: response
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Lấy dữ liệu bảng stores theo id products
router.get("/user/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT stores.* FROM products JOIN stores ON stores.storeId = products.storeId WHERE productId = "${productId}"`);
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
