import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";
import "./ProfileUser.css";
import { Avatar, notification } from "antd";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  address: string;
  avatarURL: string;
  createdDate: string;
  image: string;
  nameOrder: string;
  orderId: number;
  phoneOrder: string;
  productId: number;
  quantityOrder: number;
  statusOrder: string;
  storeId: number;
  totalPrice: number;
  userId: number;
  productName: string;
  storeName: string;
};
const ProfileUser = () => {
  const [groupedOrders, setGroupedOrders] = useState<{
    [orderId: number]: Product[];
  }>({});
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Lấy chi tất cả những đơn hàng đã mua
  const getOrder = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/orderDetail/${flagUser.userId}`
      );

      const groupedData = data.data.message.reduce(
        (acc: { [orderId: number]: Product[] }, cart: Product) => {
          if (!acc[cart.orderId]) {
            acc[cart.orderId] = [];
          }
          acc[cart.orderId].push(cart);
          return acc;
        },
        {}
      );
      setGroupedOrders(groupedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  // Hàm xác nhận hủy đơn
  const handleCancel = async (id: number) => {
    let statusOrder = "cancel";
    try {
      let data = await axios.put(`http://localhost:5000/api/v1/order/${id}`, {
        statusOrder,
      });
      if (data.data.status === 200) {
        notification.success({
          message: "Hủy đơn hàng thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getOrder();
    } catch (error) {
      console.log();
    }
  };

  // Xác nhận hoàn thành đơn hàng
  const handleSuccess = async (id: number) => {
    let statusOrder = "success";
    try {
      let data = await axios.put(`http://localhost:5000/api/v1/order/${id}`, {
        statusOrder,
      });
      if (data.data.status === 200) {
        notification.success({
          message: "Xác nhận thành công!",
          placement: "top",
          duration: 2,
        });
      }
      getOrder();
    } catch (error) {
      console.log();
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
      <Navbar />
      <div className="container_profile">
        <div className="profile_left">
          <div className="avatar_left">
            <Avatar src={flagUser.avatarURL} className="avatarrr" size={50}>
              ĐN
            </Avatar>
            <div className="avatar_left1">
              <b>{flagUser.userName}</b>
              <div className="fix_profile">
                <CreateIcon style={{ fontSize: 18 }} />
                <p>Sửa Hồ Sơ</p>
              </div>
            </div>
          </div>
          <div className="down"></div>
          <div>
            <div className="option_profile">
              <img src="../assets/profile/1.png" alt="" height={20} />
              <p>Ưu Đãi Dành Riêng Cho Bạn</p>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/2.png" alt="" height={20} />
              <p>Thời Trang & Mỹ Phẩm</p>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/3.png" alt="" height={20} />
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                <p style={{ color: "black" }}>Tài Khoản Của Tôi</p>
              </NavLink>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/4.png" alt="" height={20} />
              <NavLink to="/donmua" style={{ textDecoration: "none" }}>
                <p>Đơn Mua</p>
              </NavLink>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/5.png" alt="" height={20} />
              <p>Thông Báo</p>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/6.png" alt="" height={20} />
              <p>Kho Voucher</p>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/7.png" alt="" height={20} />
              <p>Shopee Xu</p>
            </div>
          </div>
        </div>
        <div className="profile_right profile_right123">
          <div className="total_order">
            <h2> {Object.keys(groupedOrders).length} Đơn Hàng</h2>
          </div>
          {Object.keys(groupedOrders).map((orderId) => (
            <div className="header__all" key={orderId}>
              <div>
                <div className="header_donmua">
                  <div className="header_donmua1">
                    <p className="header_donmua1Like">Yêu thích +</p>
                    <h3 className="header_donmua1Shop">
                      {groupedOrders[Number(orderId)][0].storeName}
                    </h3>
                    <div className="header_donmua1Chat">
                      <MessageIcon style={{ fontSize: "0.9rem" }} /> <p>Chat</p>
                    </div>
                    <div className="header_donmua1View">
                      <StorefrontIcon style={{ fontSize: "0.9rem" }} />
                      <p>Xem Shop</p>
                    </div>
                  </div>
                  <div className="header_donmua2">
                    {groupedOrders[Number(orderId)][0].statusOrder ===
                    "pending" ? (
                      <div className="header_donmua2Ship">
                        <p>Chờ Xác Nhận Từ Shop</p>
                        <button
                          onClick={() =>
                            handleCancel(
                              groupedOrders[Number(orderId)][0].orderId
                            )
                          }
                        >
                          HỦY ĐƠN
                        </button>
                      </div>
                    ) : // <button
                    //   style={{ color: "rgb(238,77,45)", cursor: "pointer" }}
                    //   onClick={() =>
                    //     handleUpdate(groupedOrders[Number(orderId)][0].orderId)
                    //   }
                    // >
                    //   Chờ xác nhận
                    // </button>
                    groupedOrders[Number(orderId)][0].statusOrder ===
                      "delivering" ? (
                      <div className="header_donmua2Ship">
                        <LocalShippingOutlinedIcon
                          style={{ fontSize: "1.2rem" }}
                        />
                        <p>Đang Giao hàng</p>
                        <button
                          onClick={() =>
                            handleSuccess(
                              groupedOrders[Number(orderId)][0].orderId
                            )
                          }
                        >
                          Đã Nhận Hàng
                        </button>
                      </div>
                    ) : groupedOrders[Number(orderId)][0].statusOrder ===
                      "success" ? (
                      <div className="header_donmua2Ship">
                        <LocalShippingOutlinedIcon
                          style={{ fontSize: "1.2rem" }}
                        />
                        <p>Đơn hàng đã được giao thành công</p>
                        <button>HOÀN THÀNH</button>
                      </div>
                    ) : groupedOrders[Number(orderId)][0].statusOrder ===
                      "cancel" ? (
                      <div className="header_donmua2Ship">
                        <LocalShippingOutlinedIcon
                          style={{ fontSize: "1.2rem" }}
                        />
                        <p>Bạn đã hủy đơn hàng</p>
                        <button>Đã Hủy</button>
                      </div>
                    ) : (
                      groupedOrders[Number(orderId)][0].statusOrder
                    )}
                  </div>
                  {/* <div className="header_donmua2">
                    <div className="header_donmua2Ship">
                      <LocalShippingOutlinedIcon
                        style={{ fontSize: "1.2rem" }}
                      />
                      <p>Giao Thành Công</p>
                    </div>
                    <button>HOÀN THÀNH</button>
                  </div> */}
                </div>
                <div className="sanpham">
                  <div className="sanpham11111">
                    {groupedOrders[Number(orderId)].map((order: Product) => (
                      <div className="sanpham1" key={order.productId}>
                        <img src={order.image} alt="" width={70} />
                        <p>{order.productName}</p>
                      </div>
                    ))}
                  </div>
                  <div className="sanpham2">
                    <div className="thanhtien">
                      <GppGoodOutlinedIcon
                        style={{ color: "rgb(238, 77, 45)" }}
                      />
                      <p className="price___order1">Thành Tiền:</p>
                    </div>
                    <p className="price___order">
                      {" "}
                      {formatCurrency(
                        groupedOrders[Number(orderId)][0].totalPrice
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUser;
