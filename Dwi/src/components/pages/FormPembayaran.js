import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../configAPI/api";
import { UserContext } from "../../context/userContext";
import { Footer } from "../navbars/Footer";
import NavbarUser from "../navbars/NavbarUser";
export const path = "http://localhost:5000/uploads/";

const defValue = {
  nama_lengkap: "",
  bukti_pembayaran: "",
};

export const FormPembayaran = () => {
  const [state, dispatch] = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState({});
  const [form, setForm] = useState({ ...defValue });

  console.log(form.nama_lengkap);
  console.log(preview);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
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
      // formData.set("iduser", state.user.id);
      // formData.set("id_registrasi", state.tb_registrasi.id);
      formData.set(
        "bukti_pembayaran",
        form.bukti_pembayaran[0],
        form.bukti_pembayaran[0].name
      );
      formData.set("nama_lengkap", form.nama_lengkap);

      const response = await API.post(`/pembayaran/add`, formData, config);
      console.log(response);
      console.log(formData);
      if (response.status === 200) {
        alert("Pembayaran Berhasil");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarUser />
      <Container className="mt-5">
        <div
          style={{
            marginTop: "100px",
          }}
        >
          <h3 className="mb-5">Form Pembayaran Calon Peserta Didik</h3>
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
                  <Form.Control
                    onChange={handleChange}
                    type="file"
                    placeholder=""
                    name=""
                  />
                </Form.Group>

                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  className="w-100 px-5 mt-3 "
                >
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={6} className="text-center">
              <img
                src={form.bukti_pembayaran}
                alt=""
                style={{
                  width: "436px",
                  height: "555px",
                  objectFit: "cover",
                  borderRadius: "32px",
                }}
              />
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
