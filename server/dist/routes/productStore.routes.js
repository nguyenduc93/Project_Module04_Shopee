"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
// Lấy dữ liệu sản phẩm của 1 cửa hàng
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        let data = await database_1.default.execute(`SELECT * FROM products JOIN stores ON products.storeId = stores.storeId JOIN users ON stores.userId = users.userId JOIN (SELECT images.* FROM images INNER JOIN ( SELECT MIN(imageId) AS minImageId FROM images GROUP BY productId ) AS min_images ON images.imageId = min_images.minImageId) AS first_image ON products.productId = first_image.productId WHERE users.userId = ${userId};`);
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
