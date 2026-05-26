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
import { usePacienteDetalle } from "../hooks/usePacienteDetalle";
import { useDoctor } from "../hooks/useDoctor";

const conditionMeta = {
  hipertenso: { label: "Hipertenso",    cls: "condition-hipertenso" },
  diabetico:  { label: "Diabético",     cls: "condition-diabetico"  },
  asmatico:   { label: "Asmático",      cls: "condition-asmatico"   },
  cardiaco:   { label: "Cardíaco",      cls: "condition-cardiaco"   },
  renal:      { label: "Renal crónico", cls: "condition-renal"      },
  artritis:   { label: "Artritis",      cls: "condition-artritis"   },
  tiroides:   { label: "Tiroides",      cls: "condition-tiroides"   },
  anemico:    { label: "Anémico",       cls: "condition-anemico"    },
  alergico:   { label: "Alérgico",      cls: "condition-alergico"   },
  otro:       { label: "Otro",          cls: "condition-otro"       },
};

export default function PatientDeatils() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = useDoctor();
  const { patient, loading } = usePacienteDetalle(id);

  if (loading) {
    return (
      <>
        <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
        <div className="details-wrapper">
          <p style={{ padding: "2rem" }}>Cargando paciente...</p>
        </div>
      </>
    );
  }

  if (!patient) {
    return (
      <>
        <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
        <div className="details-wrapper">
          <p style={{ padding: "2rem" }}>Paciente no encontrado.</p>
        </div>
      </>
    );
  }

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
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <div className="details-wrapper">
        <button className="details-back-btn" onClick={() => navigate("/Record")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver al historial
        </button>

        <section className="details-title">
          <h2 className="title-details">Detalles del paciente</h2>
          <h4 className="subtitle-details">Información clínica y historial completo</h4>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                F. nac. {formatDateDetail(patient.birth_date)}
              </span>
              <span className="details-meta-dot">·</span>
              <span className="details-meta-item details-meta-age">{age} años</span>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <span className="details-timeline-count">{totalConsultations} consultas</span>
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                  </div>
                  <p className="timeline-diagnosis">{c.diagnosis}</p>
                  {c.observations && (
                    <p className="timeline-observations">{c.observations}</p>
                  )}
                  {c.prescripcion && (
                    <div className="timeline-prescripcion">
                      <span className="timeline-prescripcion-label">Rx</span>
                      <p>{c.prescripcion}</p>
                    </div>
                  )}
                  {c.nextDate && (
                    <div className="timeline-next-appointment">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>Próxima cita: {formatDateDetail(c.nextDate)}{c.nextTime ? ` · ${c.nextTime.slice(0, 5)}` : ""}</span>
                    </div>
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
