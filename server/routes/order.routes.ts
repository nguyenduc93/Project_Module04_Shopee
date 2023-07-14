import express, { Request, Response, Router } from "express";
import database from "../utils/database";
import moment from "moment-timezone"

const router: Router = express.Router();
router.post("/", async (req: Request, res: Response) => {
    const createdDate:string = moment()
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");
    const { address, phoneOrder, nameOrder, totalPrice, userId,storeId } = req.body;
    
    const statusOrder = "pending";
    
    try {
      // Thực hiện câu lệnh SQL để lưu thông tin sản phẩm vào CSDL
      let insertData = await database.execute(
        `INSERT INTO shopee.orders (address, phoneOrder, nameOrder,createdDate, statusOrder, totalPrice,storeId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [address, phoneOrder, nameOrder, createdDate, statusOrder, totalPrice,storeId, userId]
      ) as any;  
      const orderId = insertData[0].insertId

      res.json({
        status: "Success",
        orderId,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: "Failed",
        error: error.message,
      });
    }
  });

  //Tất cả Đơn hàng của 1 stores
  router.get("/:id", async(req: Request, res: Response) =>{
    const storeId = req.params.id
    
    try {
     let data = await database.execute(`
     SELECT orders.*, first_image.image, orderDetail.quantityOrder,orderDetail.productId, users.avatarURL, products.productName, users.userName
FROM stores
JOIN orders ON stores.storeId = orders.storeId
JOIN orderDetail ON orderDetail.orderId = orders.orderId
JOIN products ON products.productId = orderDetail.productId
JOIN (
  SELECT images.*
  FROM images
  INNER JOIN (
    SELECT MIN(imageId) AS minImageId, productId
    FROM images
    GROUP BY productId
  ) AS min_images ON images.imageId = min_images.minImageId
) AS first_image ON products.productId = first_image.productId
JOIN users ON orders.userId = users.userId
WHERE stores.storeId = ${storeId} ORDER BY createdDate DESC;
     `);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

//  Cập nhật lại trạng thái đơn hàng
router.put("/:id", async(req: Request, res: Response)=>{
  const  orderId  = req.params.id
  const {statusOrder} = req.body
  try {
    let data = await database.execute(`UPDATE shopee.orders SET statusOrder = ? WHERE orderId = ${orderId}`,
    [ statusOrder ])
    
    res.status(200).json({
      status: 200,
      data
    })
  } catch (error) {
    console.log(error);
  }
})

export default router;