import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const UpdateCompany = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user); 
    }
  }, [location.state]);
  // console.log("user",user)

  const [company, setCompany] = useState({
    compName: '',
    email: '',
    phone: '',
    webUrl: '',
    about: '',
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipcode: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  console.log("userid",location.state.user.id)
  const companyId = location.state.user.id;

  useEffect(() => {
    // Fetch company details from the backend
    axios
      .get(`http://localhost:8080/api/company/${companyId}`)
      .then((response) => {
        setCompany(response.data); // Cập nhật thông tin công ty
        console.log('Company data:', response.data);

        // Fetch address details using the new API based on companyId
        axios
          .get(`http://localhost:8080/api/address/find-by-company?companyId=${companyId}`)
          .then((addressResponse) => {
            setAddress(addressResponse.data); // Cập nhật thông tin địa chỉ
            console.log('Address data:', addressResponse.data);
          })
          .catch((addressError) => {
            console.error('Error fetching address data:', addressError);
            setMessage('Không thể tải thông tin địa chỉ');
          });
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
        setMessage('Không thể tải thông tin công ty');
      });
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Update company information
    axios
      .put(`http://localhost:8080/api/company/${companyId}`, {
        compName: company.compName,
        email: company.email,
        phone: company.phone,
        webUrl: company.webUrl,
        about: company.about,
      })
      .then(() => {
        // Update address information
        axios
          .put(`http://localhost:8080/api/address/${address.id}`, address)
          .then(() => {
            setMessage('Cập nhật thông tin công ty thành công!');
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error updating address:', error);
            setMessage('Đã xảy ra lỗi khi cập nhật thông tin địa chỉ.');
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Error updating company:', error);
        setMessage('Đã xảy ra lỗi khi cập nhật thông tin công ty.');
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">

      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        {user && (
            <div className="d-flex justify-content-end">
              <FaUser style={{ fontSize: "24px", marginRight:"5px" }} />
              <span style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>
                  {user.name}
              </span>
              <i className="fa-solid fa-user-circle" style={{ fontSize: "24px" }}></i>
            </div>
          )}



      </div>

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
            value={company.compName || ''}
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
            value={company.email || ''}
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
            value={company.phone || ''}
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
            value={company.webUrl || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="about" className="form-label">Mô tả công ty</label>
          <textarea
            className="form-control"
            id="about"
            name="about"
            value={company.about || ''}
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
            value={address.street || ''}
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
            value={address.city || ''}
            onChange={handleAddressChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zipcode" className="form-label">Mã bưu điện</label>
          <input
            type="text"
            className="form-control"
            id="zipcode"
            name="zipcode"
            value={address.zipcode || ''}
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
