import "./shopproduct.css";
import HeaderOrder from "./HeaderOrder";
import ShopUser from "./ShopUser";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";

type Product = {
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  storeId: number;
  image: string;
  statusproduct: number;
};
const ShopProducts = () => {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const showModal = (product: any) => {
    setSelectedProduct(product);
    setProductId(product.productId);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productId, setProductId] = useState("");

  // Lấy category
  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/category");
      setCategories(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  // Lấy user trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy dữ liệu sản phẩm của 1 cửa hàng
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/productStore/${flagUser.userId}`
      );
      setProducts(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Cập nhật lại thông tin sản phẩm
  const handleEdit = async () => {
    try {
      let response = await axios.put("http://localhost:5000/api/v1/products", {
        productName: productName || selectedProduct.productName,
        categoryId,
        description: description || selectedProduct.description,
        quantity: quantity || selectedProduct.quantity,
        price: price || selectedProduct.price,
        productId,
      });

      if (response.data.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công!",
          placement: "top",
          duration: 2,
        });
      }
      setIsModalOpen(false);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id: number) => {
    try {
      let data = await axios.delete(
        `http://localhost:5000/api/v1/products/${id}`
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Xóa sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right1">
          <div className="order_header">
            <h2 style={{ color: "black" }}>{products.length} Sản phẩm</h2>
            <div className="order_header2">
              <p style={{ color: "rgb(38,115,221)", cursor: "pointer" }}>
                Tối ưu sản phẩm
              </p>
              <p className="order_header5">Công cụ Xử lý hàng loạt</p>
              <div className="icon__shop">
                <ListOutlinedIcon style={{ color: "#ee4d2d" }} />
                <TuneOutlinedIcon />
              </div>
            </div>
          </div>
          <div className="order_table">
            <div className="name_order">Tên sản phẩm</div>
            <div className="sum_order">Giá</div>
            <div className="status_order">Kho hàng</div>
            <div className="active_order">Thao tác</div>
          </div>
          <div className="order_table3">
            {products?.map((product: Product, index) => (
              <div key={index}>
                {product.statusproduct === 1 ? (
                  <div className="order_table2">
                    <div className="name_order">
                      <div className="name_order1" style={{ paddingLeft: 20 }}>
                        <img src={product.image} alt="" width={80} />
                        <p>{product.productName}</p>
                      </div>
                    </div>
                    <div className="sum_order">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="status_order">{product.quantity}</div>
                    <div className="active_order" style={{ color: "#2673dd" }}>
                      <Button type="primary" onClick={() => showModal(product)}>
                        <CreateOutlinedIcon className="icon111" />
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => handleDelete(product.productId)}
                      >
                        <RestoreFromTrashOutlinedIcon className="icon111" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="order_table2 order_table2222">
                    <div className="name_order">
                      <div className="name_order1" style={{ paddingLeft: 20 }}>
                        <img src={product.image} alt="" width={80} />
                        <p>{product.productName}</p>
                      </div>
                    </div>
                    <div className="sum_order">
                      {formatCurrency(product.price)}
                    </div>
                    <div className="status_order">{product.quantity}</div>
                    <div className="active_order" style={{ color: "#2673dd" }}>
                      {/* <Button type="primary" onClick={() => showModal(product)}>
                      <CreateOutlinedIcon className="icon111" />
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handleDelete(product.productId)}
                    >
                      <RestoreFromTrashOutlinedIcon className="icon111" />
                    </Button> */}
                      Đã bị ẩn
                    </div>
                  </div>
                )}

                <hr />
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
      {selectedProduct && (
        <Modal
          title="Cập Nhật Lại Sản Phẩm"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="add_products" style={{ paddingLeft: 10 }}>
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <input
                      type="file"
                      style={{ border: "none", paddingTop: 10 }}
                      multiple
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Tên sản phẩm</td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      value={productName || selectedProduct.productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {categories.map((category: any) => (
                        <option
                          value={category.categoryId}
                          key={category.categoryId}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      value={description || selectedProduct.description}
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td className="label">Số lượng</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập số lượng"
                      value={quantity || selectedProduct.quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Giá sản phẩm</td>
                  <td className="label1">
                    <input
                      type="number"
                      placeholder="Nhập giá sản phẩm"
                      value={price || selectedProduct.price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handleEdit}>Cập nhật</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShopProducts;
