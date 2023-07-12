import { Avatar, notification } from "antd";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  avatarURL: string;
  storeName: string;
  image: string;
  productId: number;
  storeId: number;
  userId: number;
  productName: string;
  statusproduct: number;
};

const ProductsAdmin = () => {
  const [groupedOrders, setGroupedOrders] = useState<{
    [storeId: number]: Product[];
  }>({});
  const [products, setProducts] = useState<Product[]>([]);

  const flaguserJSON = localStorage.getItem("user");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.statusUser != 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);

  // Lấy tất cả sản phẩm
  const getProducts = async () => {
    try {
      let data = await axios.get(`http://localhost:5000/api/v1/admin/products`);

      setProducts(data.data.message);
      const groupedData = data.data.message.reduce(
        (acc: { [storeId: number]: Product[] }, cart: Product) => {
          if (!acc[cart.storeId]) {
            acc[cart.storeId] = [];
          }
          acc[cart.storeId].push(cart);
          return acc;
        },
        {}
      );
      setGroupedOrders(groupedData);
    } catch (error) {
      console.log(error);
    }
  };

  // Ẩn sản phẩm
  const handleLock = async (productId: number, storeId: number) => {
    let statusproduct = 2;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/products/${productId}/${storeId}`,
        {
          statusproduct,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Đã ẩn sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Mở Ẩn sản phẩm
  const handleUnLock = async (productId: number, storeId: number) => {
    let statusproduct = 1;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/products/${productId}/${storeId}`,
        {
          statusproduct,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Đã mở sản phẩm thành công!",
          placement: "top",
          duration: 2,
        });
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="container_right1">
          <div className="order_header">
            <h3 style={{ color: "black" }}>
              {products && products.length} Sản phẩm
            </h3>
          </div>
          <div className="order_table">
            <div className="name_order3">Sản phẩm</div>
            <div className="sum_order1">Tên sản phẩm</div>
            <div className="active_order1">Trạng thái</div>
            <div className="active_order10">Hành động</div>
          </div>

          {Object.keys(groupedOrders).map((storeId) => (
            <div className="order_table1" key={storeId}>
              <div className="order_name">
                <Avatar
                  src={groupedOrders[Number(storeId)][0].avatarURL}
                  className="avatarrr"
                  size={35}
                >
                  ĐN
                </Avatar>
                <p style={{ color: "black", cursor: "pointer" }}>
                  {groupedOrders[Number(storeId)][0].storeName}
                </p>
              </div>
              {groupedOrders[Number(storeId)].map((store: Product) => (
                <div
                  className="order_table2 products_table2"
                  key={store.productId}
                >
                  <div className="name_order3">
                    <img src={store.image} alt="123" width={70} />
                  </div>
                  <div className="sum_order1">{store.productName}</div>
                  {store.statusproduct === 1 ? (
                    <>
                      <div className="active_order1">
                        <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                          Đang hoạt động
                        </p>
                      </div>
                      <div className="active_order10 active_order11">
                        <p
                          onClick={() =>
                            handleLock(store.productId, store.storeId)
                          }
                        >
                          Ẩn sản phẩm
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="active_order1">
                        <p style={{ padding: 0, color: "rgb(38, 115, 221)" }}>
                          Ngừng hoạt động
                        </p>
                      </div>
                      <div className="active_order10 active_order11">
                        <p
                          onClick={() =>
                            handleUnLock(store.productId, store.storeId)
                          }
                        >
                          Mở sản phẩm
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
