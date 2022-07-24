import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../configAPI/api";
import MyPage from "../components/myPage";
import MyTable from "../components/myTable";

const columns = [
  {
    heading: "Tgl Registrasi",
    selector: "tgl_registrasi",
    format: ({ tgl_registrasi }) =>
      moment(tgl_registrasi).format("DD-MMM-YYYY"),
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
  {
    heading: "Lulusan ",
    selector: "lulusan",
  },
  {
    heading: "Nisn",
    selector: "nisn",
  },
  {
    heading: "Nama Ibu",
    selector: "nama_ibu",
  },
  {
    heading: "Tempat Lahir Ibu",
    selector: "tempat_lahirIbu",
  },
  {
    heading: "Pekerjaan Ibu",
    selector: "pekerjaanIbu",
  },
  {
    heading: "Nama Ayah",
    selector: "nama_ayah",
  },
  {
    heading: "Tempat Lahir ayah",
    selector: "tempat_lahirAyah",
  },
  {
    heading: "Pekerjaan Ayah",
    selector: "pekerjaanAyah",
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
        onClick={() => navigate(`/dashboard/form-data-siswa/edit/${id}`)}
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

// const dataSet= [
//   {
//     columns : [
//       {title: "Tanggal Registrasi"},
//       {title: "Nama Lengkap"},
//       {title: "Jenis Kelamin"},
//       {title: "Tempat Lahir"},
//       {title: "Tanggal Lahir"},
//       {title: "Agama"},
//       {title: "Alamat"},
//       {title: "Nomer HP"},

//       data:
//     ]
//   }
// ]

export default function MasterDataSiswa() {
  // const location = useLocation();url={location.pathname}
  return (
    <MyPage title={"Master Data Siswa"}>
      <MyTable
        colAct={ActComp}
        columns={columns}
        pathAdd={"/dashboard/form-data-siswa/add"}
        url={"/registrasi"}
        // expExcel
        // nameColExcel={"DATA SISWA"}
      />
    </MyPage>
  );
}
