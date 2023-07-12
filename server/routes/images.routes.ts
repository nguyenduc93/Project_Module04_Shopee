import express, { Request, Response, Router } from "express";
import database from "../utils/database";

const router: Router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    // Lưu file vào thư mục public/images
    cb(null, "./public/images");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    // Lấy phần tử sau dấu chấm của tên file
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
   
  },
});

// Giới hạn kích thước file upload là 10MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("images", 5); // "images" là tên trường cho các hình ảnh, và 5 là số lượng tối đa các tệp được phép tải lên

router.post("/", async (req: Request, res: Response) => {
    upload(req, res, async function (err: any) {
        const images = (req.files as Express.Multer.File[]).map(
            (file: Express.Multer.File) => `http://localhost:5000/images/${file.filename}`
            );

      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          message: "Failed to upload",
          error: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          message: "Failed to upload",
          error: err.message,
        });
      }
  

      const {productId} = req.body;
      
      try {     
        for (let i = 0; i < images.length; i++) {
          // Thực hiện câu lệnh SQL để lưu URL của ảnh vào bảng images
          await database.execute(
            `INSERT INTO shopee.images (image, productId) VALUES (?, ?)`,
            [images[i], productId]
          );
        }
  
        res.json({
          status: "Success",
        });
      } catch (error: any) {
        console.log("Insert failed", error);
        return res.status(500).json({
          status: 500,
          message: "Failed",
          error: error.message,
        });
      }
    });
  });
  

  // Lấy ảnh theo productId
  router.get("/:id", async(req: Request, res: Response) =>{
    const productId = req.params.id
    try {
     let data = await database.execute(`SELECT * FROM images WHERE images.productId = ${productId};`);
     res.status(200).json({
         status: 200,
         message: data[0]
     })
    } catch (error) {
     console.log(error);  
    }
 });

export default router;
