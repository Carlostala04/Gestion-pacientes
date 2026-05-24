import React from "react";
import Form from "../components/Form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerConsulta.css";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
import Header from "../components/Header";
import { imprimirPrescripcion } from "../hooks/ImprimirPrescripcion";

export default function RegisterConsulta() {
  const [diagnostic, setDiagnostic] = useState("");
  const [observations, setObservatios] = useState("");
  const [prescripcion, setPrescripcion] = useState("");
  const [typeDate, setTypeDate] = useState("");
  const [nextDate, setNextDate] = useState(null);
  const today = new Date().toLocaleDateString("es-NI", {
    dateStyle: "long",
  });
  return (
    <>
    <Header user_name={"Carlos"} user_last_name={"Rodriguez"}/>
      <div className="register-consulta">
        <div className="register-consulta-header">
          <span>Nueva consulta</span>
          <h1>Registro de consulta</h1>
        </div>
        <Form>
          <label>Dia de consulta (Hoy)</label>
          <input disabled placeholder={today} />
          <label>Diagnostico</label>
          <input
            type="text"
            placeholder="Diagnostico principal"
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
          />
          <label>Observaciones</label>
          <textarea
            placeholder="Sintomas, indicaciones..."
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            value={observations}
            onChange={(e) => setObservatios(e.target.value)}
          />
          <label>Proxima cita</label>
          <DatePicker
            selected={nextDate}
            onChange={(e) => setNextDate(e)}
            showTimeSelect
            dateFormat={"Pp"}
            placeholderText="Seleccione fecha y hora"
            isClearable
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Imprimir prescripción
            </button>
          )}
          <label>Tipo de consulta</label>
          <DropDown
            placeholder="Escoja el tipo de consulta de la proxima cita"
            value={typeDate}
            onChange={(value) => setTypeDate(value)}
            options={[
                { value: "Presencial", label: "Presencial" },
                { value: "Adomicilio", label: "Adomicilio" },
              ]}
          />
          <div className="form-divider" />
          <Button title={"Guardar cita"} onclick={null} type="form-submit-btn" />
        </Form>
      </div>
    </>
  );
}
