import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();

// Lấy dữ liệu sản phẩm của 1 cửa hàng
router.get("/:userId", async(req: Request, res: Response) =>{
    const {userId} = req.params
    try {
     let data = await database.execute(`SELECT * FROM products JOIN stores ON products.storeId = stores.storeId JOIN users ON stores.userId = users.userId JOIN (SELECT images.* FROM images INNER JOIN ( SELECT MIN(imageId) AS minImageId FROM images GROUP BY productId ) AS min_images ON images.imageId = min_images.minImageId) AS first_image ON products.productId = first_image.productId WHERE users.userId = ${userId};`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

export default router;