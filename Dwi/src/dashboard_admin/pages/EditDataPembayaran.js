import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../configAPI/api";
import MyPage from "../components/myPage";

const defValue = {
    nama_lengkap: "",
    bukti_pembayaran: ""
}

export default function EditDataPembayaran() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const [form, setForm] = useState({ ...defValue })

    console.log(form, id);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // if (e.target.type === "file") {
        // 	let url = URL.createObjectURL(e.target.files[0]);
        // 	// console.log(url);
        // 	setAvatar(url);
        // }
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set(
                "bukti_pembayaran",
                form.bukti_pembayaran[0],
                form.bukti_pembayaran[0].name
            );
            formData.set("nama_lengkap", form.nama_lengkap);

            const response = await API.patch(`/pembayaran/${id}`, formData, config);
            console.log(response);
            console.log(formData);
            if (response.status === 200) {
                navigate("/dashboard/master_pembayaran");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MyPage title={"Edit Data Pembayaran"} url={location.pathname}>
            <div>

                <Container className="mt-5">
                    <div >
                        <Row>
                            <Col md={6}>
                                <Form>
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                        required
                                    >
                                        <Form.Label>Nama Lengkap</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="nama_lengkap"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                        required
                                    >
                                        <Form.Label>Bukti Pembayaran</Form.Label>

                                        <Form.Control type="file" placeholder="" name="bukti_pembayaran" onChange={handleChange} />
                                    </Form.Group>

                                    <Button variant="primary" className="w-100 px-5 mt-3 " onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                            <Col md={6} className="text-center">
                                {/* <img
                src={logo}
                alt=""
                style={{
                  width: "475px",
                }}
              /> */}
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </MyPage>
    );
};
