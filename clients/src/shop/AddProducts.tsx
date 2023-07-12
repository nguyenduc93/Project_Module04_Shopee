import "./shopproduct.css";
import HeaderOrder from "./HeaderOrder";
import ShopUser from "./ShopUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { notification } from "antd";

type category = {
  categoryId: number;
  categoryName: string;
};

const AddProducts = () => {
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState<File[]>([]);
  const [nameProduct, setNameProduct] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stores, setStores] = useState(Number);

  // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy dữ liệu bảng categories
  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/category");
      setCategory(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    handleStore();
  }, [stores]);

  // Lấy dữ liệu bảng stores về
  const handleStore = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/stores/${flagUser.userId}`
      );
      setStores(data.data.message[0].storeId);
    } catch (error) {
      console.log(error);
    }
  };

  // Thêm dữ liệu vào bảng products
  const handlePost = async () => {
    let storeId: number = stores;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/products",
        { nameProduct, categories, description, price, quantity, storeId }
      );
      if (response.data.status === "Success") {
        notification.success({
          message: "Thêm mới thành công!",
          placement: "top",
          duration: 2,
        });
        setDescription("");
        setNameProduct("");
        setQuantity("");
        setPrice("");
        setCategories("");
      }
      const productId = response.data.productId;
      // Hàm thêm ảnh vào bảng images
      try {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
        formData.append("productId", productId);
        await axios.post("http://localhost:5000/api/v1/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImages([]);
      } catch (error) {
        notification.error({
          message: "Thêm ảnh thất bại",
          placement: "top",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại!",
        placement: "top",
        duration: 2,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setImages([...images, ...fileArray]);
    }
  };

  return (
    <div>
      <HeaderOrder />
      <div className="container_shop">
        <ShopUser />
        <div className="container_right2">
          <h3>Thông tin cơ bản</h3>
          <div className="add_products">
            <table className="table">
              <tbody>
                <tr>
                  <td className="label">Hình ảnh sản phẩm</td>
                  <td className="label1">
                    <input
                      id="chonanh"
                      type="file"
                      style={{ border: "none", paddingTop: 10 }}
                      multiple
                      onChange={handleImageChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Tên sản phẩm</td>
                  <td className="label1">
                    <input
                      type="text"
                      placeholder="Nhập vào"
                      value={nameProduct}
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label">Ngành hàng</td>
                  <td className="label1">
                    <select
                      className="label3"
                      value={categories}
                      onChange={(e) => setCategories(e.target.value)}
                    >
                      <option value="">Chọn ngành hàng</option>
                      {category &&
                        category.map((categoryItem: category) => (
                          <option
                            value={categoryItem.categoryId}
                            key={categoryItem.categoryId}
                          >
                            {categoryItem.categoryName}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="label">Mô tả sản phẩm</td>
                  <td className="label1">
                    <textarea
                      className="textarea"
                      placeholder="Nhập mô tả"
                      name=""
                      id=""
                      cols={53}
                      rows={8}
                      style={{ resize: "none" }}
                      value={description}
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
                      value={quantity}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="label"></td>
                  <td className="label1">
                    <button onClick={handlePost}>Lưu & hiển thị</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
