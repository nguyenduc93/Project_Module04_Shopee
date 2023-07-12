"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIsEmpty = (field) => {
    if (field === undefined || field === null || field === "") {
        return true;
    }
    else {
        return false;
    }
};
const validateData = (req, res, next) => {
    const { userName, passwordUser, passwordConfirm } = req.body;
    if (checkIsEmpty(userName)) {
        res.status(400).json({
            status: 400,
            message: "Tên người dùng không được để trống!",
        });
        return;
    }
    if (checkIsEmpty(passwordUser)) {
        res.status(400).json({
            status: 400,
            message: "Mật khẩu không được để trống!",
        });
        return;
    }
    if (passwordUser.length < 3) {
        res.status(400).json({
            status: 400,
            message: "Mật khẩu phải có ít nhất 3 ký tự",
        });
        return;
    }
    next();
};
exports.default = validateData;
