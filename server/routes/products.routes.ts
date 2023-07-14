import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {
    const { nameProduct, categories, description, price, quantity, storeId } = req.body;
    let quantitySold = 0;
    let statusproduct = 1;
    try {
      // Thực hiện câu lệnh SQL để lưu thông tin sản phẩm vào CSDL
      let insertData = await database.execute(
        `INSERT INTO products (productName, categoryId, description, price, quantity, storeId, quantitySold, statusproduct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nameProduct, categories, description, price, quantity, storeId, quantitySold, statusproduct]
      ) as any;  
      const productId = insertData[0].insertId

      res.json({
        status: "Success",
        productId,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Failed",
        error: error.message,
      });
    }
  });

  // Cập nhật lại danh sách sản phẩm
router.put("/", async(req: Request, res: Response)=>{
  const { productName, categoryId, description, price, quantity, productId } = req.body;
  try {
    let data = await database.execute(`UPDATE shopee.products SET productName = ?, categoryId = ?, description = ?, price = ?, quantity = ? WHERE productId = ?`,
    [ productName, categoryId, description, price, quantity, productId])
    
    res.status(200).json({
      status: 200,
      data
    })
  } catch (error) {
    console.log(error);
  }
})

  // Delete sản phẩm
  router.delete("/:id", async(req: Request, res: Response)=>{
    const productId = req.params.id
    try {
      let data = await database.execute(`DELETE FROM shopee.products WHERE (productId = ${productId});`);
      res.status(200).json({
        status: 200,
        message: data
      })
    } catch (error) {
      res.json({
        status: 500
      } )
    }
  })

  // Lấy dữ liệu của tất cả products
  router.get("/", async(req: Request, res: Response) =>{
    try {
     let data = await database.execute(`SELECT p.*, i.image, i.imageId FROM products p JOIN images i ON p.productId = i.productId WHERE i.imageId = (SELECT MIN(imageId) FROM images WHERE productId = p.productId) AND p.statusproduct = 1;`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

   // Cập nhật lại số lượng sản phẩm
router.put("/:id", async(req: Request, res: Response)=>{
  const  productId  = req.params.id
  const {quantity} = req.body
  try {
    let data = await database.execute(`UPDATE shopee.products SET quantity = ? WHERE productId = ${productId}`,
    [ quantity ])
    
    res.status(200).json({
      status: 200,
      data
    })
  } catch (error) {
    console.log(error);
  }
})

   // Cập nhật lại số lượng sản phẩm đã bán
   router.put("/buy/:id", async(req: Request, res: Response)=>{
    const  productId  = req.params.id
    const {quantitySold} = req.body
    try {
      let data = await database.execute(`UPDATE shopee.products SET quantitySold = ? WHERE productId = ${productId}`,
      [ quantitySold ])
      
      res.status(200).json({
        status: 200,
        data
      })
    } catch (error) {
      console.log(error);
    }
  })

export default router;
