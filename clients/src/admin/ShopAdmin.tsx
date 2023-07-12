import axios from "axios";
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

type Stores = {
  storeName: string;
  addressStore: string;
  phone: number;
  storeId: number;
  statusStore: number;
};

const ShopAdmin = () => {
  const [stores, setStores] = useState<Stores[]>([]);

  const flaguserJSON = localStorage.getItem("user");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.statusUser != 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);

  const getStores = async () => {
    try {
      let response = await axios.get("http://localhost:5000/api/v1/admin/shop");
      setStores(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //   Khóa Cửa hàng
  const handleLock = async (id: number) => {
    let statusStore = 2;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/shop/${id}`,
        {
          statusStore,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Cửa hàng đã được khóa!",
          placement: "top",
          duration: 2,
        });
        getStores();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   Mở khóa cửa hàng
  const handleUnLock = async (id: number) => {
    let statusStore = 1;
    try {
      let data = await axios.put(
        `http://localhost:5000/api/v1/admin/shop/${id}`,
        {
          statusStore,
        }
      );
      if (data.data.status === 200) {
        notification.success({
          message: "Đã mở khóa cửa hàng!",
          placement: "top",
          duration: 2,
        });
        getStores();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <div className="userAdmin">
        <NavbarAdmin />
        <div className="main_admin">
          <h3>{stores?.length} Cửa hàng</h3>
          <div className="div_table">
            <table className="table_users">
              <tbody>
                <tr className="tr_user1">
                  <th>Stt</th>
                  <th>Tên cửa hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Hành động</th>
                </tr>
                {stores &&
                  stores.map((store, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{store.storeName}</td>
                      <td>{store.phone}</td>
                      <td>{store.addressStore}</td>
                      {store.statusStore === 1 ? (
                        <td
                          className="icon_"
                          onClick={() => handleLock(store.storeId)}
                        >
                          <LockOpenOutlinedIcon />
                        </td>
                      ) : (
                        <td
                          className="icon_"
                          onClick={() => handleUnLock(store.storeId)}
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

export default ShopAdmin;
