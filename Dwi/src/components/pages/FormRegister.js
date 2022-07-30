import React, { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Footer } from "../navbars/Footer";
import NavTop from "../navbars/NavTop";
import logo from "../../assets/img/PPDB.jpeg";
import NavbarUser from "../navbars/NavbarUser";
import { useNavigate } from "react-router-dom";
import { API } from "../../configAPI/api";
import { UserContext } from "../../context/userContext";

const defValue = {
  nama_lengkap: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  agama: "",
  alamat: "",
  nomer_hp: "",
  lulusan: "",
  nisn: "",
  nama_ibu: "",
  tempat_lahirIbu: "",
  pekerjaanIbu: "",
  nama_ayah: "",
  tempat_lahirAyah: "",
  pekerjaanAyah: "",
  // createBy: "",
};

export const FormRegister = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const { id } = state.user;

  const [data, setData] = useState({ ...defValue });

  const [message, setMassege] = useState(null);

  const check = (obj) => {
    for (const props in obj) {
      console.log(obj);
      if (obj[props] === "") {
        throw new Error();
      }
    }
  };
  const handleChange = (e) => {
    console.log(e.target.name);
    setData({
      ...data,
      [e.target.name]: e.target.value,
      // createBy: state.user.id,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = { headers: { "Content-type": "application/json" } };

      const body = JSON.stringify({ ...data, createBy: state.user.id });
      check(data);
      const response = await API.post("/registrasi/add", body, config);
      console.log(response);
      if (state.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate(`/form-pembayaran/edit/${id}`);
      }
    } catch (error) {
      console.log(error);
      setMassege(true);
    }
  };

  return (
    <div>
      {state.islogin ? <NavTop /> : <NavbarUser />}

      <Container className="mt-5">
        <div
          style={{
            marginTop: "100px",
          }}
        >
          <h3 className="mb-5">Form Pendaftaran Calon Peserta Didik</h3>
          <Row>
            <Col md={6}>
              <Form>
                {message && (
                  <Alert
                    variant="danger"
                    onClose={() => setMassege(false)}
                    dismissible
                  >
                    Data Tidak boleh Kosong
                  </Alert>
                )}
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
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select name="jenis_kelamin" onChange={handleChange}>
                    <option selected>Pilih jenis kelamin</option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="tempat_lahir"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder=""
                    name="tanggal_lahir"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Agama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="agama"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>No Handphone</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    name="nomer_hp"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Label className="mb-2">Alamat</Form.Label>
                <Form.Control
                  className="mb-3"
                  name="alamat"
                  onChange={handleChange}
                  as="textarea"
                  rows={3}
                  required
                />
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Lulusan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="lulusan"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>NISN</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder=""
                    name="nisn"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Nama Ibu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="nama_ibu"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Tempat Lahir Ibu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="tempat_lahirIbu"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Pekerjaan Ibu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="pekerjaanIbu"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Nama Ayah</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="nama_ayah"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Tempat lahir Ayah</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="tempat_lahirAyah"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Pekerjaan Ayah</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="pekerjaanAyah"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 px-5 "
                  onClick={handleSubmit}
                  // onClick={handleSubmit() => navigate("/registrasi")}
                >
                  Daftar
                </Button>
              </Form>
            </Col>
            <Col md={6} className="text-center">
              <img
                src={logo}
                alt=""
                style={{
                  width: "475px",
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
