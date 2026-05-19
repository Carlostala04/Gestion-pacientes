import React from "react";
import Form from "../components/Form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/registerConsulta.css";
import Button from "../components/Button";
import DropDown from "../components/DropDown";
export default function RegisterConsulta() {
  const [diagnostic, setDiagnostic] = useState("");
  const [observations, setObservatios] = useState("");
  const [typeDate, setTypeDate] = useState("");
  const [nextDate, setNextDate] = useState(null);
  const today = new Date().toLocaleDateString("es-NI", {
    dateStyle: "long",
  });
  return (
    <>
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
