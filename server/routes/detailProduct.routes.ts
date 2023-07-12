import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();
// Lấy dữ liệu sản phẩm của 1 cửa hàng
router.get("/:id", async(req: Request, res: Response) =>{
    const productId = req.params.id
    try {
     let data = await database.execute(`SELECT * FROM products WHERE products.productId = ${productId};`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

export default router;