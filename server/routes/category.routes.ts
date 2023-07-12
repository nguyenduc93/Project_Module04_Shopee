import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();

// Lấy dữ liệu bảng categories
router.get("/", async(req: Request, res: Response) =>{

   try {
    let data = await database.execute(`SELECT * FROM shopee.categories`);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});
// Lấy dữ liệu bảng categories theo id products
router.get("/:id", async(req: Request, res: Response) =>{
    const productId = req.params.id
   try {
    let data = await database.execute(`SELECT categories.categoryName FROM categories JOIN products ON products.categoryId = categories.categoryId WHERE products.productId = ${productId}`);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});

// Lấy dữ liệu bảng categories theo id category
router.get("/user/:id", async(req: Request, res: Response) =>{
    const categoryId = req.params.id
   try {
    let data = await database.execute(`SELECT p.*, i.image, i.imageId, c.categoryId
    FROM categories c
    JOIN products p ON p.categoryId = c.categoryId
    JOIN images i ON p.productId = i.productId
    WHERE i.imageId = (
        SELECT MIN(imageId)
        FROM images
        WHERE productId = p.productId
    ) AND c.categoryId = ${categoryId};`);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});
export default router;