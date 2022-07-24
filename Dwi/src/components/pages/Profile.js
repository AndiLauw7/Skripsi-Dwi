import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Container,
  Stack,
  Card,
  Row,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../navbars/NavbarUser";
import avatarDummy from "../../assets/img/anakSd.jpg";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import Close from "../../assets/img/close.png";
import Edit from "../../assets/img/edit.png";
export const path = "http://localhost:5000/uploads/";

function Profile() {
  const title = "Profile";
  document.title = "Sd Karya Bangsa | " + title;

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [preview, setPreview] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const [pembayaran, setPmbayaran] = useState([]);
  const [imgPembayaran, setImgPembayaran] = useState([]);


  const { id } = useParams();
  // const id = useMemo(() => {
  //   return state.user.id;
  //  },[]) 
  console.log(user, avatar, id, pembayaran.status_pembayaran);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (user.image) {
        formData.set("image", user?.image[0], user?.image[0]?.name);
      }
      formData.set("username", user.username);
      formData.set("email", user.email);

      const response = await API.patch(
        "/edit-user/" + user.id,
        formData,
        config
      );
      setEdit(false);
      dispatch({
        type: "USER_UPDATE",
        payload: { ...user, image: user?.image[0]?.name },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
    setPreview(avatar)
    navigate("/Profile/" + user.id);
  };

  const getPembayaran = async () => {
    const response = await API.get(`/pembayaran/${id}`);
    console.log(response);
    setPmbayaran(response.data.data.data);
    setImgPembayaran(response.data.data.data.bukti_pembayaran);
    console.log(response.data.data.data);
    console.log(response.data.data.data.bukti_pembayaran);
  };

  const getUser = async () => {
    const response = await API.get(`/user/${id}`);
    setAvatar(response.data.data.datauser.image);
    setUser(response.data.data.datauser);
    // setAvatar(response.data.data.datauser.image);
  };

  useEffect(() => {
    getUser()
    getPembayaran();
    // setImgPembayaran();
  }, [state]);

  return (
    <>
      <NavbarUser />
      <Container fluid className="px-5">
        <h1 className="my-5">
          <dt>My Profile</dt>
        </h1>
        <Stack className="justify-content-center align-items-center">
          {edit ? (
            <img
              src={Close}
              alt=""
              onClick={handleEdit}
              style={{ width: "20px", marginLeft: "10px" }}
            />
          ) : (
            <img
              src={Edit}
              alt=""
              onClick={handleEdit}
              style={{ width: "20px", marginLeft: "180px" }}
            />
          )}
          {edit ? (
            <Form onSubmit={handleSubmit}>
              <div className="text-center mt-3 mb-2">
                <img
                  src={preview === null ? avatarDummy : preview}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                  }}
                  alt=""
                />
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  name="image"
                  filename={user.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <>
              <img
                src={avatar === null ? avatarDummy : avatar}
                alt="avatar"
                className="rounded-circle border border-1 border-primary mb-3"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover"
                }}
              />
              <h4>
                {/* <p>{user.id}</p> */}
                <dt>Username : {user.username}</dt>
              </h4>
              <p>Email : {user.email}</p>
              {/* <p>Phone : {user.phone}</p>
              <p>Address : {user.address}</p> */}
              <ButtonGroup className="mb-2">
                <Button onClick={handleEdit}>Edit Profile</Button>
              </ButtonGroup>
            </>
          )}
        </Stack>
        <Row>
          <>
            <h2 className="my-3 fw-bold">Pembayaran Ku</h2>
            <hr
              style={{
                height: "2px",
                color: "black",
                backgroundColor: "black",
                marginBottom: "50px",
              }}
            />
          </>
          {
            pembayaran.length !== 0 ? (
              <div className="text-center">
                <p> Atas Nama Pembayaran : {pembayaran.nama_lengkap}</p>
                <p> Bukti Pembayaran</p>

                {
                  imgPembayaran !== null ? (

                    <img
                      src={imgPembayaran}
                      style={{ width: "250px ", borderRadius: "5px" }}
                      alt=""
                    />
                  ) : (<p>Anda Belum Menyelesaikan Pembayaran</p>)
                }

                <div>
                  {pembayaran.bukti_pembayaran !== null ?
                    <>
                      {pembayaran.status_pembayaran ? (
                        <p className="text-success fw-bold">
                          {" "}
                          Status Pembayaran : Sudah Lunas
                        </p>
                      ) : (
                        <p className="text-danger fw-bold">
                          {" "}
                          Status Pembayaran : pending
                        </p>
                      )}
                    </>

                    : (
                      <p className="text-danger fw-bold">
                        {" "}
                        Status Pembayaran : Belum Bayar
                      </p>
                    )}
                </div>
              </div>
            ) : (
              <p>Anda Belum Mengisi Form Pendaftaran</p>
            )
          }

        </Row>
      </Container>
    </>
  );
}

export default Profile;
