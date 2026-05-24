import React from "react";
import Header from "../components/Header";
import { useReloj } from "../hooks/Reloj";
import "../styles/home.css";
import { getSaludoPorHora } from "../hooks/DateGreeting";
import InfoCards from "../components/InfoCards";
import CardList from "../components/CardList";
import "../styles/cardList.css";
import { useNavigate } from "react-router-dom";
const pacientesRecientes = [
  { id: 4, nombre: "Sofía Ramírez Castro",  iniciales: "SR", tiempo: "Hace 11 días", tipo: "Rutina"      },
  { id: 2, nombre: "María González Vega",   iniciales: "MG", tiempo: "Hace 22 días", tipo: "Seguimiento" },
  { id: 1, nombre: "Carlos López Herrera",  iniciales: "CL", tiempo: "10 abr",       tipo: "Rutina"      },
  { id: 3, nombre: "Andrés Martínez Ruiz",  iniciales: "AM", tiempo: "18 mar",       tipo: "Seguimiento" },
];

const agendaDelDia = [
  {
    id: 1,
    hora: "08:30",
    nombre: "María García López",
    tipo: "Control mensual",
    color: "green",
  },
  {
    id: 2,
    hora: "09:00",
    nombre: "Juan Ramírez Vega",
    tipo: "Primera consulta",
    color: "blue",
  },
  {
    id: 3,
    hora: "10:30",
    nombre: "Andrés Luna Pérez",
    tipo: "Resultados de laboratorio",
    color: "brown",
  },
  {
    id: 4,
    hora: "11:00",
    nombre: "Rosa Mejía Blanco",
    tipo: "Seguimiento postoperatorio",
    color: "green",
  },
  {
    id: 5,
    hora: "15:00",
    nombre: "Diego Flores Salas",
    tipo: "Consulta general",
    color: "blue",
  },
];
export default function Home() {
  const todayDate = new Date().toLocaleDateString("es-NI", {
    dateStyle: "full",
  });
  const time = useReloj();
  const navegate = useNavigate()

  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"}/>
      <main className="home-screen">
        <section className="welcome">
          <h2 className="welcome-message">{getSaludoPorHora()}, DR Carlos</h2>
          <h4 className="welcome-message">
            Hoy es <span>{todayDate}</span>
          </h4>
          <span className="time">{time.toLocaleTimeString("es-NI")}</span>
        </section>
        <section className="cards-section">
          <InfoCards
            title={"Pacientes del mes"}
            info_number={142}
            message={"+12 respecto al mes anterior"}
          />
          <InfoCards
            title={"Consultas hoy"}
            info_number={8}
            message={"3 pendientes"}
          />
          <InfoCards
            title={"Pacientes activos"}
            info_number={89}
            message={"Seguimiento activo"}
          />
          <InfoCards
            title={"Nuevos esta semana"}
            info_number={7}
            message={"Registrados"}
          />
        </section>
        <section className="table-section">
          <CardList
            title={"Agenda del dia"}
            action={()=>navegate("/register")}
            button_title={"Registrar paciente"}
            data={agendaDelDia}
            renderItem={(p) => (
              <div className="data" key={p.id}>
                <span
                  className="dot"
                  style={{ backgroundColor: p.color }}
                ></span>
                <span className="table-time">{p.hora}</span>
                <div className="data-info">
                  <span className="name">{p.nombre}</span>
                  <span className="tipo">{p.tipo}</span>
                </div>
              </div>
            )}
          />
          <CardList
            title={"Pacientes recientes"}
            action={() => navegate("/Record")}
            data={pacientesRecientes}
            button_title={"Ver todos"}
            renderItem={(p) => (
              <div className="patient-row" key={p.id} onClick={() => navegate(`/patient/${p.id}`)}>
                <div
                  className="patient-avatar"
                  style={{ background: "linear-gradient(135deg, #5aabba, #3a8a9b)", color: "#ffffff" }}
                >
                  {p.iniciales}
                </div>
                <div className="patient-info">
                  <span className="name">{p.nombre}</span>
                  <span className="patient-meta">{p.tiempo}</span>
                </div>
                </div>
            )}
          />
        </section>
      </main>
    </>
  );
}
