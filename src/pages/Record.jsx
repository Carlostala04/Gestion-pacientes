import React, { useState } from "react";
import Header from "../components/Header";
import DropDown from "../components/DropDown";
import PatientItem from "../components/PatientItem";
import BackupModal from "../components/BackupModal";
import "../styles/record.css";
import { useNavigate } from "react-router-dom";
import { usePacientes } from "../hooks/usePacientes";
import { useDoctor } from "../hooks/useDoctor";

const filterOptions = [
  { value: "recientes", label: "Visita más reciente" },
  { value: "az",        label: "Nombre A → Z" },
  { value: "za",        label: "Nombre Z → A" },
  { value: "antiguos",  label: "Registro más antiguo" },
];

export default function Record() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showBackup, setShowBackup] = useState(false);
  const navigate = useNavigate();
  const doctor = useDoctor();
  const { pacientes, loading } = usePacientes();

  const visiblePatients = pacientes
    .filter((p) => {
      if (!search.trim()) return true;
      const full = `${p.name_patient} ${p.last_name_patient} ${p.second_last_name_patiente}`.toLowerCase();
      return full.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (filter === "az") return a.name_patient.localeCompare(b.name_patient, "es");
      if (filter === "za") return b.name_patient.localeCompare(a.name_patient, "es");
      if (filter === "recientes")
        return new Date(b.last_visit_date) - new Date(a.last_visit_date);
      if (filter === "antiguos") return a.id - b.id;
      return 0;
    });

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <div className="record-wrapper">
        <section className="record-title">
          <div className="record-title-row">
            <div>
              <h2 className="title-record">Historial de pacientes</h2>
              <h4 className="subtitle">Consulta historial clínico de cada paciente</h4>
            </div>
            <button className="backup-trigger-btn" onClick={() => setShowBackup(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Crear respaldo
            </button>
          </div>
        </section>
        <section className="search">
          <div className="search-input-wrapper">
            <input
              placeholder="Buscar paciente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <DropDown
              options={filterOptions}
              value={filter}
              onChange={(val) => setFilter(val === filter ? "" : val)}
              placeholder="Ordenar por..."
            />
          </div>
        </section>
        <section className="record-patients-container">
          <div className="record-patients">
            <div className="record-header">
              <span className="record-header-title">Lista de pacientes</span>
              <span className="record-header-counter">
                {visiblePatients.length} de {pacientes.length} registros
              </span>
            </div>
            <div className="record-body">
              <div className="record-items">
                {loading ? (
                  <p className="record-empty">Cargando pacientes...</p>
                ) : visiblePatients.length > 0 ? (
                  visiblePatients.map((p) => (
                    <PatientItem
                      key={p.id}
                      name_patient={p.name_patient}
                      last_name_patient={p.last_name_patient}
                      second_last_name_patiente={p.second_last_name_patiente}
                      birth_date={p.birth_date}
                      last_visit_date={p.last_visit_date}
                      onClick={() => navigate(`/patient/${p.id}`)}
                    />
                  ))
                ) : (
                  <p className="record-empty">
                    No se encontraron pacientes con ese nombre.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        Haz clic en un paciente para ver su historial clínico detallado
      </footer>

      {showBackup && <BackupModal onClose={() => setShowBackup(false)} />}
    </>
  );
}
