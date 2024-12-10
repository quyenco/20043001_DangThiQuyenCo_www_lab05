import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCompany = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    compName: '',
    email: '',
    phone: '',
    webUrl: '',
    about: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load the current company information (you should have the company id available)
    const companyId = 1; // This should be passed as a prop or fetched from the logged-in user
    axios
      .get(`http://localhost:8080/api/companies/${companyId}`)
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
        setMessage('Không thể tải thông tin công ty');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      address: {
        ...prevCompany.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const companyId = 1; // Replace with the actual company ID

    axios
      .put(`http://localhost:8080/api/companies/${companyId}`, company)
      .then((response) => {
        setMessage('Cập nhật thông tin công ty thành công!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating company:', error);
        setMessage('Đã xảy ra lỗi khi cập nhật thông tin.');
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Cập nhật thông tin công ty</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="compName" className="form-label">Tên công ty</label>
          <input
            type="text"
            className="form-control"
            id="compName"
            name="compName"
            value={company.compName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={company.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={company.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="webUrl" className="form-label">Website</label>
          <input
            type="url"
            className="form-control"
            id="webUrl"
            name="webUrl"
            value={company.webUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="about" className="form-label">Mô tả công ty</label>
          <textarea
            className="form-control"
            id="about"
            name="about"
            value={company.about}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <h3>Địa chỉ</h3>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Địa chỉ (Street)</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={company.address.street}
            onChange={handleAddressChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">Thành phố</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={company.address.city}
            onChange={handleAddressChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zipCode" className="form-label">Mã bưu điện</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={company.address.zipCode}
            onChange={handleAddressChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
        </button>
      </form>
    </div>
  );
};

export default UpdateCompany;
