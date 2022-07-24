import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dataPost } from "../../dummyData/DataTentangSekolah";
import { DataTentang } from "../../dummyData/DetailTentangSekolah";
import NavTop from "../navbars/NavTop";
import logo from "../../assets/img/sd.jpeg";
import logo1 from "../../assets/img/guru.jpg";
import { Berita } from "../../dummyData/Berita";
import { Footer } from "../navbars/Footer";
import { UserContext } from "../../context/userContext";
import NavbarUser from "../navbars/NavbarUser";

export const DetailTentangSekolah = () => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <div>
      {/* <NavTop /> */}
      {state.isLogin ? <NavbarUser /> : <NavTop />}
      <Container fluid>
        <div
          className="tentangSekolah"
          style={{
            marginTop: "100px",
          }}
        >
          <Row>
            <Col md={6}>
              <div className="text-center mt-5">
                <img src={logo} alt="" style={{ width: "500px" }} />
              </div>
              {DataTentang.map((DataTentang) => {
                return (
                  <div
                    className="text-start mt-3"
                    style={{
                      textAlign: "left",
                      marginLeft: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    <h2 className="mt-5 mb-4">
                      Latar Belakang Sd Karya Bangsa
                    </h2>
                    <p>{DataTentang.latarBelakang} </p>
                  </div>
                );
              })}
              {dataPost.map((dataPost) => {
                return (
                  <div
                    style={{
                      textAlign: "left",
                      marginLeft: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    <h2 className="mb-3 mt-5">Visi dan Misi</h2>
                    <h4>Visi Sd Karya Bangsa</h4>
                    <p>{dataPost.visi}</p>
                    <h4>Misi Sd Karya Bangsa</h4>
                    <ol>
                      <li>{dataPost.misi1}</li>
                      <li>{dataPost.misi2}</li>
                      <li>{dataPost.misi3}</li>
                      <li>{dataPost.misi4}</li>
                      <li>{dataPost.misi5}</li>
                    </ol>
                  </div>
                );
              })}
              <div className="text-center mt-5">
                <img src={logo1} alt="" style={{ width: "500px" }} />
              </div>
            </Col>
            <Col md={6}>
              <h1 className="mt-5 mb-2">Berita SD Karya Bangsa</h1>
              {Berita.map((Berita) => {
                return (
                  <div>
                    <p className=" mb-3">{Berita.berita}</p>
                    <div className="text-center ">
                      <img className="mt-3 mt-3" src={Berita.img} alt="" />
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      </Container>

      <Footer />
    </div>
  );
};
