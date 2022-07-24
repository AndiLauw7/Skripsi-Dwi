import moment from "moment";
import React, { useState } from "react";

import Navbar from "../components/navbar";

import {
  RiCheckboxCircleLine,
  RiDeleteBin2Line,
  RiEdit2Line,
} from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../configAPI/api";
import MyPage from "../components/myPage";
import MyTable from "../components/myTable";

const columns = [
  {
    heading: "Nama Siswa",
    selector: "registrasi.nama_lengkap",
  },
  {
    heading: "Nama Pembayaran",
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
    format: (bukti_pembayaran) => {
      console.log(bukti_pembayaran);
      return (
        <>
          {bukti_pembayaran === "http://localhost:5000/uploads/null" ? (
            <p>-</p>
          ) : (
            <img src={bukti_pembayaran} alt="img" width={100} />
          )}
        </>
      );
    },
  },
  {
    heading: "Status",
    selector: "status_pembayaran",
    format: (status_pembayaran) => {
      console.log(status_pembayaran);
      return <>{status_pembayaran ? <p>Sudah Lunas</p> : <p>Belum Bayar</p>}</>;
    },
  },
];

// const ActComp = (data, setDataId) => {
//   const [selectData, setSelectData] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { id } = data;

// const handleDelete = async () => {
//   Swal.fire({
//     title: "Are you sure Delete..",
//     text: data.nama_lengkap,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Delete",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       const response = await API.delete(`/pembayaran/${id}`);
//       setDataId(id);
//       navigate(location.pathname);
//     }
//   });
// };

// const handleAcc = async () => {
//   Swal.fire({
//     title: "Are you sure Accept",
//     text: data.nama_lengkap,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Save",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       const response = await API.patch(`/pembayaran/accept/${id}`);
//       setDataId(id);
//       navigate(location.pathname);
//     }
//   });
// };

// return (
//   <div style={{ display: "flex", gap: 24 }}>
//     <RiCheckboxCircleLine
//       title="Accept"
//       className="text-primary"
//       style={{ fontSize: 20, cursor: "pointer" }}
//       onClick={handleAcc}
//     />
//     <RiEdit2Line
//       title="edit"
//       className="text-success"
//       style={{ fontSize: 20, cursor: "pointer" }}
//       onClick={() => navigate(`/form-pembayaran/edit/${id}`)}
//     />
//     <RiDeleteBin2Line
//       title="delete"
//       className="text-danger"
//       style={{ fontSize: 20, cursor: "pointer" }}
//       onClick={handleDelete}
//     />
//   </div>
// );
// };

export default function LaporanDataPembayaran() {
  // const location = useLocation();
  // url={location.pathname}
  return (
    <MyPage title={"Laporan Data Pembayaran"}>
      <MyTable
        columns={columns}
        url={"/pembayaran-report"}
        dateRangePicker
        report
      />
      {/* colAct={ActComp}  */}
    </MyPage>
  );
}
