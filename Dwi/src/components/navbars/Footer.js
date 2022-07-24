import React from "react";
import { Container, Row } from "react-bootstrap";
import logo from "../../assets/img/logo.png";

export const Footer = () => {
  return (
    <div
      className="text-center mt-5 footer"
      style={{
        color: "white",
        backgroundColor: "rgba(6,147,227,1)",
        fontFamily: "monospace",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      <div
        style={{
          color: "white",
          fontFamily: "sans-serif",
          fontSize: "20px",
          fontWeight: "lighter",
        }}
      >
        <p
          style={{
            paddingTop: "5px",
            fontSize: "10px",
          }}
        >
          <img src={logo} width="100px" alt="" />
        </p>
        <p
          style={{ paddingBottom: "5px", marginBottom: "0", fontSize: "15px" }}
        >
          Jl. H. Moh. Radi, Ranca Gede,
          <br />
          Desa Munjul, Kecamatan Solear, Kabupaten Tangerang.
          <br />
          Kode Pos : 15731 <br />
          Telp: 081316703200 <br />
          Email: Nurwa2n@gmail.com
        </p>
        <p
          style={{
            color: "white",
            backgroundColor: "#066",
            fontFamily: "monospace",
            fontSize: "15px",
            margin: "0",
          }}
        >
          &copy;SD Karya Bangsa 2022
        </p>
      </div>
    </div>
  );
};
