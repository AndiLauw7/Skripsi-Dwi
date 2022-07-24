import React, { useState, useContext, useEffect } from "react";
import { API } from "../../configAPI/api";

import {
  Col,
  Container,
  InputGroup,
  Form,
  Button,
  Stack,
  Row,
  Card,
} from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import HomeTitle from "./HomeTitle";
import CardPost from "../elements/CardPost";
import { TentangSekolah } from "./TentangSekolah";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import NavTop from "../navbars/NavTop";

function Home() {
  document.title = "| SD KARYA BANGSA";

  const [state, dispatch] = useContext(UserContext);

  const [alert, setAlert] = useState(null);

  return (
    <div>
      <Container fluid style={{ padding: 0 }}>
        {/* {state.isLogin ? <NavbarUser /> : <HomeTitle />} */}
        {/* {alert && alert} */}
      </Container>
    </div>
  );
}

export default Home;
