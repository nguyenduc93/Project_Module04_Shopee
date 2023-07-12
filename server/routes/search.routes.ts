import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();

router.get("/", async(req: Request, res: Response) =>{
    const {key} = req.query
    
   try {
    let data = await database.execute(`SELECT p.*, i.image, i.imageId FROM products p JOIN images i ON p.productId = i.productId WHERE i.imageId = (SELECT MIN(imageId) FROM images WHERE productId = p.productId) AND productName LIKE ?;`, [`%${key}%`]);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});


export default router;