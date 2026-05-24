import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import InfoCards from "../components/InfoCards";
import Button from "../components/Button";
import { Plus } from "../assets/favicon/PlusIcon";
import { calculateAge } from "../hooks/CalculateAge";
import { calculateYearsAsPatient } from "../hooks/CalculateYearsAsPatient";
import { formatDateDetail } from "../hooks/FormatDateDetail";
import "../styles/patientDetails.css";

const conditionMeta = {
  hipertenso:  { label: "Hipertenso",   cls: "condition-hipertenso" },
  diabetico:   { label: "Diabético",    cls: "condition-diabetico"  },
  asmatico:    { label: "Asmático",     cls: "condition-asmatico"   },
  cardiaco:    { label: "Cardíaco",     cls: "condition-cardiaco"   },
  renal:       { label: "Renal crónico",cls: "condition-renal"      },
  artritis:    { label: "Artritis",     cls: "condition-artritis"   },
  tiroides:    { label: "Tiroides",     cls: "condition-tiroides"   },
  anemico:     { label: "Anémico",      cls: "condition-anemico"    },
  alergico:    { label: "Alérgico",     cls: "condition-alergico"   },
  otro:        { label: "Otro",         cls: "condition-otro"       },
};

const patientsData = [
  {
    id: 1,
    name_patient: "Carlos",
    last_name_patient: "López",
    second_last_name_patiente: "Herrera",
    birth_date: "1990-03-15",
    registration_date: "2021-06-10",
    conditions: ["hipertenso"],
    consultations: [
      {
        id: 1,
        date: "2021-09-05",
        time: "09:30",
        diagnosis: "Hipertensión arterial leve",
        observations: "Se recomienda dieta baja en sodio y ejercicio regular.",
      },
      {
        id: 2,
        date: "2022-02-18",
        time: "11:00",
        diagnosis: "Resfriado común",
        observations: "Prescripción de antihistamínico y reposo por 3 días.",
      },
      {
        id: 3,
        date: "2023-07-12",
        time: "10:15",
        diagnosis: "Control de presión arterial",
        observations: "Presión dentro de rangos normales, continuar medicación.",
      },
      {
        id: 4,
        date: "2024-11-03",
        time: "14:30",
        diagnosis: "Dolor lumbar crónico",
        observations: "Derivado a fisioterapia, se indica ibuprofeno 400mg.",
      },
      {
        id: 5,
        date: "2026-04-10",
        time: "08:45",
        diagnosis: "Revisión anual",
        observations: "Resultados de laboratorio dentro de los parámetros normales.",
      },
    ],
  },
  {
    id: 2,
    name_patient: "María",
    last_name_patient: "González",
    second_last_name_patiente: "Vega",
    birth_date: "1985-07-22",
    registration_date: "2023-03-05",
    conditions: ["otro"],
    consultations: [
      {
        id: 1,
        date: "2023-04-14",
        time: "10:00",
        diagnosis: "Gastritis aguda",
        observations: "Se prescribe omeprazol 20mg y dieta blanda.",
      },
      {
        id: 2,
        date: "2024-01-20",
        time: "15:30",
        diagnosis: "Migraña recurrente",
        observations: "Se indica sumatriptán y evitar exposición a luz intensa.",
      },
      {
        id: 3,
        date: "2026-05-01",
        time: "09:00",
        diagnosis: "Control de gastritis",
        observations: "Mejoría notable, se reduce dosis de medicamento.",
      },
    ],
  },
  {
    id: 3,
    name_patient: "Andrés",
    last_name_patient: "Martínez",
    second_last_name_patiente: "Ruiz",
    birth_date: "2001-11-08",
    registration_date: "2024-08-22",
    conditions: ["asmatico"],
    consultations: [
      {
        id: 1,
        date: "2024-09-10",
        time: "11:30",
        diagnosis: "Esguince de tobillo",
        observations: "Reposo, hielo y vendaje compresivo por 5 días.",
      },
      {
        id: 2,
        date: "2026-03-18",
        time: "16:00",
        diagnosis: "Faringitis bacteriana",
        observations: "Amoxicilina 500mg cada 8 horas por 7 días.",
      },
    ],
  },
  {
    id: 4,
    name_patient: "Sofía",
    last_name_patient: "Ramírez",
    second_last_name_patiente: "Castro",
    birth_date: "1998-01-30",
    registration_date: "2022-11-15",
    conditions: ["anemico", "alergico"],
    consultations: [
      {
        id: 1,
        date: "2023-02-08",
        time: "08:30",
        diagnosis: "Anemia ferropénica",
        observations: "Suplemento de hierro 60mg diario y dieta rica en hierro.",
      },
      {
        id: 2,
        date: "2023-09-25",
        time: "10:45",
        diagnosis: "Control de anemia",
        observations: "Niveles de hemoglobina en recuperación progresiva.",
      },
      {
        id: 3,
        date: "2024-06-17",
        time: "13:00",
        diagnosis: "Dermatitis alérgica",
        observations: "Crema de hidrocortisona 1% y evitar alérgenos identificados.",
      },
      {
        id: 4,
        date: "2026-05-12",
        time: "09:15",
        diagnosis: "Revisión general",
        observations: "Paciente en buen estado de salud general.",
      },
    ],
  },
];


