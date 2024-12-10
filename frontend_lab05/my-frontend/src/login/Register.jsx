// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('candidate');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match!");
//       return;
//     }

//     const data = {
//       email: email,
//       password: password,
//       userType: userType,
//     };

//     try {
//       const response = await axios.post('http://localhost:8080/api/register', data);
//       console.log(response.data);
//     } catch (error) {
//       setErrorMessage(error.response?.data || "Registration failed!");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>User Type:</label>
//           <select
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//             required
//           >
//             <option value="candidate">Candidate</option>
//             <option value="company">Company</option>
//           </select>
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('candidate');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const data = {
      email,
      password,
      userType,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/register', data);
      setSuccessMessage('Registration successful!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Registration failed!');
      setSuccessMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Register</h2>
          
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="userType" className="mt-3">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                as="select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="candidate">Candidate</option>
                <option value="company">Company</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
