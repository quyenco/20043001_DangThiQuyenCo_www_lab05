import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert, Modal } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

const skillLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "PROFESSIONAL", "MASTER"];
const skillTypes = ["SOFT_SKILL", "UNSPECIFIC", "TECHNICAL_SKILL"];

const PostJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", desc: "", type: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user); 
    }
  }, [location.state]);
  console.log(user);

  // Fetch skills from API
  useEffect(() => {
    axios.get("http://localhost:8080/api/skills")
      .then((response) => setSkills(response.data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const handleAddSkill = (skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, { ...skill, level: "BEGINNER", moreInfo: "" }]);
    }
  };

  const handleRemoveSkill = (id) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== id));
  };

  const handleLevelChange = (id, level) => {
    setSelectedSkills(
      selectedSkills.map((skill) =>
        skill.id === id ? { ...skill, level } : skill
      )
    );
  };

  const handleMoreInfoChange = (id, info) => {
    setSelectedSkills(
      selectedSkills.map((skill) =>
        skill.id === id ? { ...skill, moreInfo: info } : skill
      )
    );
  };

  const handleNewSkillChange = (field, value) => {
    setNewSkill({ ...newSkill, [field]: value });
  };

  const handleSaveNewSkill = () => {
    if (!newSkill.name || !newSkill.desc || !newSkill.type) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    const skillData = {
        name: newSkill.name,
        desc: newSkill.desc,
        type: newSkill.type
    };

    axios.post("http://localhost:8080/api/skills/add", skillData)
        .then((response) => {
            setSkills([...skills, response.data]);  
            setShowModal(false);
            setNewSkill({ name: "", desc: "", type: "" });  
        })
        .catch((error) => {
            console.error("Error adding skill:", error);
            alert("Có lỗi xảy ra khi thêm kỹ năng.");
        });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
  
    // Giả sử bạn đã có đối tượng user
    // const user = /* lấy user từ state hoặc props */;
    const companyId = user ? user.id : null;
  
    if (!companyId) {
      setMessage("Không tìm thấy thông tin công ty.");
      return;
    }
  
    const jobData = {
      jobDesc,
      jobName,
      
    };
  
    // Kiểm tra lại dữ liệu gửi đi
    console.log("Sending data:", {
      companyId: companyId,
      ...jobData,
    });
  
    try {
      // Gửi yêu cầu POST với tham số trong URL và dữ liệu trong body
      const response = await axios.post(`http://localhost:8080/api/jobs/add?companyId=${companyId}`, jobData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      


      const jobId = response.data.id; // Lấy jobId từ response

      // Sau khi đăng công việc, thêm job skills
      // Lặp qua danh sách kỹ năng đã chọn và gửi yêu cầu POST cho từng kỹ năng
      selectedSkills.forEach((skill) => {
        const jobSkillDTO = {
          jobId: jobId,
          skillId: skill.id,
          skillLevel: skill.level,
          moreInfos: skill.moreInfo,
        };

        console.log("Sending job skill:", jobSkillDTO);
        axios.post("http://localhost:8080/api/job-skills/add", jobSkillDTO)
          .then(() => {
            console.log("Job skill added successfully");
          })
          .catch((error) => {
            console.error("Error adding job skill:", error);
            setMessage("Đã xảy ra lỗi khi thêm kỹ năng.");
          });
      });

      // Xử lý kết quả từ response
      if (response.status === 200) {
        setMessage("Công việc đã được đăng thành công!");


        

        setJobName("");
        setJobDesc("");
        setSelectedSkills([]);
      }
    } catch (error) {
      // Log lỗi chi tiết từ backend
      console.error("Error posting job:", error.response ? error.response.data : error.message);
      setMessage("Đã xảy ra lỗi khi đăng công việc.");
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="mb-4 align-items-center">
        <Col>
          {user && (
            <div className="d-flex justify-content-end">
              <FaUser style={{ fontSize: "24px", marginRight:"5px" }} />
              <span style={{ fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>
                  {user.name}
              </span>
              <i className="fa-solid fa-user-circle" style={{ fontSize: "24px" }}></i>
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Đăng Tin Tuyển Dụng</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handlePostJob}>
            <Form.Group className="mb-3">
              <Form.Label>Tên công việc</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên công việc"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả công việc</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Nhập mô tả công việc"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kỹ năng</Form.Label>
              <Form.Select
                onChange={(e) =>
                  handleAddSkill(skills.find((skill) => skill.id === +e.target.value))
                }
              >
                <option value="">Chọn kỹ năng</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.skillName}
                  </option>
                ))}
              </Form.Select>
              <Button variant="link" onClick={() => setShowModal(true)}>
                Thêm kỹ năng mới
              </Button>
            </Form.Group>

            <table className="table">
              <thead>
                <tr>
                  <th>Tên kỹ năng</th>
                  <th>Cấp độ kỹ năng</th>
                  <th>Thêm thông tin</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {selectedSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.skillName}</td>
                    <td>
                      <Form.Select
                        value={skill.level}
                        onChange={(e) => handleLevelChange(skill.id, e.target.value)}
                      >
                        {skillLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        placeholder="Thêm thông tin chi tiết"
                        value={skill.moreInfo}
                        onChange={(e) => handleMoreInfoChange(skill.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveSkill(skill.id)}>
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Button variant="primary" type="submit">
              Đăng Công Việc
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Kỹ Năng Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên kỹ năng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên kỹ năng"
              value={newSkill.name}
              onChange={(e) => handleNewSkillChange("name", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mô tả kỹ năng"
              value={newSkill.desc}
              onChange={(e) => handleNewSkillChange("desc", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại kỹ năng</Form.Label>
            <Form.Select
              value={newSkill.type}
              onChange={(e) => handleNewSkillChange("type", e.target.value)}
              required
            >
              <option value="">Chọn loại kỹ năng</option>
              {skillTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" onClick={handleSaveNewSkill}>
            Lưu
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PostJob;
