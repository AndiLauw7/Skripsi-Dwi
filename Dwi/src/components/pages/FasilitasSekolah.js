import React, { useRef, useState, useEffect } from "react";

import { posts } from "../../dummyData/DataFasilitas";
import { motion } from "framer-motion";
import { MdOutlineStarPurple500 } from "react-icons/md";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import NavTop from "../navbars/NavTop";
import NavbarUser from "../navbars/NavbarUser";

export const FasilitasSekolah = ({ id }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);
  const [state, dispatch] = useState();

  return (
    <div
      id={id}
      // className="fasilitas-sekolah"
      style={{
        backgroundColor: " #474b4f",
        borderRadius: "5px",
        scrollMarginTop: "200px",
      }}
    >
      {/* {state.isLogin ? <NavbarUser /> : <NavTop />} */}

      <Row className="fasilitas-sekolah">
        <Col md={6}>
          <div
            style={{
              backgroundColor: " #1F71CF",
              borderRadius: "20px",
              justifyContent: "center",
              color: "white",
              marginLeft: "25px",
            }}
          >
            <h1
              className="mt-5"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                paddingTop: "35px",
                // marginBottom: "25px",
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
                paddingBottom: "45px",
              }}
            >
              Fasilitas yang diberikan oleh <br /> SD Karya Bangsa untuk
              <br /> menunjang kenyamanan proses <br /> belajar siswa – siswi (
              mencari ilmu ).
            </p>
          </div>
        </Col>
        <Col md={6}>
          <p
            className="title text-start text-white mb-5 "
            style={{
              fontWeight: "bolder",
              fontSize: "21px",
            }}
          ></p>
          <motion.div ref={carousel} className="carousel">
            <motion.div
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
                    <img src={post.image} alt="" />
                    <p className="text-start mt-1 text-white fw-bold fs-15 mb-1">
                      {post.title}
                    </p>

                    {/* <p className="start-first ">
                      <img src={star} alt="" />
                      <span className="rating1">{post.id}</span>
                    </p> */}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};
