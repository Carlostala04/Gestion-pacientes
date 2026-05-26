import React, { useState } from "react";
import Form from "../components/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerConsulta.css";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { imprimirPrescripcion } from "../hooks/ImprimirPrescripcion";
import { supabase } from "../lib/supabase";
import { useDoctor } from "../hooks/useDoctor";

export default function RegisterConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = useDoctor();

  const [diagnostic, setDiagnostic] = useState("");
  const [observations, setObservations] = useState("");
  const [prescripcion, setPrescripcion] = useState("");
  const [typeDate, setTypeDate] = useState("");
  const [nextDate, setNextDate] = useState(null);
  const [horaConsulta] = useState(() => new Date().toTimeString().slice(0, 5));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("es-NI", { dateStyle: "long" });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("No hay sesión activa."); setSaving(false); return; }

    const { data: tipoData } = await supabase
      .from("tipo_consulta")
      .select("id")
      .eq("nombre", typeDate)
      .single();

    const nextDateOnly = nextDate
      ? new Date(nextDate).toISOString().split("T")[0]
      : null;
    const nextTimeOnly = nextDate
      ? new Date(nextDate).toTimeString().slice(0, 5)
      : null;

    const { error: insertError } = await supabase.from("consulta").insert({
      id_paciente: Number(id),
      id_doctor: user.id,
      id_tipo_consulta: tipoData?.id ?? null,
      fecha_consulta: new Date().toISOString().split("T")[0],
      hora_consulta: horaConsulta,
      diagnostico: diagnostic,
      observaciones: observations,
      prescripcion: prescripcion || null,
      proxima_cita: nextDateOnly,
      hora_proxima_cita: nextTimeOnly,
    });

    setSaving(false);
    if (!insertError) navigate(`/patient/${id}`);
    else { console.error(insertError); setError("Error al guardar la consulta."); }
  }

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <div className="register-consulta">
        <div className="register-consulta-header">
          <span>Nueva consulta</span>
          <h1>Registro de consulta</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <label>Día de consulta (Hoy)</label>
          <input disabled placeholder={today} />
          <label>Hora de consulta</label>
          <input type="time" value={horaConsulta} disabled />
          <label>Diagnóstico</label>
          <input
            type="text"
            placeholder="Diagnóstico principal"
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
          />
          <label>Observaciones (Examen físico)</label>
          <textarea
            placeholder="Síntomas, indicaciones..."
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
          <label>Prescripción (opcional)</label>
          <textarea
            placeholder="Medicamentos, dosis, indicaciones..."
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            value={prescripcion}
            onChange={(e) => setPrescripcion(e.target.value)}
          />
          {prescripcion.trim() && (
            <button
              type="button"
              className="btn-print"
              onClick={() => imprimirPrescripcion({ diagnostic, prescripcion })}
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
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Imprimir prescripción
            </button>
          )}
          <label>Próxima cita</label>
          <DatePicker
            selected={nextDate}
            onChange={(e) => setNextDate(e)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Seleccione fecha y hora"
            minDate={new Date()}
            isClearable
          />
          <label>Tipo de consulta</label>
          <DropDown
            placeholder="Escoja el tipo de consulta"
            value={typeDate}
            onChange={(value) => setTypeDate(value)}
            options={[
              { value: "Presencial",  label: "Presencial"  },
              { value: "A domicilio", label: "A domicilio" },
            ]}
          />
          {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}
          <div className="form-divider" />
          <Button
            title={saving ? "Guardando..." : "Guardar consulta"}
            onclick={null}
            type="form-submit-btn"
            disabled={saving}
          />
        </Form>
      </div>
    </>
  );
}
