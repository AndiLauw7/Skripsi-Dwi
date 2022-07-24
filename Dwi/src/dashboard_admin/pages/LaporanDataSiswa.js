import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../configAPI/api";
import Excel from "../components/importFile/Excel";
import MyPage from "../components/myPage";
import MyTable from "../components/myTable";

const columns = [
  {
    heading: "Tgl Registrasi",
    selector: "tgl_registrasi",
    format: (tgl_registrasi) => moment(tgl_registrasi).format("DD-MMM-YYYY"),
  },
  {
    heading: "Nama Lengkap",
    selector: "nama_lengkap",
  },
  {
    heading: "Jenis Kelamin",
    selector: "jenis_kelamin",
  },
  {
    heading: "Tempat Lahir",
    selector: "tempat_lahir",
  },
  {
    heading: "Tanggal Lahir",
    selector: "tanggal_lahir",
    format: (tanggal_lahir) => moment(tanggal_lahir).format("DD-MMM-YYYY"),
  },
  {
    heading: "Agama",
    selector: "agama",
  },
  {
    heading: "Alamat",
    selector: "alamat",
  },
  {
    heading: "Nomer HP",
    selector: "nomer_hp",
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
        const response = await API.delete(`registrasi/${id}`);
        setDataId(id);
        navigate(location.pathname);
      }
    });
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <RiEdit2Line
        title="edit"
        className="text-success"
        style={{ fontSize: 20, cursor: "pointer" }}
        onClick={() => navigate(`/form-ppdb/edit/${id}`)}
      />
      <RiDeleteBin2Line
        title="delete"
        className="text-danger"
        style={{ fontSize: 20, cursor: "pointer" }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default function MasterDataSiswa() {
  // const location = useLocation();

  return (
    <MyPage title={"Laporan Data Peserta Didik"}>
      <MyTable
        colAct={ActComp}
        columns={columns}
        pathAdd={"/dashboard/tambah-data-siswa"}
        url={"/registrasi-report"}
        dateRangePicker
        report
      />
    </MyPage>
  );
}
