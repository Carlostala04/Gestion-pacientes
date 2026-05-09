import React from "react";
import Header from "../components/Header";
import { useReloj } from "../hooks/Reloj";
import "../styles/home.css";

export default function Home() {
  const todayDate = new Date().toLocaleDateString("es-NI", {
    dateStyle: "full",
  });
  const time = useReloj();
  return (
    <>
      <Header />
      <main className="home-screen">
        <section className="welcome">
          <h2 className="welcome-message">Bienvenido DR Carlos</h2>
          <h4 className="date">
            Hoy es <span>{todayDate}</span>
          </h4>
          <span className="time">{time.toLocaleTimeString("es-NI")}</span>
        </section>
      </main>
    </>
  );
}
