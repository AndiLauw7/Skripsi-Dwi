import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import guru from "../../assets/img/guru.jpg";
import { dataPost } from "../../dummyData/DataTentangSekolah";

import { Footer } from "../navbars/Footer";
import NavTop from "../navbars/NavTop";

export const TentangSekolah = () => {
  return (
    <div>
      {/* <NavTop /> */}
      <div
        className="tentang-sekolah "
        style={{
          backgroundColor: "#53A2F6",
          borderRadius: "5px",
          marginTop: "150px",
        }}
      >
        <Container fluid>
          <Row>
            <Col md={6}>
              {dataPost.map((dataPost) => {
                return (
                  <div style={{ textAlign: "left", color: "white" }}>
                    <h1 style={{ paddingLeft: "10px", paddingTop: "20px" }}>
                      Visi dan Misi
                    </h1>
                    <h3 style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                      Visi Sd Karya Bangsa
                    </h3>
                    <p style={{ paddingLeft: "20px" }}>{dataPost.visi}</p>
                    <h3 style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                      Misi Sd Karya Bangsa
                    </h3>
                    <ol style={{ marginBottom: "35px" }}>
                      <li>{dataPost.misi1}</li>
                      <li>{dataPost.misi2}</li>
                      <li>{dataPost.misi3}</li>
                      <li>{dataPost.misi4}</li>
                      <li>{dataPost.misi5}</li>
                    </ol>
                  </div>
                );
              })}
            </Col>
            <Col md={6}>
              <img
                src={guru}
                alt=""
                style={{
                  marginLeft: "12px",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
