import moment from "moment";
import React, { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiDeleteBin2Line,
  RiEdit2Line,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../configAPI/api";
import ImgModal from "../components/modal/ImgModal";
import MyPage from "../components/myPage";
import MyTable from "../components/myTable";

const columns = [
  {
    heading: "Nama Siswa",
    selector: "registrasi.nama_lengkap",
  },
  {
    heading: "Nama pembayaran",
    selector: "nama_lengkap",
    format: (nama_lengkap) => {
      return <>{nama_lengkap === null ? "-" : nama_lengkap}</>;
    },
  },
  {
    heading: "Tanggal Pembayaran",
    selector: "tanggal_pembayaran",
    format: (tanggal_pembayaran) => {
      return (
        <>
          {tanggal_pembayaran === null
            ? "-"
            : moment(tanggal_pembayaran).format("DD-MMM-YYYY")}
        </>
      );
    },
  },
  {
    heading: "Bukti Pembayaran",
    selector: "bukti_pembayaran",
    format: function Format(bukti_pembayaran) {
      const [imgModal, setImgModal] = useState(false);
      const handleOpen = () => setImgModal(!imgModal);
      const handleClose = () => setImgModal(!imgModal);
      return (
        <>
          {bukti_pembayaran === "http://localhost:5000/uploads/null" ? (
            <p>-</p>
          ) : (
            <div onClick={handleOpen} className="text-center">
              <img src={bukti_pembayaran} alt="img" width={100} />
            </div>
          )}
          <ImgModal
            show={imgModal}
            handleClose={handleClose}
            img={bukti_pembayaran}
          />
        </>
      );
    },
  },
  {
    heading: "Status",
    selector: "status_pembayaran",
    format: (status_pembayaran) => {
      console.log(status_pembayaran);
      return (
        <>
          {status_pembayaran ? (
            <p className="text-success fw-bold">Sudah Lunas</p>
          ) : (
            <p className="text-danger fw-bold">Belum Bayar</p>
          )}
        </>
      );
    },
  },
];

const ActComp = (data, setDataId) => {
  const [selectData, setSelectData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = data;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure Delete..",
      text: data.nama_lengkap,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await API.delete(`/pembayaran/${id}`);
        setDataId(id);
        navigate(location.pathname);
      }
    });
  };

  const handleAcc = async () => {
    Swal.fire({
      title: "Are you sure Accept",
      text: data.nama_lengkap,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await API.patch(`/pembayaran/accept/${id}`);
        setDataId(id);
        navigate(location.pathname);
      }
    });
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      {data.status_pembayaran === false ? (
        <>
          <RiCheckboxCircleLine
            title="Accept"
            className="text-primary"
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={handleAcc}
          />
          <RiEdit2Line
            title="edit"
            className="text-success"
            style={{ fontSize: 20, cursor: "pointer" }}
            onClick={() =>
              navigate(`/dashboard/form-data-pembayaran/edit/${id}`)
            }
          />
        </>
      ) : (
        ""
      )}

      <RiDeleteBin2Line
        title="delete"
        className="text-danger"
        style={{ fontSize: 20, cursor: "pointer" }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default function MasterDataPembayaran() {
  // const location = useLocation();url={location.pathname}
  return (
    <MyPage title={"Master Data Pembayaran"}>
      <MyTable colAct={ActComp} columns={columns} url={"/pembayaran"} />
    </MyPage>
  );
}
