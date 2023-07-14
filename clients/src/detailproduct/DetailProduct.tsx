import "./DetailProduct.css";
import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { Avatar, notification } from "antd";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Rate } from "antd";

type Product = {
  productId: number;
  productName: string;
  price: number;
  description: string;
  quantity: number;
  categoryId: number;
  storeId: number;
  image: string;
  categoryName: string;
  userId: number;
  statusOrder: string;
  quantitySold: number;
};

type Comment = {
  avatarURL: string;
  contents: string;
  createDate: string;
  rate: Number;
  userName: string;
};
const DetailProduct = () => {
  // Lấy dữ liệu user lưu trên local
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;

  const [products, setProducts] = useState<Partial<Product>>({});
  const [images, setImages] = useState<Product[]>([]);
  const [category, setCategory] = useState<Partial<Product>>({});
  const [quantityCart, setQuantity] = useState(1);
  const [Stores, setStores] = useState<Partial<Product>>({});
  const [status, setStatus] = useState<Product[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(5);
  const [allcomments, setAllcomments] = useState<Comment[]>([]);

  const { id } = useParams();

  // Lấy chi tiết id của stores so sánh với id đang đăng nhập
  const getStores = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/stores/user/${id}`
      );
      setStores(data.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy chi tiết 1 product
  const getProduct = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/detailProduct/${id}`
      );
      setProducts(data.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy ảnh theo id products
  const getImages = async () => {
    try {
      let data = await axios.get(`http://localhost:5000/api/v1/images/${id}`);
      setImages(data.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  // Lấy category theo id products
  const getCategory = async () => {
    try {
      let data = await axios.get(`http://localhost:5000/api/v1/category/${id}`);
      setCategory(data.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Tăng giảm số lượng
  const decreaseQuantity = () => {
    if (quantityCart > 1) {
      setQuantity(quantityCart - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantityCart + 1);
  };

  // Thêm sản phẩm vào cart
  let userId = flagUser?.userId;
  let productId = id;
  const handleButton = async () => {
    let response = await axios.post("http://localhost:5000/api/v1/cart", {
      quantityCart,
      userId,
      productId,
    });
    if (response.data.status === "Success") {
      notification.success({
        message: "Sản phẩm đã thêm vào Giỏ hàng!",
        placement: "top",
        duration: 2,
      });
    }
  };

  // Hàm lấy trạng thái đơn hàng để bình luận
  const getStatus = async () => {
    try {
      let data = await axios.get(
        `http://localhost:5000/api/v1/comments/${userId}/${id}`
      );
      setStatus(data.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Thêm bình luận
  const postRatingAndComment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/comments",
        {
          rate: rating,
          contents: commentContent,
          userId: flagUser.userId,
          productId: id,
        }
      );
      if (response.data.status === 200) {
        notification.success({
          message: "Bình luận thành công!",
          placement: "top",
          duration: 2,
        });
        setCommentContent("");
        getComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy toàn bộ comments về để map
  const getComments = async () => {
    try {
      let data = await axios.get(`http://localhost:5000/api/v1/comments/${id}`);
      setAllcomments(data.data.message[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm tính trung bình rate
  const calculateAverageRating = (ratings: Comment[]) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce(
      (sum: number, rate: any) => sum + rate.rate,
      0
    );
    const averageRating = totalRating / ratings.length;
    return averageRating;
  };

  const averageRating = calculateAverageRating(allcomments);

  // Hàm nếu là sản phẩm của shop thì không đc mua
  const handleAddStore = () => {
    notification.error({
      message: "Không được mua sản phẩm của mình!",
      placement: "top",
      duration: 2,
    });
  };

  // Sử dụng useEffect
  useEffect(() => {
    getProduct();
    getImages();
    getCategory();
    getStores();
    getStatus();
    getComments();
  }, []);
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
      <div className="container_detail">
        <div className="detail_hearder">
          <p>Shopee</p>
          <ChevronRightIcon />
          <p>{category && category.categoryName}</p>
        </div>
        <div className="detail_main">
          <div className="detail_letf">
            <div className="image_detailPr">
              <img
                src={images[0]?.image}
                alt=""
                width={475}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="image_detailPr1">
              {images &&
                images.map((image, index) => (
                  <div key={index}>
                    {" "}
                    <img src={image.image} alt="" width={90} />
                  </div>
                ))}
            </div>
            <div className="icon_detail">
              <p>Chia sẻ:</p>
              <img src="../assets/done/3.png" alt="" width={26} height={26} />
              <img src="../assets/done/4.png" alt="" width={22} height={22} />
              <img src="../assets/done/5.png" alt="" width={42} />
              <img src="../assets/done/2.png" alt="" width={25} />
              <div className="like_detail">
                <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                <p>Đã thích (8k)</p>
              </div>
            </div>
          </div>
          <div className="detail_right">
            <div className="content_detail">
              <p>
                {" "}
                <span className="span1">Yêu Thích +</span>{" "}
                <span style={{ fontSize: "1.425rem" }}>
                  {products.productName}
                </span>
              </p>
              <div className="danhgia">
                <div className="danhgia1">
                  <div className="rate">
                    {!averageRating ? (
                      <p>Chưa có đánh giá</p>
                    ) : (
                      <>
                        <span>{Math.round(averageRating)}</span>
                        <Rate
                          allowHalf
                          value={averageRating}
                          style={{ color: "#ee4d2d" }}
                        />
                      </>
                    )}
                  </div>
                  <p>
                    {allcomments.length}{" "}
                    <span style={{ color: "#767676" }}>Đánh Giá</span>
                  </p>
                  <p>
                    {products.quantitySold}{" "}
                    <span style={{ color: "#767676" }}>Đã Bán</span>
                  </p>
                </div>
                <p
                  style={{
                    marginRight: 40,
                    cursor: "pointer",
                    color: "#767676",
                  }}
                >
                  Tố cáo
                </p>
              </div>
            </div>
            <div className="price_detail">
              <span>Giá không đổi:</span>
              <span className="price_detail1">
                {" "}
                {formatCurrency(products.price)}
              </span>
              <div className="price_detail2">
                <p style={{ color: "#ee4d2d", fontSize: ".975rem" }}>
                  Gì Cũng Rẻ
                </p>
                <p style={{ color: "rgba(0,0,0,.54)", fontSize: ".85rem" }}>
                  Giá tốt nhất so với các sản phẩm cùng loại trên Shopee
                </p>
              </div>
            </div>
            <div className="insurance">
              <p style={{ color: "#757575", cursor: "pointer" }}>Bảo Hiểm</p>
              <p>
                Bảo hiểm Thời trang <span className="span2">Mới</span>
              </p>
              <p style={{ color: "#08f", cursor: "pointer" }}>Tìm hiểu thêm</p>
            </div>

            <div className="ship_detail">
              <div className="detail_ship">Vận Chuyển</div>
              <div>
                <div className="ship_detail2">
                  <div className="ship_detail1">
                    <img src="../assets/ship/10.png" alt="" height={20} />
                    <p> Miễn phí vận chuyển</p>
                  </div>
                  <span className="span3">
                    Miễn phí vận chuyển cho đơn hàng trên ₫99.000
                  </span>
                  <div className="ship_detail1" style={{ marginTop: 10 }}>
                    <img src="../assets/ship/10.png" alt="" height={20} />
                    <p> Vận chuyển tới</p>
                    <p style={{ marginLeft: 20 }}> Trung Kính, Cầu Giấy</p>
                  </div>
                  <span className="span3">Phí vận chuyển: ₫100.000</span>
                </div>
              </div>
            </div>
            <div className="prire__detail">
              <p> Số Lượng</p>
              <div className="buttons_added">
                <button className="minus is-form" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  aria-label="quantity"
                  className="input-qty"
                  min={1}
                  name=""
                  type="number"
                  value={quantityCart}
                  readOnly
                />
                <button className="plus is-form" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <p> {products?.quantity} sản phẩm sẵn có</p>
            </div>
            <div className="add_detail">
              {flagUser === null ||
              (Stores && Stores.userId === flagUser?.userId) ? (
                <div className="btn_add">
                  <button onClick={handleAddStore}>
                    <AddShoppingCartOutlinedIcon style={{ fontSize: 17 }} />{" "}
                    <span>Thêm Vào Giỏ Hàng</span>
                  </button>
                </div>
              ) : (
                <div className="btn_add">
                  <button onClick={handleButton}>
                    <AddShoppingCartOutlinedIcon style={{ fontSize: 17 }} />{" "}
                    <span>Thêm Vào Giỏ Hàng</span>
                  </button>
                </div>
              )}
              <div className="btn_buy">
                {flagUser === null ||
                (Stores && Stores.userId === flagUser?.userId) ? (
                  <button disabled>Mua Ngay</button>
                ) : (
                  <NavLink to={"/cart"}>
                    <button onClick={handleButton}>Mua Ngay</button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="detail__shop">
          <div className="detail__shop1">
            <Avatar src={"../assets/avatar.jpg"} className="avatarrr" size={90}>
              ĐN
            </Avatar>
            <div className="detail__shop111">
              <div className="shopp_user">
                <p>quangminh</p>
                <p style={{ color: "#757575" }}>Online 1 Giờ Trước</p>
              </div>
              <div className="shopp_user1">
                <button>
                  <MessageOutlinedIcon /> Chát Ngay
                </button>
                <button>
                  {" "}
                  <OtherHousesOutlinedIcon />
                  Xem Shop
                </button>
              </div>
            </div>
          </div>
          <div className="detail__shop2">
            <div className="detailshop_right">
              <label>Đánh Giá</label>
              <span>5k</span>
              <label htmlFor="">Tỉ Lệ Phản Hồi</label>
              <span>100%</span>
              <label htmlFor="">Tham Gia</label>
              <span>12 Tháng Trước</span>
            </div>
            <div className="detailshop_right">
              <label>Sản Phẩm</label>
              <span>400</span>
              <label htmlFor="">Thời Gian P.Hồi</label>
              <span>vài giờ</span>
              <label htmlFor="">Người Theo Dõi</label>
              <span>20 Nghìn Người</span>
            </div>
          </div>
        </div>
        <div className="descripttion">
          <div className="mota">MÔ TẢ SẢN PHẨM</div>
          <div className="content_mota">{products?.description}</div>
        </div>
        <div className="binhluan">
          <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
          {status.length > 0 && status[0].statusOrder === "success" && (
            <div className="ratee">
              <div className="ratee1">
                <p>Đánh giá: </p>{" "}
                <Rate
                  allowHalf
                  defaultValue={5}
                  style={{ color: "#ee4d2d" }}
                  onChange={setRating}
                />
              </div>
              <div className="texe">
                <textarea
                  name=""
                  id=""
                  cols={100}
                  rows={8}
                  style={{ resize: "none" }}
                  placeholder="Nhập Bình Luận ..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      postRatingAndComment();
                    }
                  }}
                ></textarea>
              </div>
              <button onClick={postRatingAndComment}>Gửi Đánh Giá</button>
            </div>
          )}

          <div className="map_comment1">
            {allcomments &&
              allcomments.map((comment: Comment, index) => (
                <div key={index} className="map_comment">
                  <div className="img">
                    <Avatar
                      src={comment.avatarURL}
                      className="avatarrr"
                      size={60}
                    >
                      ĐN
                    </Avatar>
                  </div>
                  <div className="thongtin">
                    <div className="thongtin1">
                      <p>{comment.userName}</p>
                      <Rate
                        allowHalf
                        defaultValue={+comment.rate}
                        style={{ color: "#ee4d2d" }}
                      />
                      <p style={{ color: "rgba(0,0,0,.54)" }}>
                        {comment.createDate}
                      </p>
                      <p>{comment.contents}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailProduct;
