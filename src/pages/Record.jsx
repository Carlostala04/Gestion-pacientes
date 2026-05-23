import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import DropDown from "../components/DropDown";
import PatientItem from "../components/PatientItem";
import "../styles/record.css";
import { Link } from "react-router-dom";
const patients = [
  {
    id: 1,
    name_patient: "Carlos",
    last_name_patient: "López",
    second_last_name_patiente: "Herrera",
    birth_date: "1990-03-15",
    last_visit_date: "2026-04-10",
  },
  {
    id: 2,
    name_patient: "María",
    last_name_patient: "González",
    second_last_name_patiente: "Vega",
    birth_date: "1985-07-22",
    last_visit_date: "2026-05-01",
  },
  {
    id: 3,
    name_patient: "Andrés",
    last_name_patient: "Martínez",
    second_last_name_patiente: "Ruiz",
    birth_date: "2001-11-08",
    last_visit_date: "2026-03-18",
  },
  {
    id: 4,
    name_patient: "Sofía",
    last_name_patient: "Ramírez",
    second_last_name_patiente: "Castro",
    birth_date: "1998-01-30",
    last_visit_date: "2026-05-12",
  },
];

export default function Record() {
  const [patient, setPatient] = useState(null);
  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"} />
      <div className="record-wrapper">
        <section className="record-title">
          <h2 className="title-record">Historial de pacientes</h2>
          <h4 className="subtitle">
            Consulta historial clinico de cada paciente
          </h4>
        </section>
        <section className="search">
          <div className="search-input-wrapper">
            <input
              placeholder="Buscar paciente..."
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <DropDown />
          </div>
        </section>
        <section className="record-patients-container">
          <div className="record-patients">
            <div className="record-header">
              <span className="record-header-title">Lista de pacientes</span>
              <span className="record-header-counter">
                {patients.length} registros
              </span>
            </div>
            <div className="record-body">
              <div className="record-items">
                {patients.map((p) => (
                  <PatientItem
                    key={p.id}
                    name_patient={p.name_patient}
                    last_name_patient={p.last_name_patient}
                    second_last_name_patiente={p.second_last_name_patiente}
                    birth_date={p.birth_date}
                    last_visit_date={p.last_visit_date}
                    onClick={null}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        Haz clic en un paciente para ver su historial clínico detallado
      </footer>
    </>
  );
}
