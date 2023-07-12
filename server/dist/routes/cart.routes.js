"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { quantityCart, userId, productId } = req.body;
    try {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingCartItem = await database_1.default.execute(`SELECT * FROM carts WHERE userId = ? AND productId = ?`, [userId, productId]);
        let data = existingCartItem[0];
        if (data.length > 0) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng bằng cách cộng dồn
            const updatedCartItem = await database_1.default.execute(`UPDATE carts SET quantityCart = quantityCart + ? WHERE userId = ? AND productId = ?`, [quantityCart, userId, productId]);
            res.json({
                status: "Success",
                message: "Quantity updated successfully",
                updatedCartItem,
            });
        }
        else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
            const insertData = await database_1.default.execute(`INSERT INTO carts (quantityCart, userId, productId) VALUES (?, ?, ?)`, [quantityCart, userId, productId]);
            res.json({
                status: "Success",
                message: "Product added to cart successfully",
                insertData,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Failed",
            error: error.message,
        });
    }
});
//  Lấy dữ liệu mỗi user 1 giỏ hàng
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT products.*,carts.cartId, carts.quantityCart, stores.*, first_image.image
          FROM carts
          JOIN products ON carts.productId = products.productId
          JOIN stores ON products.storeId = stores.storeId
          JOIN (
          SELECT images.*
          FROM images
          INNER JOIN (
            SELECT MIN(imageId) AS minImageId
            FROM images
            GROUP BY productId
          ) AS min_images ON images.imageId = min_images.minImageId
        ) AS first_image ON products.productId = first_image.productId
        WHERE carts.userId = ${userId};`);
        res.status(200).json({
            status: 200,
            message: data[0]
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Xóa sản phẩm khỏi giỏ hàng
router.delete("/:id/:userId", async (req, res) => {
    const productId = req.params.id;
    const { userId } = req.params;
    console.log(productId, userId);
    try {
        let data = await database_1.default.execute(`DELETE FROM shopee.carts WHERE productId = ? AND userId = ?`, [productId, userId]);
        res.status(200).json({
            status: 200,
            message: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
// Xóa tất cả sản phẩm khỏi giỏ hàng khi thanh toán thành công
router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        let data = await database_1.default.execute(`DELETE FROM shopee.carts WHERE (userId = ${userId});`);
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
