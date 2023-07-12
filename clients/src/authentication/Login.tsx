import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import "./authentication.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { MouseEvent, useState } from "react";
import axios from "axios";
import { notification } from "antd";
const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [passwordUser, setPassword] = useState("");
  const navigate = useNavigate();

  const handleButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          userName,
          passwordUser,
        }
      );

      if (response.data.status === 200) {
        console.log(response.data.data[0]);

        // setTimeout(() => {
        //   navigate("/");
        // }, 1000);
        if (response.data.data[0].statusUser === 2) {
          notification.error({
            message: "Tài khoản bị khóa, liên hệ admin!",
            placement: "top",
            duration: 2,
          });
        } else {
          notification.success({
            message: "Đăng nhập thành công!",
            placement: "top",
            duration: 2,
          });

          setTimeout(() => {
            if (response.data.data[0].statusUser === 0) {
              navigate("/admin/users");
            } else {
              navigate("/");
            }
          }, 1000);
          localStorage.setItem("user", JSON.stringify(response.data.data[0]));
        }
      } else {
        notification.error({
          message: "Tài khoản không tồn tại!",
          placement: "top",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Mật khẩu không chính xác!",
        placement: "top",
        duration: 2,
      });
    }
  };

  return (
    <div>
      <div>
        <div className="containerr">
          <div className="containerr_left">
            <NavLink to={"/"}>
              <img
                src="../assets/ShopeeLogo.png"
                alt=""
                height={50}
                width={140}
              />
            </NavLink>
            <p>Đăng nhập</p>
          </div>
          <div className="containerr_right">
            <p>Bạn cần giúp đỡ?</p>
          </div>
        </div>
        <div className="mainn">
          <div className="authen">
            <form action="">
              <p className="header1">Đăng nhập</p>
              <div className="authen1">
                <input
                  type="text"
                  placeholder="Tên đăng nhập"
                  onChange={(e) => setUserName(e.target.value)}
                />{" "}
                <br />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button onClick={(e) => handleButton(e)}>ĐĂNG NHẬP</button>
                <div className="pass">
                  <p>Quên mật khẩu</p>
                  <p>Đăng nhập với SMS</p>
                </div>
                <div className="or_login">
                  <div className="a"></div>
                  <p>Hoặc</p>
                  <div className="b"></div>
                </div>
                <div className="face">
                  <div className="face1">
                    <p className="face12">
                      <FacebookOutlinedIcon />
                    </p>
                    <p>Facebook</p>
                  </div>
                  <div className="face1">
                    <p style={{ paddingTop: 5 }}>
                      <img
                        src="../assets/111.png"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </p>
                    <p>Google</p>
                  </div>
                </div>
                <div style={{ marginTop: 30 }}>
                  <p style={{ color: "rgba(0,0,0,.26)" }}>
                    Bạn mới biết đến Shopee?{" "}
                    <NavLink
                      to={"/dangky"}
                      style={{ textDecoration: "none", color: "#ee4d2d" }}
                    >
                      Đăng ký
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
