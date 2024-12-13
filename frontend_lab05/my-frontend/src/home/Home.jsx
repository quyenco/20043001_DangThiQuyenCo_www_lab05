import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Pagination, Row, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
    fetchJobs(0, search);
  }, [location.state]);


  const fetchJobs = async (page, searchQuery = "") => {
    try {
      const params = { page };
      if (user && user.userType === "Candidate") {
        params.candidateId = user.id;
      } else if (searchQuery) {
        params.search = searchQuery;
      }
      console.log("params",params)

      const response = await axios.get("http://localhost:8080/api/jobs/get-page", { params });
      console.log(response.data);
      setJobs(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 0);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(0, search);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchJobs(page, search);
  };

  const handlePostJob = () => {
    navigate("/post-job", { state: { user } });
  };

  const handleViewDetail = (job) => {
    navigate("/job-detail", { state: { job, user } });
  };
  

  const handleUpdateProfile = () => {
    // Kiểm tra loại người dùng và điều hướng tới trang cập nhật phù hợp
    if (user && user.userType === 'Company') {
      // Nếu người dùng là công ty, điều hướng đến trang cập nhật công ty
      navigate("/updateCompany", { state: { user } });
    } else if (user && user.userType === 'Candidate') {
      // Nếu người dùng là ứng viên, điều hướng đến trang cập nhật ứng viên
      navigate("/updateCandidate", { state: { user } });
    }
  };

  return (
    
    <Container className="home-container mt-5">
      <Row className="mb-4 align-items-center">
      <Col>
        {user && (
          <div className="d-flex justify-content-end">
            
            <button
              onClick={handleUpdateProfile} // Gọi hàm khi nhấn nút
              style={{ fontSize: "18px", fontWeight: "bold", background: "none", border: "none", cursor: "pointer" }}
            >
              <FaUser style={{ fontSize: "24px", marginRight: "5px" }} />
              {user.name}
            </button>
            <i className="fa-solid fa-user-circle" style={{ fontSize: "24px" }}></i>
          </div>
        )}
      </Col>
    </Row>

      <Row className="mb-4">
        <Col>
          {user && user.userType === "Company" && (
            <Button variant="primary" onClick={handlePostJob}>
              Đăng tin tuyển dụng
            </Button>
          )}
        </Col>
        {/* <Col>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control  style={{ marginRight: "10px", height: "38px" }}
              type="text"
              placeholder="Tìm kiếm tên công ty hoặc kỹ năng"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" type="submit" style={{height:"38px"}}>
              Tìm kiếm
            </Button>
          </Form>
        </Col> */}
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {jobs.map((job) => (
          <Col key={job.id}>
            <Card>
              <Card.Body>
                <Card.Title>{job.jobName}</Card.Title>
                <Card.Text>
                  <b>Công ty:</b> {job.companyName || "N/A"}
                </Card.Text>
                <Card.Text>{job.title}</Card.Text>
                <Button onClick={() => handleViewDetail(job)}>Chi tiết</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index === currentPage}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Home;
