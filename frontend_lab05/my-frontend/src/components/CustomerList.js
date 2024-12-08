import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gửi GET request đến backend để lấy danh sách customer
    axios
      .get("http://localhost:8080/api/address/find")
      .then((response) => {
        setCustomers(response.data); // Lưu dữ liệu vào state
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
      <h1>Customer List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
