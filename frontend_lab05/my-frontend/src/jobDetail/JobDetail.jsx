import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../jobDetail/styles.scss"; // Import file SCSS

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng từ state hoặc từ cookie, session nếu cần
  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
    console.log(location.state);

    if (location.state && location.state.jobId) {
      fetchJobDetail(location.state.jobId);
    }
  }, [location.state]);

  const fetchJobDetail = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleApplyJob = () => {
    // Hàm này có thể điều hướng đến trang đăng ký hoặc ứng tuyển công việc
    navigate("/apply-job", { state: { user, jobId: job.id } });
  };

  return (
    <Container className="job-detail-container mt-5">
        <h2 style={{textAlign:"center"}}> Chi tiết công việc</h2>
      {job && (
        <>
        
          <Row className="job-detail-header mb-4">
            
            <Col>
              <h2 className="job-title">{job.jobName}</h2>
              <p className="job-company">
                <b>Công ty:</b> {job.companyName || "N/A"}
              </p>
              <p className="job-location">
                <b>Địa điểm:</b> {job.location || "N/A"}
              </p>
            </Col>
          </Row>

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
                <ul>
                  {job.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p>Không có kỹ năng yêu cầu.</p>
              )}
            </Col>
          </Row>

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
      )}
    </Container>
  );
};

export default JobDetail;
