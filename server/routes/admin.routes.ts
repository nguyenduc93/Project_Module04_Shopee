import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();

// Lấy toàn bộ users
router.get("/users", async(req: Request, res: Response) =>{
   try {
    let data = await database.execute(`SELECT * FROM users ;`);
    res.status(200).json({
        status: 200,
        message: data[0]
    })
   } catch (error) {
    console.log(error);  
   }
});

// Khóa và mở tài khoản user
router.put("/users/:id", async(req: Request, res: Response) =>{
    const {id} = req.params
    const {statusUser} = req.body
    try {
     let data = await database.execute(`UPDATE shopee.users SET statusUser = ? WHERE userId = ?;`, [statusUser,id]);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

//  Lấy toàn bộ danh sách cửa hàng
router.get("/shop", async(req: Request, res: Response) =>{
    try {
     let data = await database.execute(`SELECT * FROM stores ;`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

 // Khóa và mở tài khoản stores
router.put("/shop/:id", async(req: Request, res: Response) =>{
    const {id} = req.params
    const {statusStore} = req.body
    
    try {
     let data = await database.execute(`UPDATE shopee.stores SET statusStore = ? WHERE storeId = ?;`, [statusStore,id]);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

//  Lấy toàn bộ products của tất cả stores
router.get("/products", async(req: Request, res: Response) =>{
    try {
     let data = await database.execute(`SELECT p.*, i.image, i.imageId, s.*, u.avatarURL FROM products p JOIN stores s ON p.storeId = s.storeId JOIN users u ON u.userId = s.userId JOIN images i ON p.productId = i.productId WHERE i.imageId = (SELECT MIN(imageId) FROM images WHERE productId = p.productId);`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

  // Khóa và mở sản phẩm
router.put("/products/:productId/:storeId", async(req: Request, res: Response) =>{
    const {productId} = req.params
    const {storeId} = req.params
    const {statusproduct} = req.body
    
    try {
     let data = await database.execute(`UPDATE shopee.products SET statusproduct = ? WHERE productId = ? AND storeId = ?;`, [statusproduct,productId, storeId]);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });
export default router;
