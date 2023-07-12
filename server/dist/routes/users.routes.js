"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../utils/database"));
const checkIs_1 = __importDefault(require("../middleware/checkIs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// Register
router.post("/register", checkIs_1.default, async (req, res) => {
    const { userName, passwordUser, passwordConfirm } = req.body;
    try {
        // Check if userName already exists
        let data = await database_1.default.execute(`SELECT * FROM shopee.users WHERE userName = ?`, [userName]);
        let existingUser = data[0];
        if (existingUser.length !== 0) {
            return res.json({
                status: 409,
                message: "userName already registered"
            });
        }
        if (passwordConfirm !== passwordUser) {
            res.json({
                status: 400,
                message: "passworDincorrect",
            });
            return;
        }
        try {
            const salt = await bcrypt_1.default.genSalt(10);
            const hashed = await bcrypt_1.default.hash(passwordUser, salt);
            const hashedConfirm = await bcrypt_1.default.hash(passwordConfirm, salt);
            let statusUser = 1;
            let insertData = await database_1.default.execute(`INSERT INTO shopee.users (userName, passwordUser, passwordConfirm, statusUser) VALUES (?, ?, ?, ?)`, [
                userName,
                hashed,
                hashedConfirm,
                statusUser,
            ]);
            res.json({
                status: "Success",
                insertData,
            });
        }
        catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    }
    catch (error) {
        console.log("Select failed", error);
        return res.status(500).json({
            status: 500,
            message: "Select failed",
            error: error.message,
        });
    }
});
// Login
router.post("/login", async (req, res) => {
    const { userName, passwordUser } = req.body;
    try {
        let data = await database_1.default.execute(`SELECT * FROM users WHERE userName = ?`, [userName]);
        let data1 = data[0];
        if (data1.length === 0) {
            res.json({
                status: 201,
                message: "Tài khoản không tồn tại!",
            });
        }
        else {
            const user = data[0];
            bcrypt_1.default.compare(passwordUser, user[0].passwordUser, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: err,
                    });
                }
                else {
                    if (!isMatch) {
                        res.status(401).json({
                            status: 401,
                            message: "userName hoặc mật khẩu không đúng",
                        });
                    }
                    else {
                        res.status(200).json({
                            status: 200,
                            message: "Đăng nhập thành công!",
                            data: user,
                        });
                    }
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.default = router;
