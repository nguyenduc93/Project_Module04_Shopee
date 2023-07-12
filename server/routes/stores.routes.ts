
import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();

// Lấy dữ liệu bảng stores
router.get("/:id", async(req: Request, res: Response) =>{
    const userId = req.params.id
   try {
    let data = await database.execute(`SELECT * FROM shopee.stores WHERE userId = "${userId}"`);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});

// Thêm mới thông tin vào bảng stores
router.post("/", async(req: Request, res: Response) =>{
    const {phone, addressStore, storeName, userId} = req.body;
    let statusStore = 1;

  try {
    let response = await database.execute(`INSERT INTO shopee.stores (phone, addressStore, storeName, userId, statusStore) VALUES (?, ?, ?, ?, ?);`,[phone, addressStore, storeName, userId, statusStore]);
    res.status(200).json({
        status: 200,
        message: response
    })
  } catch (error) {
    console.log(error);
    
  }
})

export default router;