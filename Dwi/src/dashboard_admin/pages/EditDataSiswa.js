import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import logo from "../../assets/img/PPDB.jpeg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../configAPI/api";
import { UserContext } from "../../context/userContext";
import moment from "moment";
import MyPage from "../components/myPage";

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
  createBy: "",
};

export const EditDataSiswa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [state, dispatch] = useContext(UserContext);
  const [data, setData] = useState({ ...defValue });
  console.log(data);

  const handleChange = (e) => {
    console.log(e.target.name);
    setData({
      ...data,
      [e.target.name]: e.target.value,
      createBy: state.user.id,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = { headers: { "Content-type": "application/json" } };
      const body = JSON.stringify(data);
      const response = await API.patch(`/registrasi/${id}`, body, config);
      console.log(response);
      if (response.status === 201) {
        navigate("/dashboard/master_data_siswa");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await API.get(`/registrasi/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <MyPage title={"Edit Data Siswa"} url={location.pathname}>
        <Container className="mt-5">
          <div>
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
                      value={data.nama_lengkap}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                    required
                  >
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select
                      name="jenis_kelamin"
                      onChange={handleChange}
                      value={data.jenis_kelamin}
                    >
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
                      value={data.tempat_lahir}
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
                      value={data.tanggal_lahir}
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
                      value={data.agama}
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
                      value={data.nomer_hp}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Label className="mb-2">Alamat</Form.Label>
                  <Form.Control
                    className="mb-3"
                    name="alamat"
                    value={data.alamat}
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
                      value={data.lulusan}
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
                      value={data.nisn}
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
                      value={data.nama_ibu}
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
                      value={data.tempat_lahirIbu}
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
                      value={data.pekerjaanIbu}
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
                      value={data.nama_ayah}
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
                      value={data.tempat_lahirAyah}
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
                      value={data.pekerjaanAyah}
                      name="pekerjaanAyah"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100 px-5 "
                    onClick={handleSubmit}
                  >
                    Simpan
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
      </MyPage>
    </div>
  );
};
