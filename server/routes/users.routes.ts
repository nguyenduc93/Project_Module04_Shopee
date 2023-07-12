import express, { Request, Response, Router } from "express";
import database from "../utils/database";
import validateDataUser from "../middleware/checkIs";
import bcrypt from "bcrypt";

const router: Router = express.Router();

// Register
router.post("/register",validateDataUser, async (req: Request, res: Response) => {
  const {
    userName,
    passwordUser,
    passwordConfirm
  } = req.body;

  try {
    // Check if userName already exists
    let data = await database.execute(`SELECT * FROM shopee.users WHERE userName = ?`, [userName]);
    let existingUser:any = data[0]; 
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
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(passwordUser, salt);
      const hashedConfirm = await bcrypt.hash(passwordConfirm, salt);
      let statusUser = 1
      let insertData = await database.execute(
        `INSERT INTO shopee.users (userName, passwordUser, passwordConfirm, statusUser) VALUES (?, ?, ?, ?)`,
        [
          userName,
          hashed,
          hashedConfirm,
          statusUser,
        ]
      );
      res.json({
        status: "Success",
        insertData,
      });
    } catch (error:any) {
      res.status(500).json({
        error: error.message,
      });
    }
  } catch (error:any) {
    console.log("Select failed", error);
    return res.status(500).json({
      status: 500,
      message: "Select failed",
      error: error.message,
    });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  const { userName, passwordUser } = req.body;

  try {
    let data = await database.execute(`SELECT * FROM users WHERE userName = ?`, [userName]);
    let data1:any= data[0]
    if (data1.length === 0) {
      res.json({
        status: 201,
        message: "Tài khoản không tồn tại!",
      });
    } else {
      const user:any = data[0];
      bcrypt.compare(passwordUser, user[0].passwordUser, (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: err,
          });
        } else {
          if (!isMatch) {
            res.status(401).json({
              status: 401,
              message: "userName hoặc mật khẩu không đúng",
            });
          } else {
            res.status(200).json({
              status: 200,
              message: "Đăng nhập thành công!",
              data: user,
            });
          }
        }
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
