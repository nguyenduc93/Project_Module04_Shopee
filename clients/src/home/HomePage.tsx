import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import "./homepage.css";
import CategoryHome from "./CategoryHome";
import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const { Meta } = Card;
type Product = {
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  storeId: number;
  image: string;
  quantitySold: number;
};

const HomePage = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const sliderStyle = {
    padding: "30px 10px 0 30px",
    borderRadius: "4px",
    maxWidth: "64%",
  };

  const slideStyle = {
    width: "100%",
    maxHeight: 300,
    minHeight: 300,
    Position: "relative",
    cursor: "pointer",
  };

  // Lấy dữ liệu của tất cả products
  const [products, setProducts] = useState([]);
  const handleProducts = async () => {
    try {
      let response = await axios.get("http://localhost:5000/api/v1/products");
      setProducts(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value: any) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <>
      {" "}
      <Navbar />
      {/* Carousel */}
      <div style={slideStyle}>
        <div style={sliderStyle}>
          <div>
            <Slider {...settings}>
              <img src="../assets/slide/1.png" alt="" />
              <img src="../assets/slide/2.png" alt="" />
              <img src="../assets/slide/3.jpg" alt="" />
              <img src="../assets/slide/4.png" alt="" />
              <img src="../assets/slide/5.png" alt="" />
            </Slider>
          </div>
        </div>
        <div
          style={{
            padding: "30px 15px 0 0",
            zIndex: 10,
            float: "right",
            position: "absolute",
            top: 132,
            right: 10,
          }}
        >
          <div>
            <img height={132.5} src="../assets/slide/7.png" alt="Hình 6" />
          </div>
          <div>
            <img height={132.5} src="../assets/slide/6.png" alt="Hình 7" />
          </div>
        </div>
      </div>
      {/* service */}
      <div className="service_home">
        <div className="service_home1">
          <img height={50} src="../assets/service/1.png" alt="" />
          <p>Khung Giờ Săn Sale</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/2.png" alt="" />
          <p>Miễn Phí Vận Chuyển</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/3.png" alt="" />
          <p>Voucher Giảm Đến 200.000Đ</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/4.png" alt="" />
          <p>Hàng Hiệu Outlet giảm 50%</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/5.png" alt="" />
          <p>Mã Giảm Giá</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/6.png" alt="" />
          <p>Bắt Trend - Giá Sốc</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/7.png" alt="" />
          <p>Nạp Thẻ, Dịch Vụ & Data</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/8.png" alt="" />
          <p>Trúng Voucher 1.000.000Đ</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/9.png" alt="" />
          <p>Hàng Quốc Tế</p>
        </div>
        <div className="service_home1">
          <img height={50} src="../assets/service/10.png" alt="" />
          <p>Gì Cũng Rẻ - Mua Là Freeship</p>
        </div>
      </div>
      <div className="category__home">
        {/* Danh Mục Sản Phẩm */}
        <CategoryHome />
        <div className="category__home1">
          <img src="../assets/slide/8.png" alt="" />
        </div>

        {/* Top tìm kiếm */}
        <div className="top_search">
          <div className="top__search">
            <p>TÌM KIẾM HÀNG ĐẦU</p>
            <p>Xem tất cả </p>
          </div>{" "}
          <hr />
          <ul className="top_search1">
            <li>
              <span>
                {" "}
                <img src="../assets/buy/15.png" alt="" height={40} />
              </span>
              <img src="../assets/buy/10.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Áo Thun Polo Nam Ngắn Tay</p>
            </li>
            <li>
              {" "}
              <img src="../assets/buy/15.png" alt="" height={40} />
              <img src="../assets/buy/11.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Quần Thể Thao Nam </p>
            </li>
            <li>
              {" "}
              <img src="../assets/buy/15.png" alt="" height={40} />
              <img src="../assets/buy/12.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Áo Thể Thao Nam</p>
            </li>
            <li>
              {" "}
              <img src="../assets/buy/15.png" alt="" height={40} />
              <img src="../assets/buy/13.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Áo Thun Nam Có Cổ</p>
            </li>
            <li>
              {" "}
              <img src="../assets/buy/15.png" alt="" height={40} />
              <img src="../assets/buy/14.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Quần Đùi Nam</p>
            </li>
            <li>
              {" "}
              <div>
                {" "}
                <img src="../assets/buy/15.png" alt="" height={40} />
              </div>
              <img src="../assets/buy/10.jpg" alt="" height={200} />
              <span className="buy_search">Bán 50k+ / tháng</span>
              <p>Dép Nam Quai Ngang</p>
            </li>
          </ul>
        </div>

        {/* Gợi ý hôm nay */}
        <div className="sub_today">
          <p>GỢI Ý HÔM NAY</p>
          <div className="cart_today">
            {products &&
              products.map((product: Product, index) => (
                <div key={index}>
                  <NavLink
                    to={`/chitiet/${product.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      hoverable
                      style={{ width: 220 }}
                      cover={
                        <img height={250} alt="example" src={product.image} />
                      }
                    >
                      <Meta
                        title={product.productName}
                        description={
                          <div className="price__description">
                            <div className="price__description1">
                              {formatCurrency(product.price)}
                            </div>
                            <div className="price__description2">
                              {" "}
                              Đã bán {product.quantitySold}
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </NavLink>
                </div>
              ))}
          </div>
        </div>
        <div className="end"></div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;