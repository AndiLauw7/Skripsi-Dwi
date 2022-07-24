import React from "react";
import MyPage from "../components/myPage";
import Navbar from "../components/navbar";
import logo from "../../assets/img/panggung-pentas.png";

export default function Home() {
  return (
    <div>
      {/* url={window.location.pathname} */}
      <MyPage title={"Home"}>
        <img src={logo} alt="" style={{ width: "100%" }} />
      </MyPage>
    </div>
  );
}
