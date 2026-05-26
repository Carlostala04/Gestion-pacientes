import React from "react";
import Header from "../components/Header";
import { useReloj } from "../hooks/Reloj";
import "../styles/home.css";
import { getSaludoPorHora } from "../hooks/DateGreeting";
import InfoCards from "../components/InfoCards";
import CardList from "../components/CardList";
import "../styles/cardList.css";
import { useNavigate } from "react-router-dom";
import { usePacientesRecientes } from "../hooks/home/usePacientesRecientes";
import { useAgendaHoy } from "../hooks/home/useAgendaHoy";
import { useStatsHome } from "../hooks/home/useStatsHome";
import { useDoctor } from "../hooks/useDoctor";

export default function Home() {
  const todayDate = new Date().toLocaleDateString("es-NI", { dateStyle: "full" });
  const time = useReloj();
  const navigate = useNavigate();
  const doctor = useDoctor();
  const { pacientes: pacientesRecientes } = usePacientesRecientes();
  const { agenda: agendaDelDia } = useAgendaHoy();
  const { stats } = useStatsHome();

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <main className="home-screen">
        <section className="welcome">
          <h2 className="welcome-message">
            {getSaludoPorHora()}, DR {doctor.nombre}
          </h2>
          <h4 className="welcome-message">
            Hoy es <span>{todayDate}</span>
          </h4>
          <span className="time">{time.toLocaleTimeString("es-NI")}</span>
        </section>
        <section className="cards-section">
          <InfoCards
            title={"Pacientes del mes"}
            info_number={stats.pacientesMes}
            message={"Registrados este mes"}
          />
          <InfoCards
            title={"Consultas hoy"}
            info_number={stats.consultasHoy}
            message={"Realizadas hoy"}
          />
          <InfoCards
            title={"Pacientes activos"}
            info_number={stats.pacientesActivos}
            message={"Total registrados"}
          />
          <InfoCards
            title={"Nuevos esta semana"}
            info_number={stats.nuevosSemana}
            message={"Registrados"}
          />
        </section>
        <section className="table-section">
          <CardList
            title={"Agenda del dia"}
            action={() => navigate("/register")}
            button_title={"Registrar paciente"}
            data={agendaDelDia}
            renderItem={(p) => (
              <div className="data" key={p.id}>
                <span className="dot" style={{ backgroundColor: p.color }} />
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
            action={() => navigate("/Record")}
            data={pacientesRecientes}
            button_title={"Ver todos"}
            renderItem={(p) => (
              <div
                className="patient-row"
                key={p.id}
                onClick={() => navigate(`/patient/${p.id}`)}
              >
                <div
                  className="patient-avatar"
                  style={{
                    background: "linear-gradient(135deg, #5aabba, #3a8a9b)",
                    color: "#ffffff",
                  }}
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
