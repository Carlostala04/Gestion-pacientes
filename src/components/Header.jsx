import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Home from "../assets/favicon/HomeIcon";
import Plus from "../assets/favicon/PlusIcon";
import Paper from "../assets/favicon/PaperIcon";
import "../styles/header.css"

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="page-title">
          <h2 className="title">MediRecord</h2>
          <span className="sub-title">Sistema de gestion de clinica</span>
        </div>
        <div className="buttons">
          <Button icon={Home} title={"Home"} onclick={() => navigate("/")} />
          <Button icon={Plus} title={"Nuevo paciente"} onclick={() => navigate("/register")} />
          <Button icon={Paper} title={"Historiales"} onclick={null} />
        </div>
        <div className="user">
          <h3 className="bubble">CF</h3>
          <h4 className="user-name">DR. Carlos R</h4>
        </div>
      </header>
    </>
  );
}