export default function PatientDeatils() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patientsData.find((p) => p.id === Number(id)) ?? patientsData[0];

  const initials = (
    patient.name_patient.trim()[0] + patient.last_name_patient.trim()[0]
  ).toUpperCase();

  const age = calculateAge(patient.birth_date);
  const yearsAsPatient = calculateYearsAsPatient(patient.registration_date);
  const totalConsultations = patient.consultations.length;

  const sortedConsultations = [...patient.consultations].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"} />
      <div className="details-wrapper">
        <button className="details-back-btn" onClick={() => navigate("/Record")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al historial
        </button>

        <section className="details-title">
          <h2 className="title-details">Detalles del paciente</h2>
          <h4 className="subtitle-details">
            Información clínica y historial completo
          </h4>
        </section>

        <section className="details-profile-card">
          <div className="details-avatar">
            <span className="details-avatar-initials">{initials}</span>
          </div>
          <div className="details-profile-info">
            <h2 className="details-full-name">
              {`${patient.name_patient} ${patient.last_name_patient} ${patient.second_last_name_patiente}`}
            </h2>
            <div className="details-meta">
              <span className="details-meta-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                F. nac. {formatDateDetail(patient.birth_date)}
              </span>
              <span className="details-meta-dot">·</span>
              <span className="details-meta-item details-meta-age">
                {age} años
              </span>
            </div>
            {patient.conditions?.length > 0 && (
              <div className="condition-tags">
                {patient.conditions.map((key) => {
                  const meta = conditionMeta[key] ?? conditionMeta.otro;
                  return (
                    <span key={key} className={`condition-tag ${meta.cls}`}>
                      {meta.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div className="details-btn-group">
            <button
              className="btn-secondary"
              onClick={() => navigate(`/patient/${patient.id}/editar`)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar paciente
            </button>
            <Button
              icon={Plus}
              title="Nueva consulta"
              onclick={() => navigate(`/patient/${patient.id}/nueva-consulta`)}
            />
          </div>
        </section>

        <section className="details-kpis">
          <InfoCards
            title="Consultas totales"
            info_number={totalConsultations}
            message="Consultas registradas"
          />
          <InfoCards
            title="Diagnósticos"
            info_number={totalConsultations}
            message="Diagnósticos emitidos"
          />
          <InfoCards
            title="Años como paciente"
            info_number={yearsAsPatient}
            message="Desde su primer registro"
          />
        </section>

        <section className="details-timeline-section">
          <div className="details-timeline-header">
            <h3 className="details-timeline-title">Historial de consultas</h3>
            <span className="details-timeline-count">
              {totalConsultations} consultas
            </span>
          </div>
          <div className="details-timeline">
            {sortedConsultations.map((c, index) => (
              <div key={c.id} className="timeline-item">
                <div className="timeline-connector">
                  <div className="timeline-dot" />
                  {index < sortedConsultations.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
                <div className="timeline-content">
                  <div className="timeline-date-row">
                    <span className="timeline-date">{formatDateDetail(c.date)}</span>
                    <span className="timeline-time">{c.time}</span>
                    <button
                      className="timeline-edit-btn"
                      onClick={() =>
                        navigate(`/patient/${patient.id}/consulta/${c.id}/editar`)
                      }
                      title="Editar consulta"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                  </div>
                  <p className="timeline-diagnosis">{c.diagnosis}</p>
                  {c.observations && (
                    <p className="timeline-observations">{c.observations}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
