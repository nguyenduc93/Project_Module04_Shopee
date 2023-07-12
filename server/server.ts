import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes";
import profileRoutes from "./routes/profile.routes";
import storeRoutes from "./routes/stores.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/products.routes";
import imageRoutes from "./routes/images.routes";
import productStoreRoutes from "./routes/productStore.routes";
import detailProductRoutes from "./routes/detailProduct.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import orderDetailRoutes from "./routes/orderDetail.routes";
import commentRoutes from "./routes/comments.routes";
import searchRoutes from "./routes/search.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));

server.use("/api/v1/users", userRoutes);
server.use("/api/v1/profile", profileRoutes);
server.use("/api/v1/stores", storeRoutes);
server.use("/api/v1/category", categoryRoutes);
server.use("/api/v1/products", productRoutes);
server.use("/api/v1/images", imageRoutes);
server.use("/api/v1/productStore", productStoreRoutes);
server.use("/api/v1/detailProduct", detailProductRoutes);
server.use("/api/v1/order", orderRoutes);
server.use("/api/v1/cart", cartRoutes);
server.use("/api/v1/orderDetail", orderDetailRoutes);
server.use("/api/v1/comments", commentRoutes);
server.use("/api/v1/search", searchRoutes);
server.use("/api/v1/admin", adminRoutes);

server.listen(PORT
  , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
