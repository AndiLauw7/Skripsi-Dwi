import React, { useContext } from "react";
import MyPage from "../components/myPage";
import avatarDummy from "../../assets/img/anakSd.jpg";
import { UserContext } from "../../context/userContext";

export default function Profile() {
  const [state, dispatch] = useContext(UserContext)
  return (
    <MyPage title={"Profile"}>
      <div className="d-flex justify-content-center align-items-center my-5">
        <img src={avatarDummy} className="rounded-circle" width={300}  />
      </div>
      <div className="text-center">
        <h5>{state.user.username}</h5>
      </div>
    </MyPage>
  );
}
