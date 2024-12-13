import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../jobDetail/styles.scss"; // Import file SCSS
import { FaUser } from "react-icons/fa";

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State lưu thông tin công việc và người dùng
  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Hàm gọi API để lấy thông tin chi tiết công việc
  const fetchJobDetail = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/${jobId}`
      );
      console.log(response.data);
      setJob(response.data); // Lưu dữ liệu công việc vào state
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  useEffect(() => {
    // Lấy jobId và thông tin người dùng từ state (Home truyền qua)
    const { jobId, user } = location.state || {};
    if (user) setUser(user); // Lưu thông tin người dùng vào state

    if (location.state.job) {
      fetchJobDetail(location.state.job.id); // Gọi API lấy thông tin công việc
    } else {
      setLoading(false); // Nếu không có jobId, dừng loading
    }
  }, [location.state]);

  const handleApplyJob = () => {
    // Điều hướng đến trang ứng tuyển công việc
    navigate("/apply-job", { state: { user, jobId: job?.id } });
  };

  return (
    <Container className="job-detail-container mt-5">
      {user && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            marginRight: "30px",
          }}
        >
          <FaUser style={{ fontSize: "24px", marginRight: "5px" }} />
          {user.name}
        </div>
      )}
      <h2 style={{ textAlign: "center" }}>Chi tiết công việc</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Đang tải thông tin công việc...</p>
      ) : job ? (
        <>
          {/* Thông tin chung */}
          <Row className="job-detail-header mb-4">
            <Col>
              <h2 className="job-title">{job.jobName}</h2>
              <p className="job-company">
                <b>Công ty:</b> {job.companyName || "N/A"}
              </p>
              <p className="job-location">
                <b>Địa điểm:</b> {job.address || "N/A"}
              </p>
            </Col>
          </Row>

          {/* Mô tả công việc */}
          <Row className="job-description mb-4">
            <Col>
              <h5>Mô tả công việc:</h5>
              <p>{job.jobDesc}</p>
            </Col>
          </Row>

          <Row className="job-skills mb-4">
  <Col>
    <h5>Kỹ năng yêu cầu:</h5>
    {job.skills && job.skills.length > 0 ? (
      <div className="job-skills-list" >
        {job.skills.map((skill, index) => (
          <div key={index} className="job-skill-item"
          style={{
            backgroundColor: "#f5f5f5", // Thêm màu nền cho từng kỹ năng
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px", // Thêm bo góc cho từng kỹ năng
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Thêm bóng cho kỹ năng
          }}>
            <span className=""><b>Tên kỹ năng:</b> {skill.skillName || ""}</span><br />
            <span className=""><b>Loại kỹ năng:</b> {skill.type || ""}</span><br />
            <span className=""><b>Cấp độ:</b> {skill.level || ""}</span><br />
            <span className=""><b>Mô tả:</b> {skill.description || ""}</span><br />
            <span className=""><b>Thông tin thêm:</b> {skill.additionalInfo || ""}</span><br />
          </div>
        ))}
      </div>
    ) : (
      <p>Không có kỹ năng yêu cầu.</p>
    )}
  </Col>
</Row>

          {/* Nút ứng tuyển */}
          <Row className="job-actions mb-4">
            <Col>
              {user && user.userType === "Candidate" && (
                <Button className="apply-job-button" onClick={handleApplyJob}>
                  Ứng tuyển
                </Button>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          Không tìm thấy thông tin công việc.
        </p>
      )}
    </Container>
  );
};

export default JobDetail;
