import React, { useContext } from "react";
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
  Stack,
} from "react-bootstrap";
import avatarDummy from "../../../assets/img/anakSd.jpg";
import {
  RiFolderUserLine,
  RiHandCoinLine,
  RiLogoutCircleRLine,
  RiTeamLine,
  RiUser3Line,
} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

export default () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const user = state.user.role;

  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ position: "relative", zIndex: 9999 }}
      >
        <Container>
          <Navbar.Brand>SD Karya Bangsa</Navbar.Brand>
          <Nav className="ms-auto pe-5">
            <Nav.Link className="mx-2" onClick={() => navigate("/dashboard")}>
              Home
            </Nav.Link>

            <NavDropdown title="Laporan" className="mx-2 drop-down">
              <NavDropdown.Item
                onClick={() => navigate("/dashboard/laporan_data_siswa")}
              >
                Laporan Peserta Didik
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => navigate("/dashboard/laporan_pembayaran")}
              >
                Laporan Pembayaran
              </NavDropdown.Item>
            </NavDropdown>

            {user !== "kepalasekolah" ? (
              <>
                <NavDropdown title="Master" className="mx-2">
                  <NavDropdown.Item
                    onClick={() => navigate("/dashboard/master_data_siswa")}
                  >
                    Data Peserta Didik
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => navigate("/dashboard/master_pembayaran")}
                  >
                    Data Pembayaran
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/dashboard/user")}>
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              ""
            )}
          </Nav>

          <Nav>
            <Stack>
              <Dropdown align="end">
                <Dropdown.Toggle as={Nav.Link} className="Dropdown-Toggle">
                  <img
                    src={avatarDummy}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      objectFit: "cover",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-dark shadow">
                  <Dropdown.Item
                    className="py-3"
                    onClick={() => navigate(`/dashboard/profile`)}
                  >
                    <span>
                      <RiUser3Line size={30} />
                    </span>
                    <span className="fw-bold ms-3">Profile</span>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogOut}>
                    <span>
                      <RiLogoutCircleRLine size={30} />
                    </span>
                    <span className="fw-bold ms-3">Log Out</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
