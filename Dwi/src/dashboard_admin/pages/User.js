import React, { useState } from "react";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../configAPI/api";
import MyPage from "../components/myPage";
import MyTable from "../components/myTable";

const columns = [
  {
    heading: "User Name",
    selector: "username",
  },
  {
    heading: "Email",
    selector: "email",
  },
  {
    heading: "Role",
    selector: "role",
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
        const response = await API.delete(`user/${id}`);
        setDataId(id);
        navigate(location.pathname);
      }
    });
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <RiDeleteBin2Line
        title="delete"
        className="text-danger"
        style={{ fontSize: 20, cursor: "pointer" }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default function User() {
  return (
    <MyPage title={"Users"}>
      <MyTable
        colAct={ActComp}
        columns={columns}
        pathAdd={"/dashboard/user/add"}
        url={"/users"}
      />
    </MyPage>
  );
}
