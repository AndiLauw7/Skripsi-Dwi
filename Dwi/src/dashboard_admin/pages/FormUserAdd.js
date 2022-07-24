import React, { useContext, useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { API } from '../../configAPI/api';
import { UserContext } from '../../context/userContext';

export default function FormUserAdd() {
    const navigate = useNavigate();

    const title = "Add User";
    document.title = "Sd Karya Bangsa | " + title;

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    });


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
            const response = await API.post("/user/add", body, config);

            // Notification
            if (response?.status === 201) {
                console.log(response.data.status);
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success
                    </Alert>
                );
                setMessage(alert);
                navigate("/dashboard/user")
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
                    {/* <Col
                        md={6}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <img src={LOGO} width={300} />
                        <div className="my-5 text-center">
                            <h2 className="fw-bold">Welcome To Dashboard</h2>
                            <h3 className="fw-bold">SD Karya Bangsa</h3>
                        </div>
                    </Col> */}
                    <Col
                        // md={6}
                        // style={{ backgroundColor: "rgba(6,147,227,1)" }}
                        // style={{ backgroundColor: "rgba(6,147,227,1)" }}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >

                        <h2 className="mb-3 text-center fw-bold ">
                            Add User
                        </h2>
                        {message && message}


                        <Form style={{ width: 400 }}>
                            <Form.Group controlId="inputUsername">
                                <Form.Label className="fw-bold  ">
                                    Username
                                </Form.Label>

                                <Form.Control
                                    className="  p-2 mb-2 w-100"
                                    type="text"
                                    name="username"
                                    // value={username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                />
                            </Form.Group>

                            <Form.Group controlId="inputEmail">
                                <Form.Label className="fw-bold ">
                                    Email
                                </Form.Label>
                                <Form.Control
                                    className=" p-2 mb-2 "
                                    type="email"
                                    name="email"
                                    // value={email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                            </Form.Group>

                            <Form.Group controlId="inputPassword">
                                <Form.Label className="fw-bold ">
                                    Password
                                </Form.Label>

                                <Form.Control
                                    className="  p-2 mb-2"
                                    type="password"
                                    name="password"
                                    // value={password}
                                    onChange={handleChange}
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-2"
                                controlId="exampleForm.ControlInput1"
                                required
                            >
                                <Form.Label>Role</Form.Label>
                                <Form.Select name="role" onChange={handleChange}>
                                    <option selected>Pilih Role</option>
                                    <option value="siswa">Siswa</option>
                                    <option value="kepalasekolah">Kepala Sekolah</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </Form.Group>
                            <Button
                                className=" w-100 fw-bold my-3 "
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Form>


                    </Col>
                </Row>
            </Container>
        </>
    )
}
