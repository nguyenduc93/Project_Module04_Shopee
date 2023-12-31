import Footer from "../footer/Footer";
import Navbar from "../header/Navbar";
import "./ProfileUser.css";
import { Avatar, notification } from "antd";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileUser = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const flagUser = user ? JSON.parse(user) : null;
  const [fullName, setFullName] = useState(flagUser?.fullName || "");
  const [email, setEmail] = useState(flagUser?.email || "");
  const [phone, setPhone] = useState(flagUser?.phone || "");
  const [address, setAddress] = useState(flagUser?.address || "");
  const [gender, setGender] = useState(flagUser?.gender || "");
  const [birthDay, setBirthDay] = useState(flagUser?.birthDay || "");
  const [avatar, setAvatar] = useState(flagUser?.avatarUrl || null);
  const [users, setUsers] = useState(flagUser);
  const [isAvatarHandled, setIsAvatarHandled] = useState(false);

  // Cập nhật avatar
  useEffect(() => {
    const handleAvatar = async () => {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const response = await axios.put(
          `http://localhost:5000/api/v1/profile/${users.userId}`,
          formData
        );
        if (response.data.status === "Success123") {
          notification.success({
            message: "Cập nhật avatar thành công!!!",
            placement: "top",
            duration: 2,
          });
        }
        const updatedUser = { ...users, avatarURL: response.data.url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUsers(updatedUser);
        setIsAvatarHandled(true); // Đánh dấu đã xử lý hoàn tất
      } catch (error) {
        console.log(error);
      }
    };

    if (avatar && !isAvatarHandled) {
      handleAvatar();
    }
  }, [avatar, users.userId, users, isAvatarHandled]);

  // Cập nhật thông tin người dùng
  const handleButton = async () => {
    try {
      let response = await axios.put("http://localhost:5000/api/v1/profile", {
        fullName,
        email,
        phone,
        address,
        gender,
        birthDay,
        userId: flagUser?.userId,
      });

      if (response.data.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công!",
          placement: "top",
          duration: 2,
        });
      }
      const updatedUser = {
        ...users,
        fullName,
        email,
        phone,
        address,
        gender,
        birthDay,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUsers(updatedUser);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container_profile">
        <div className="profile_left">
          <div className="avatar_left">
            <Avatar src={users.avatarURL} className="avatarrr" size={50}>
              ĐN
            </Avatar>
            <div className="avatar_left1">
              <b>{users.userName}</b>
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
                <p>Tài Khoản Của Tôi</p>
              </NavLink>
            </div>
            <div className="option_profile">
              <img src="../assets/profile/4.png" alt="" height={20} />
              <NavLink to="/donmua" style={{ textDecoration: "none" }}>
                <p style={{ color: "black" }}>Đơn Mua</p>
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
        <div className="profile_right">
          <div className="manager">
            <p style={{ fontSize: "1.325rem" }}>Hồ Sơ Của Tôi</p>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
          </div>
          <div className="main_profile">
            <div className="main_left">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="label">Tên đăng nhập</td>
                    <td className="label1">{users?.userName}</td>
                  </tr>
                  <tr>
                    <td className="label">Tên</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Email</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Số điện thoại</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Địa chỉ</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Giới tính</td>
                    <td className="label1">
                      <div className="radio">
                        <input
                          type="radio"
                          name="radio1"
                          id="Nam"
                          value="Nam"
                          checked={gender === "Nam"}
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        <label htmlFor="Nam">Nam</label>
                        <input
                          id="Nữ"
                          type="radio"
                          name="radio1"
                          style={{ marginLeft: 30 }}
                          value="Nữ"
                          checked={gender === "Nữ"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="Nữ">Nữ</label>
                        <input
                          id="Khác"
                          type="radio"
                          name="radio1"
                          style={{ marginLeft: 30 }}
                          value="Khác"
                          checked={gender === "Khác"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label htmlFor="Khác">Khác</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Ngày sinh</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={birthDay}
                        onChange={(e) => setBirthDay(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label"></td>
                    <td className="label1">
                      <button onClick={handleButton}>Lưu</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="main_right">
              <label htmlFor="avatar-input" className="avatar-label">
                <Avatar src={users.avatarURL} className="avatarrr" size={100}>
                  ĐN
                </Avatar>
              </label>{" "}
              <br /> <br /> <br />
              <label htmlFor="avatar-input" className="label123">
                Chọn Ảnh
              </label>{" "}
              <br /> <br />
              <p style={{ color: "#999" }}>Dụng lượng file tối đa 10 MB</p>
              <input
                type="file"
                style={{ marginTop: 20 }}
                name="avatar"
                id="avatar-input"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAvatar(file);
                  }
                }}
                hidden
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUser;
