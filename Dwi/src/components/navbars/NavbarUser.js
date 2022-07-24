import React, { useState, useContext, useEffect, useMemo } from "react";
import { UserContext } from "../../context/userContext";
import {
  Navbar,
  Container,
  Stack,
  Nav,
  Dropdown,
  Row,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import Swal from "sweetalert2";
import avatarDummy from "../../assets/img/anakSd.jpg";
import { API } from "../../configAPI/api";
import { RiHandCoinLine, RiLogoutCircleLine, RiUser3Line } from "react-icons/ri";
export const path = "http://localhost:5000/uploads/";

function NavbarUser() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const id = useMemo(() => {
   return state.user.id;
  },[state]) 

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure Log Out?",
      text: "You won't be able to log out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      }
    });
  };

  const getUser = async () => {
    const response = await API.get(`/user/${id}`);
    setAvatar(response.data.data.datauser.image);
  };

  useEffect(() => {
    getUser();
    // setAvatar(state.user.image)
  }, [state]);

  return (
    <Navbar bg="light" sticky="top" className="shadow">
      <Container className="justify-content-between align-items-center">
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="logo" width="60" />
          </Link>
        </Navbar.Brand>
        <Nav className="align-items-center">
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>Menu Utama</Nav.Link>
            <Nav.Link onClick={() => navigate("/tentang-sd-karya-bangsa")}>
              Tentang Sekolah
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/fasilitas-sekolah")}>
              Fasilitas Sekolah
            </Nav.Link>
            <NavDropdown title="Pendaftaran" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/form-ppdb")}>
                Informasi PPDB
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Kontak</Nav.Link>
          </Nav>
          <Stack>
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} className="Dropdown-Toggle">
                <img
                  src={avatar === null ? avatarDummy : avatar}
                  alt="avatar"
                  className="rounded-circle border border-1 border-primary "
                  style={{
                    width: "3rem",
                    height: "3rem",
                    objectFit: "cover",
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="text-dark shadow">
                <Dropdown.Item
                  className="py-3"
                  onClick={() => navigate(`/Profile/${id}`)}
                >
                  <span>
                    <RiUser3Line size={30} />
                  </span>
                  <span className="fw-bold ms-3">Profile</span>
                </Dropdown.Item>

                <Dropdown.Item
                  className="py-3"
                  onClick={() => navigate(`/form-pembayaran/edit/${id}`)}
                >
                  <span>
                    <RiHandCoinLine size={30} />
                  </span>
                  <span className="fw-bold ms-3">Pembayaran</span>
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogOut}>
                  <span>
                    <RiLogoutCircleLine size={30} />
                  </span>
                  <span className="fw-bold ms-3">Log Out</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarUser;
