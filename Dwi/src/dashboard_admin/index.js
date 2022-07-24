import React, { useContext, useEffect } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import LaporanDataSiswa from "./pages/LaporanDataSiswa";
import LaporanPembayaran from "./pages/LaporanPembayaran";
import MasterDataPembayaran from "./pages/MasterDataPembayaran";
import MasterDataSiswa from "./pages/MasterDataSiswa";
import User from "./pages/User";
import { UserContext } from "../context/userContext";
import TambahLaporanDataSiswa from "./pages/AddDataSiswa";
import AddDataSiswa from "./pages/AddDataSiswa";
import { EditDataSiswa } from "./pages/EditDataSiswa";
import EditDataPembayaran from "./pages/EditDataPembayaran";
import FormUserAdd from "./pages/FormUserAdd";

export default () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [state, dispatch] = useContext(UserContext);
  const user = state.user.role;

  useEffect(() => {
    if (localStorage.token) {
      if (user === "admin" || user === "kepalasekolah") {
        return navigate(location.pathname);
      } else if (user === "siswa") {
        return navigate("/")
      }
    } else {
      return navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Routes basename="/dashboard">
        {/* <Routes> */}
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/laporan_data_siswa"
          element={<LaporanDataSiswa />}
        />
        <Route
          exact
          path="/laporan_pembayaran"
          element={<LaporanPembayaran />}
        />
        <Route exact path="/master_data_siswa" element={<MasterDataSiswa />} />
        <Route
          exact
          path="/master_pembayaran"
          element={<MasterDataPembayaran />}
        />
        <Route
          exact
          path="/form-data-siswa/add"
          element={<AddDataSiswa />}
        />
        <Route
          exact
          path="/form-data-siswa/edit/:id"
          element={<EditDataSiswa />}
        />

        <Route exact path="/user/add" element={<FormUserAdd />} />

        <Route
          exact
          path="/form-data-pembayaran/edit/:id"
          element={<EditDataPembayaran />}
        />
        <Route exact path="/user" element={<User />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>

      {/* </Routes> */}

      {/* 
      if(user === admin){
        return halaman home 
      } else if (user === kepalasekolah){
        return halaman home
      } else {
        return Login
      }
      */}

      {/* {
          user === "admin" ? ( <Route exact path="/*" element={<HomePage />} />) : ( <Route exact path="/*" element={<Login />} /> )
      },
      {
         user === "kepalasekolah" ? ( <Route exact path="/*" element={<HomePage />} />)  : ( <Route exact path="/*" element={<Login />} /> )
      } */}
    </>
  );
};
