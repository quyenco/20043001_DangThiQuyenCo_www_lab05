import { useState } from "react";
import "../login/styles.scss";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeLogin, setTypeLogin] = useState("comapny");

  let navigate = useNavigate();

  let handleClickLogin = async () => {
    try {
      let response = await axios.post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      });
      console.log(response.data); // Kiểm tra dữ liệu trả về từ backend
      // Kiểm tra nếu trả về đúng loại người dùng
      if (response.data.userType === "Company") {
        console.log("Redirecting to company dashboard...");
        navigate("/home",{ state: { user: response.data } });  
      } else if (response.data.userType === "Candidate") {
        console.log("Redirecting to candidate home...");
        navigate("/home", { state: { user: response.data } }); 
      } else {
        console.log("Invalid user type");
        toast.error('🦄 Email hoặc Password không đúng!', {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Login failed: ", error);
      toast.error('Đăng nhập thất bại!', {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <div className="container-login">
      <span className="text-login">ĐĂNG NHẬP</span>

      <div className="form-login-content">
        <label htmlFor="login-email" className="login-label">
          Email :{" "}
        </label>
        <input
          style={{ marginRight: "20px" }}
          type="email"
          value={email}
          id="login-email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-login-content">
        <label htmlFor="login-password" className="login-label">
          Password :{" "}
        </label>
        <input
          type="password"
          value={password}
          id="login-password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="ac">
        <button className="btn-login" onClick={handleClickLogin}>
          Đăng Nhập
        </button>
        <Link style={{ marginTop: '10px', marginLeft: "40px", fontSize: "16px" }} to={"/sign-up"}>Đăng ký</Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
