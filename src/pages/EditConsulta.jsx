import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerConsulta.css";
import "../styles/form.css";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import { useNavigate, useParams } from "react-router-dom";
import { imprimirPrescripcion } from "../hooks/ImprimirPrescripcion";
import { usePacienteDetalle } from "../hooks/usePacienteDetalle";
import { useDoctor } from "../hooks/useDoctor";
import { supabase } from "../lib/supabase";

export default function EditConsulta() {
  const { id, consultaId } = useParams();
  const doctor = useDoctor();
  const { patient, loading } = usePacienteDetalle(id);

  if (loading) {
    return (
      <>
        <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
        <p style={{ padding: "2rem" }}>Cargando consulta...</p>
      </>
    );
  }

  const consulta = patient?.consultations.find((c) => c.id === Number(consultaId));

  if (!consulta) {
    return (
      <>
        <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
        <p style={{ padding: "2rem" }}>Consulta no encontrada.</p>
      </>
    );
  }

  return (
    <EditConsultaForm
      consulta={consulta}
      patientId={id}
      consultaId={consultaId}
      doctor={doctor}
    />
  );
}

function EditConsultaForm({ consulta, patientId, consultaId, doctor }) {
  const navigate = useNavigate();

  const consultaDate = new Date(
    consulta.date + "T" + (consulta.time || "00:00") + ":00"
  ).toLocaleDateString("es-NI", { dateStyle: "long" });

  const initialNextDate = consulta.nextDate
    ? consulta.nextTime
      ? new Date(`${consulta.nextDate}T${consulta.nextTime}:00`)
      : new Date(consulta.nextDate + "T00:00:00")
    : null;

  const [diagnostic, setDiagnostic] = useState(consulta.diagnosis ?? "");
  const [observations, setObservations] = useState(consulta.observations ?? "");
  const [prescripcion, setPrescripcion] = useState(consulta.prescripcion ?? "");
  const [typeDate, setTypeDate] = useState(consulta.type ?? "");
  const [nextDate, setNextDate] = useState(initialNextDate);
  const [saving, setSaving] = useState(false);

  const observationsRef = useRef(null);
  const prescripcionRef = useRef(null);

  useEffect(() => {
    [observationsRef, prescripcionRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

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

    const { error } = await supabase
      .from("consulta")
      .update({
        diagnostico: diagnostic,
        observaciones: observations,
        prescripcion: prescripcion || null,
        id_tipo_consulta: tipoData?.id ?? null,
        proxima_cita: nextDateOnly,
        hora_proxima_cita: nextTimeOnly,
      })
      .eq("id", consultaId);

    setSaving(false);
    if (!error) navigate(`/patient/${patientId}`);
    else console.error(error);
  }

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <div className="register-consulta">
        <div className="register-consulta-header">
          <span>Editar consulta</span>
          <h1>Modificar información</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <label>Día de consulta</label>
          <input disabled placeholder={consultaDate} />
          <label>Hora de consulta</label>
          <input type="time" value={consulta.time ?? ""} disabled />
          <label>Diagnóstico</label>
          <input
            type="text"
            placeholder="Diagnóstico principal"
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
          />
          <label>Observaciones</label>
          <textarea
            ref={observationsRef}
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
            ref={prescripcionRef}
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
              onClick={() =>
                imprimirPrescripcion({ diagnostic, prescripcion, consultaDate })
              }
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
          <div className="form-divider" />
          <div className="form-actions">
            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate(`/patient/${patientId}`)}
            >
              Cancelar
            </button>
            <Button
              title={saving ? "Guardando..." : "Guardar cambios"}
              onclick={null}
              type="form-submit-btn"
              disabled={saving}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
