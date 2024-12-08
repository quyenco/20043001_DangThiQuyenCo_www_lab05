import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressList() {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gửi GET request đến backend để lấy danh sách customer
    axios
      .get("http://localhost:8080/api/address/find")
      .then((response) => {
        setAddress(response.data); // Lưu dữ liệu vào state
        setLoading(false); // Đánh dấu dữ liệu đã được tải
      })
      .catch((err) => {
        setError(err.message); // Lưu thông báo lỗi nếu có
        setLoading(false); // Đánh dấu kết thúc tải dữ liệu
      });
  }, []); // Mảng phụ thuộc rỗng để gọi chỉ một lần khi component mount

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị khi có lỗi
  }

  return (
    <div>
      <h1>Address List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {address.map((address) => (
            <tr key={address.id}>
              <td>{address.id}</td>
              <td>{address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddressList;
