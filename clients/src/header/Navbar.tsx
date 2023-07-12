import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Button, Dropdown, notification } from "antd";
import { Avatar } from "antd";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type Product = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  quantityCart: number;
  image: string;
  storeName: string;
  storeId: number;
  userId: number;
  quantitySold: number;
};

type Stores = {
  statusStore: number;
};

const Navbar = () => {
  const [stores, setStores] = useState<Stores[]>([]);
  const [addressStore, setAddressStore] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [carts, setCarts] = useState<Product[]>([]);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // end modal

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    navigate("/dangnhap");
  };

  // Lấy dữ liệu bảng stores về
  const handleStore = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/stores/${flagUser.userId}`
      );
      setStores(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleStore();
  }, []);

  // Post thông tin vào bảng stores
  const handleStores = async () => {
    let userId = flagUser.userId;
    try {
      let data = await axios.post("http://localhost:5000/api/v1/stores", {
        phone,
        addressStore,
        storeName,
        userId,
      });
      if (data.data.status === 200) {
        notification.success({
          message: "Đăng ký thành công!",
          placement: "top",
          duration: 2,
        });
        setTimeout(() => {
          navigate("/danhsachsanpham");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy giá trị query hàm search
  const [search, setSearch] = useState<string | null>("");
  const handleSearch = () => {
    navigate(`/search-product?key=${search}`);
  };

  // Lấy dữ liệu giỏ hàng
  const getCart = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/cart/${flagUser.userId}`
      );
      setCarts(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // Thông báo cửa hàng bị khóa
  const handleAlertStores = () => {
    notification.error({
      message: "Cửa hàng bị khóa, liên hệ với admin!",
      placement: "top",
      duration: 2,
    });
  };

  useEffect(() => {
    getCart();
  }, [carts.length]);

  return (
    <div className="header">
      {/* header */}
      <header>
        <div className="grid wide">
          {/* navbar */}
          <nav className="header__navbar hide-on-mobile-tablet">
            <ul className="header__nav-list">
              {stores.length > 0 && stores[0].statusStore === 1 ? (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <NavLink
                    to={"/danhsachsanpham"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Kênh Người Bán
                  </NavLink>
                </li>
              ) : stores.length > 0 && stores[0].statusStore === 2 ? (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <p onClick={handleAlertStores}>Kênh Người Bán</p>
                </li>
              ) : (
                <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
                  <div className="muahang">
                    {/* <button>Mua Hàng</button> */}
                    <>
                      <button onClick={showModal} style={{ padding: 0 }}>
                        Kênh Người Bán
                      </button>
                      <Modal
                        title="Tạo Mới Thông Tin Cửa Hàng"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={""}
                      >
                        <table className="table">
                          <tbody>
                            <tr>
                              <td className="label">Tên cửa hàng</td>
                              <td className="label1">
                                <input
                                  type="text"
                                  onChange={(e) => setStoreName(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Số điện thoại</td>
                              <td className="label1">
                                <input
                                  type="text"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Địa chỉ</td>
                              <td className="label1">
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    setAddressStore(e.target.value)
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="label"></td>
                              <td className="label1">
                                <button onClick={handleStores}>Tạo</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Modal>
                    </>
                  </div>
                </li>
              )}
              {/* <li className="header__nav-item header__nav-item--hover header__nav-item--separate">
            Trở thành Người bán Shopee
          </li> */}
              <li className="header__nav-item header__nav-item--hover header__nav-item--separate header__show-qr">
                Tải ứng dụng
              </li>
              <li className="header__nav-item">
                Kết nối
                <a href="#" className="header__nav-icon-link">
                  <i className="header__nav-icon fab fa-facebook" />
                </a>
                <a href="#" className="header__nav-icon-link">
                  <i className="header__nav-icon fab fa-instagram" />
                </a>
              </li>
            </ul>
            <ul className="header__nav-list">
              <li className="header__nav-item header__show-note">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon far fa-bell" />
                  Thông Báo
                </a>
              </li>
              <li className="header__nav-item">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon far fa-question-circle" />
                  Hỗ Trợ
                </a>
              </li>
              <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                <a href="#" className="header__nav-item-link">
                  <i className="header__nav-icon fa-solid fa-globe"></i>
                  Tiếng Việt
                </a>
              </li>
              {flagUser ? (
                <>
                  {flagUser.statusUser === 0 && (
                    <li className="header__nav-item header__nav-item--bold">
                      <NavLink
                        to={"/admin/users"}
                        className="header__nav-item-link"
                      >
                        Admin
                      </NavLink>
                    </li>
                  )}
                  <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <NavLink
                                to={"/profile"}
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 10,
                                }}
                              >
                                <NoteAltOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Tài Khoản
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "2",
                            label: (
                              <NavLink
                                to={"/donmua"}
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <ShoppingBagOutlinedIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                >
                                  Đơn Mua
                                </button>
                              </NavLink>
                            ),
                          },
                          {
                            key: "3",
                            label: (
                              <div
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  gap: 15,
                                }}
                              >
                                <LogoutIcon />
                                <button
                                  style={{
                                    color: "black",
                                    background: "none",
                                    border: "none",
                                    fontSize: "1rem",
                                  }}
                                  onClick={handleButton}
                                >
                                  Đăng Xuất
                                </button>
                              </div>
                            ),
                          },
                        ],
                      }}
                      placement="bottom"
                      arrow
                    >
                      <Button className="avatar__order">
                        {" "}
                        <Avatar
                          src={flagUser.avatarURL}
                          className="avatarrr"
                          size={25}
                        >
                          ĐN
                        </Avatar>
                        <span style={{ color: "#FDFFFF" }}>
                          {flagUser.userName}
                        </span>{" "}
                      </Button>
                    </Dropdown>
                  </li>
                </>
              ) : (
                <>
                  <li className="header__nav-item header__nav-item--bold header__nav-item--separate">
                    <NavLink to={"/dangky"} className="header__nav-item-link">
                      Đăng ký
                    </NavLink>
                  </li>
                  <li className="header__nav-item header__nav-item--bold">
                    <NavLink to={"/dangnhap"} className="header__nav-item-link">
                      Đăng nhập
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* search */}
          <div className="header__contain">
            <div className="header__logo">
              <NavLink to={"/"} className="header__logo-link">
                <img
                  src="../assets/logo-full-white.png"
                  className="header__logo-img"
                />
              </NavLink>
            </div>
            <div className="header__search">
              <div className="header__search-input-wrap">
                <input
                  type="text"
                  className="header__search-input"
                  placeholder="SĂN VOUCHER 1 TRIỆU ĐỒNG"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <button className="btn header__search-btn" onClick={handleSearch}>
                <i className="header__search-btn-icon fas fa-search" />
              </button>
            </div>
            <div className="header__cart header__cart--has-cart">
              <NavLink to={"/cart"}>
                {" "}
                <ShoppingCartOutlinedIcon
                  className="header__cart-icon fas fa-shopping-cart"
                  style={{ fontSize: "2.2rem" }}
                />
              </NavLink>
              <span className="span_cartCount">{carts.length}</span>
            </div>
          </div>
        </div>
        <div className="hagtag">
          <ul>
            <a>
              <li>Áo Thể Thao Nam</li>
            </a>
            <li>Áo Polo Nam</li>
            <li>Quần Đùi Nam</li>
            <li>Đồ Chơi Người Lớn 18+</li>
            <li>Dép Nam</li>
            <li>Áo Thể Thao Nam</li>
            <li>Bóng Đá</li>
            <li>Thuốc Mê</li>
            <li>Điện Thoại 1k</li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
