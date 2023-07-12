"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const { key } = req.query;
    try {
        let data = await database_1.default.execute(`SELECT p.*, i.image, i.imageId FROM products p JOIN images i ON p.productId = i.productId WHERE i.imageId = (SELECT MIN(imageId) FROM images WHERE productId = p.productId) AND productName LIKE ?;`, [`%${key}%`]);
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
