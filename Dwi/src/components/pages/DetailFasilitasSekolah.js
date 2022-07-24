import React, { useRef, useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { dataPost } from "../../dummyData/DataTentangSekolah";
import { DataTentang } from "../../dummyData/DetailTentangSekolah";
import NavTop from "../navbars/NavTop";
import logo from "../../assets/img/sd.jpeg";
import logo1 from "../../assets/img/guru.jpg";
import { Berita } from "../../dummyData/Berita";
import { Footer } from "../navbars/Footer";
import { posts } from "../../dummyData/DataFasilitas";
import { motion } from "framer-motion";
import { Kegiatan } from "../../dummyData/Kegiatan";
import { UserContext } from "../../context/userContext";
import NavbarUser from "../navbars/NavbarUser";

export const DetailFasilitasSekolah = () => {
  const [state, dispatch] = useContext(UserContext);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  return (
    <div>
      {/* <NavTop /> */}
      {state.isLogin ? <NavbarUser /> : <NavTop />}
      <Container fluid>
        <div
          className="fasilitasSekolah"
          style={{
            marginTop: "100px",
          }}
        >
          <Row>
            <Col>
              <div
                className="mt-5"
                style={{
                  justifyContent: "center",
                  color: "black",
                  marginLeft: "25px",
                  marginTop: "100px",
                }}
              >
                <h1
                  className="mt-5"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  FASILITAS
                </h1>
                <br />
                <p
                  className="mb-5"
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Fasilitas yang diberikan oleh <br /> SD Karya Bangsa untuk
                  <br /> menunjang kenyamanan proses <br /> belajar siswa –
                  siswi ( mencari ilmu ).
                </p>
              </div>
            </Col>
            <Col md={12}>
              <p
                className="title text-start text-white mb-3 "
                style={{
                  fontWeight: "bolder",
                  fontSize: "21px",
                  padding: "0",
                  margin: "0",
                }}
              ></p>
              <motion.div ref={carousel} className="carousel">
                <motion.div
                  style={{ width: "100%", height: "450px" }}
                  drag="x"
                  dragConstraints={{ right: 0, left: -width }}
                  className="inner-carousel"
                >
                  {posts.map((post) => {
                    return (
                      <motion.div
                        className="item"
                        key={post}
                        // onClick={handleDetail}
                      >
                        <img
                          src={post.image}
                          alt=""
                          style={{
                            padding: "10px",
                            margin: "10px",
                          }}
                        />
                        <p className="text-start mt-1 text-black fw-bold fs-15 mb-1">
                          {post.title}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </Col>
            <Col md={6} className="mt-5">
              <div style={{ marginLeft: "50px", marginTop: "125px" }}>
                <h1 className="mt-5 mb-2 text-center">
                  Kegiatan SD Karya Bangsa
                </h1>
                {Kegiatan.map((Kegiatan) => {
                  return (
                    <div className=" mb-3 text-center fw-bold">
                      <p>{Kegiatan.kegiatan}</p>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col md={6} className="mt-5">
              {Kegiatan.map((Kegiatan) => {
                return (
                  <div>
                    <div className="text-center ">
                      <img
                        style={{
                          width: "400px",
                          height: "400px",
                        }}
                        className="mt-3 mt-3"
                        src={Kegiatan.img}
                        alt=""
                      />
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
