import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import "./admin.css";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

type Users = {
  userName: string;
  email: string;
  phone: number;
  gender: string;
  statusUser: number;
  userId: number;
};

const UserAmin = () => {
  const [users, setUsers] = useState<Users[]>([]);

  const flaguserJSON = localStorage.getItem("user");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.statusUser != 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);

  const getUsers = async () => {
    try {
      let response = await axios.get(
        "http://localhost:5000/api/v1/admin/users"
      );
      setUsers(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //   Khóa user
  const handleLock = async (id: number) => {
    let statusUser = 2;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/users/${id}`,
        {
          statusUser,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Đã khóa tài khoản!",
          placement: "top",
          duration: 2,
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   Mở khóa user
  const handleUnLock = async (id: number) => {
    let statusUser = 1;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/users/${id}`,
        {
          statusUser,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Đã mở khóa tài khoản!",
          placement: "top",
          duration: 2,
        });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="main_admin">
          <h3>{users?.length} Người dùng</h3>
          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Giới tính</th>
                  <th>Hành động</th>
                </tr>
                {users &&
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.gender}</td>
                      {user.statusUser === 1 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(user.userId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : user.statusUser === 0 ? (
                        <td className="icon_">Admin</td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(user.userId)}
                        >
                          <LockOutlinedIcon />
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAmin;
