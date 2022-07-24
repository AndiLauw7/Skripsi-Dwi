import React, { useEffect, useState } from "react";
import { Navbar, Container, Button, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

function NavTop(props) {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand className="ps-3">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <img
                src={logo}
                alt="logo"
                width="60px"
                className=" position-absolute1"
              />
              <a
                style={{
                  fontSize: "15px",
                  fontWeight: "bolder",
                  padding: "0px  10px",
                  fontFamily: "sans-serif",
                }}
              >
                SD KARYA BANGSA
              </a>
            </Link>
          </Navbar.Brand>

          <Nav>
            <Nav.Link onClick={() => navigate("/")}>Menu Utama</Nav.Link>
            <Nav.Link onClick={() => navigate("/tentang-sd-karya-bangsa")}>
              Tentang Sekolah
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/fasilitas-sekolah")}>
              Fasilitas Sekolah
            </Nav.Link>
            <NavDropdown title="Pendaftaran" id="basic-nav-dropdown">
              <NavDropdown.Item
                id="ppdb"
                onClick={() => navigate("/registrasi")}
              >
                info PPDB
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Kontak</Nav.Link>
          </Nav>

          <div>
            <Button
              onClick={() => navigate("/login")}
              variant="primary"
              className="px-5 mx-3"
            >
              Login
            </Button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavTop;
