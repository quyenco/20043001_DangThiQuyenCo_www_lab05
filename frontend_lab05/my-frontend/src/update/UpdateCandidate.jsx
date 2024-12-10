import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateCandidate = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
    },
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load the current candidate information (you should have the candidate id available)
    const candidateId = 1; // This should be passed as a prop or fetched from the logged-in user
    axios
      .get(`http://localhost:8080/api/candidates/${candidateId}`)
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidate data:', error);
        setMessage('Không thể tải thông tin ứng viên');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevCandidate) => ({
      ...prevCandidate,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevCandidate) => ({
      ...prevCandidate,
      address: {
        ...prevCandidate.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const candidateId = 1; // Replace with the actual candidate ID

    axios
      .put(`http://localhost:8080/api/candidates/${candidateId}`, candidate)
      .then((response) => {
        setMessage('Cập nhật thông tin ứng viên thành công!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error updating candidate:', error);
        setMessage('Đã xảy ra lỗi khi cập nhật thông tin.');
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Cập nhật thông tin ứng viên</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Họ và tên</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={candidate.fullName}
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
            value={candidate.email}
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
            value={candidate.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Ngày sinh</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={candidate.dob}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Địa chỉ</h3>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Địa chỉ (Street)</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={candidate.address.street}
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
            value={candidate.address.city}
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
            value={candidate.address.zipCode}
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

export default UpdateCandidate;
