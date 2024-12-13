import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation} from 'react-router-dom';
import { FaUser } from "react-icons/fa";


const UpdateCandidate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user); 
    }
  }, [location.state]);
  console.log("user",user)

  const [candidate, setCandidate] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    zipcode: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const candidateId = location.state.user.id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/candidate/${candidateId}`)
      .then((response) => {
        setCandidate(response.data);

        axios
          .get(`http://localhost:8080/api/address/find-by-candidate?candidateId=${candidateId}`)
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
        console.error('Error fetching candidate data:', error);
        setMessage('Không thể tải thông tin ứng viên');
      });
  }, [candidateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevCandidate) => ({
      ...prevCandidate,
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
    setLoading(true); // Replace with the actual candidate ID

    axios
      .put(`http://localhost:8080/api/candidate/${candidateId}`, {
        fullName: candidate.fullName,
        email: candidate.email,
        phone: candidate.phone,
        dob: candidate.dob,
      })
      .then(() => {
        // Update address information
        console.log('Address:', address.id);
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
        console.error('Error updating candidate:', error);
        setMessage('Đã xảy ra lỗi khi cập nhật thông tin.');
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
            value={address.street||''}
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
          <label htmlFor="zipCode" className="form-label">Mã bưu điện</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={address.zipcode||''}
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
