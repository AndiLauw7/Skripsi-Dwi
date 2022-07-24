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

  const title = "Login";
  document.title = "Sd Karya Bangsa | " + title;

  const [state, dispatch] = useContext(UserContext);
  const user = state.user.role;

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      console.log(response);

      const alert = <Alert variant="success">{response.data.status}</Alert>;

      setMessage(alert);
      if (response?.status === 200) {
        if (response.data.status === "success") {
          console.log(response.data.status);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data.user,
          });
          if (
            response?.data.data.user.role === "admin" ||
            response?.data.data.user.role === "kepalasekolah"
          ) {
            return navigate("/dashboard");
          } else if (response?.data.data.user.role === "siswa") {
            return navigate("/form-ppdb");
          } else {
            return navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert variant="danger">Email or Password Not match!</Alert>
      );
      setMessage(alert);
    }
  };

  useEffect(() => {
    if (user === "admin" || user === "kepalasekolah") {
      return navigate("/dashboard");
    } else if (user === "siswa") {
      return navigate("/form-ppdb");
    } else {
      return navigate("/login");
    }
  }, [user]);

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
                <h2 className="mb-5 text-center fw-bold text-primary">Login</h2>
                {message && message}

                <Form>
                  <Form.Group controlId="inputUsername">
                    <Form.Label className="fw-bold text-primary">
                      Username
                    </Form.Label>
                    <Form.Control
                      className=" p-2 mb-4 "
                      type="text"
                      name="username"
                      onChange={handleChange}
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="inputPassword">
                    <Form.Label className="fw-bold text-primary">
                      Password
                    </Form.Label>
                    <Form.Control
                      className="  p-2 mb-4"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      aria-describedby="passwordHelpBlock"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button
                    className=" w-100 fw-bold my-3 "
                    variant="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Form>

                <p className="text-center text-muted">
                  Forget Password ? Click
                  <a
                    // onClick={() => handleRegis(true)}
                    className="fw-bold text-primary ms-1"
                    style={{ cursor: "pointer" }}
                  >
                    Here
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
