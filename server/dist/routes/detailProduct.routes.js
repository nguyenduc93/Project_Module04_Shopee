"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
// Lấy dữ liệu sản phẩm của 1 cửa hàng
router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        let data = await database_1.default.execute(`SELECT * FROM products WHERE products.productId = ${productId};`);
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
