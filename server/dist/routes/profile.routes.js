"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const router = express_1.default.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Lưu file vào thư mục public/images
        cb(null, "./public/avatar");
    },
    filename: function (req, file, cb) {
        // Lấy phần tử sau dấu chấm của tên file
        let ext = file.originalname.split(".")[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
// Giới hạn kích thước file upload là 10MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("avatar");
router.put("/:id", async (req, res) => {
    upload(req, res, async function (err) {
        const userId = req.params.id;
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                message: "Failed to upload",
                error: err.message,
            });
        }
        else if (err) {
            return res.status(400).json({
                message: "Failed to upload",
                error: err.message,
            });
        }
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "No file uploaded",
                });
            }
            const query = `UPDATE shopee.users SET avatarURL = 'http://localhost:5000/avatar/${req.file.filename}' WHERE userId = "${userId}"`;
            await database_1.default.execute(query);
            res.json({
                status: "Success123",
                url: `http://localhost:5000/avatar/${req.file.filename}`,
            });
        }
        catch (error) {
            console.log("Insert failed", error);
            return res.status(500).json({
                status: 500,
                message: "Failed",
                error: error.message,
            });
        }
    });
});
// Cập nhật lại thông tin người dùng
router.put("/", async (req, res) => {
    const { fullName, email, phone, address, gender, birthDay, userId } = req.body;
    try {
        let data = await database_1.default.execute(`UPDATE shopee.users SET fullName = ?, email = ?, phone = ?, address = ?, gender = ?, birthDay = ? WHERE userId = ?`, [fullName, email, phone, address, gender, birthDay, userId]);
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
