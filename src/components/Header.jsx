import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Home from "../assets/favicon/HomeIcon";
import Plus from "../assets/favicon/PlusIcon";
import Paper from "../assets/favicon/PaperIcon";
import { supabase } from "../lib/supabase";
import "../styles/header.css";

export default function Header({ user_name, user_last_name }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const user_icon_initials = (user_name?.trim()[0] ?? "") + (user_last_name?.trim()[0] ?? "");

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header>
        <div className="page-title">
          <h2 className="title">MediRecord</h2>
          <span className="sub-title">Sistema de gestion de clinica</span>
        </div>
        <div className="buttons">
          <Button icon={Home} title={"Home"} onclick={() => navigate("/home")} />
          <Button
            icon={Plus}
            title={"Nuevo paciente"}
            onclick={() => navigate("/register")}
          />
          <Button
            icon={Paper}
            title={"Historiales"}
            onclick={() => navigate("/Record")}
          />
        </div>
        <div className="user-wrapper" ref={wrapperRef}>
          <div className="user" onClick={() => setMenuOpen((o) => !o)}>
            <h3 className="bubble">{user_icon_initials.toUpperCase()}</h3>
            <h4 className="user-name">
              DR. {`${user_name} ${user_last_name?.trim()[0]?.toUpperCase() ?? ""}`}
            </h4>
          </div>
          {menuOpen && (
            <div className="user-menu">
              <span
                className="user-menu-item"
                onClick={() => { navigate("/user"); setMenuOpen(false); }}
              >
                Editar perfil
              </span>
              <span
                className="user-menu-item user-menu-item--danger"
                onClick={async () => {
                  await supabase.auth.signOut();
                  setMenuOpen(false);
                  navigate("/");
                }}
              >
                Cerrar sesión
              </span>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
