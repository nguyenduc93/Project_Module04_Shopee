"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
// Lấy dữ liệu bảng categories
router.get("/", async (req, res) => {
    try {
        let data = await database_1.default.execute(`SELECT * FROM shopee.categories`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Lấy dữ liệu bảng categories theo id products
router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT categories.categoryName FROM categories JOIN products ON products.categoryId = categories.categoryId WHERE products.productId = ${productId}`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Lấy dữ liệu bảng categories theo id category
router.get("/user/:id", async (req, res) => {
    const categoryId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT p.*, i.image, i.imageId, c.categoryId
    FROM categories c
    JOIN products p ON p.categoryId = c.categoryId
    JOIN images i ON p.productId = i.productId
    WHERE i.imageId = (
        SELECT MIN(imageId)
        FROM images
        WHERE productId = p.productId
    ) AND c.categoryId = ${categoryId};`);
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
