import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import LOGO from "../../assets/img/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const title = "Register";
  document.title = "Sd Karya Bangsa | " + title;

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.status === "success") {
        console.log(response.data.status);
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        dispatch({
          type: "USER_SUCCESS",
          payload: response.data.data.user,
        });
        setMessage(alert);
       navigate("/form-ppdb")
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row style={{ height: "100vh" }}>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <img src={LOGO} width={300} />
            <div className="my-5 text-center">
              <h2 className="fw-bold">Welcome To Dashboard</h2>
              <h3 className="fw-bold">SD Karya Bangsa</h3>
            </div>
          </Col>
          <Col
            md={6}
            style={{ backgroundColor: "rgba(6,147,227,1)" }}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <Card style={{ width: "25rem" }}>
              <Card.Body className="p-5">
                <h2 className="mb-3 text-center fw-bold text-primary">
                  Registrasi
                </h2>
                {message && message}

                <Form>
                  <Form.Group controlId="inputUsername">
                    <Form.Label className="fw-bold text-primary">
                      Username
                    </Form.Label>

                    <Form.Control
                      className="  p-2 mb-2"
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="inputEmail">
                    <Form.Label className="fw-bold text-primary">
                      Email
                    </Form.Label>
                    <Form.Control
                      className=" p-2 mb-2 "
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </Form.Group>

                  <Form.Group controlId="inputPassword">
                    <Form.Label className="fw-bold text-primary">
                      Password
                    </Form.Label>

                    <Form.Control
                      className="  p-2 mb-2"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      aria-describedby="passwordHelpBlock"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button
                    className=" w-100 fw-bold my-3 "
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Registrasi
                  </Button>
                </Form>

                {/* <p className="text-center text-muted">
                  Forget Password ? Click
                  <a
                    // onClick={() => handleRegis(true)}
                    className="fw-bold text-primary ms-1"
                    style={{ cursor: "pointer" }}
                  >
                    Here
                  </a>
                </p> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
