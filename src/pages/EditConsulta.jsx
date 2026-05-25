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

const consultationsData = {
  1: [
    { id: 1, date: "2021-09-05", time: "09:30", diagnosis: "Hipertensión arterial leve", observations: "Se recomienda dieta baja en sodio y ejercicio regular.", type: "Presencial", nextDate: null, prescripcion: "Enalapril 10mg — 1 tableta cada 12 horas\nAmlodipino 5mg — 1 tableta al día" },
    { id: 2, date: "2022-02-18", time: "11:00", diagnosis: "Resfriado común", observations: "Prescripción de antihistamínico y reposo por 3 días.", type: "Presencial", nextDate: null, prescripcion: "Loratadina 10mg — 1 tableta al día por 5 días\nParacetamol 500mg — cada 8 horas si fiebre" },
    { id: 3, date: "2023-07-12", time: "10:15", diagnosis: "Control de presión arterial", observations: "Presión dentro de rangos normales, continuar medicación.", type: "Presencial", nextDate: null, prescripcion: null },
    { id: 4, date: "2024-11-03", time: "14:30", diagnosis: "Dolor lumbar crónico", observations: "Derivado a fisioterapia, se indica ibuprofeno 400mg.", type: "Adomicilio", nextDate: null, prescripcion: "Ibuprofeno 400mg — 1 tableta cada 8 horas con alimentos por 7 días\nMiorelajante: Metocarbamol 750mg — 1 tableta cada 12 horas" },
    { id: 5, date: "2026-04-10", time: "08:45", diagnosis: "Revisión anual", observations: "Resultados de laboratorio dentro de los parámetros normales.", type: "Presencial", nextDate: null, prescripcion: null },
  ],
  2: [
    { id: 1, date: "2023-04-14", time: "10:00", diagnosis: "Gastritis aguda", observations: "Se prescribe omeprazol 20mg y dieta blanda.", type: "Presencial", nextDate: null },
    { id: 2, date: "2024-01-20", time: "15:30", diagnosis: "Migraña recurrente", observations: "Se indica sumatriptán y evitar exposición a luz intensa.", type: "Presencial", nextDate: null },
    { id: 3, date: "2026-05-01", time: "09:00", diagnosis: "Control de gastritis", observations: "Mejoría notable, se reduce dosis de medicamento.", type: "Presencial", nextDate: null },
  ],
  3: [
    { id: 1, date: "2024-09-10", time: "11:30", diagnosis: "Esguince de tobillo", observations: "Reposo, hielo y vendaje compresivo por 5 días.", type: "Presencial", nextDate: null },
    { id: 2, date: "2026-03-18", time: "16:00", diagnosis: "Faringitis bacteriana", observations: "Amoxicilina 500mg cada 8 horas por 7 días.", type: "Presencial", nextDate: null },
  ],
  4: [
    { id: 1, date: "2023-02-08", time: "08:30", diagnosis: "Anemia ferropénica", observations: "Suplemento de hierro 60mg diario y dieta rica en hierro.", type: "Presencial", nextDate: null },
    { id: 2, date: "2023-09-25", time: "10:45", diagnosis: "Control de anemia", observations: "Niveles de hemoglobina en recuperación progresiva.", type: "Presencial", nextDate: null },
    { id: 3, date: "2024-06-17", time: "13:00", diagnosis: "Dermatitis alérgica", observations: "Crema de hidrocortisona 1% y evitar alérgenos identificados.", type: "Adomicilio", nextDate: null },
    { id: 4, date: "2026-05-12", time: "09:15", diagnosis: "Revisión general", observations: "Paciente en buen estado de salud general.", type: "Presencial", nextDate: null },
  ],
};

export default function EditConsulta() {
  const { id, consultaId } = useParams();
  const navigate = useNavigate();

  const patientConsultations = consultationsData[Number(id)] ?? [];
  const consulta = patientConsultations.find((c) => c.id === Number(consultaId)) ?? patientConsultations[0];

  const consultaDate = new Date(consulta.date + "T" + consulta.time + ":00").toLocaleDateString("es-NI", { dateStyle: "long" });

  const [diagnostic, setDiagnostic] = useState(consulta.diagnosis);
  const [observations, setObservations] = useState(consulta.observations);
  const [prescripcion, setPrescripcion] = useState(consulta.prescripcion ?? "");
  const [typeDate, setTypeDate] = useState(consulta.type);
  const [nextDate, setNextDate] = useState(consulta.nextDate);
  const [horaConsulta, setHoraConsulta] = useState(consulta.time ?? "");

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

  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"} />
      <div className="register-consulta">
        <div className="register-consulta-header">
          <span>Editar consulta</span>
          <h1>Modificar información</h1>
        </div>
        <Form>
          <label>Día de consulta</label>
          <input disabled placeholder={consultaDate} />
          <label>Hora de consulta</label>
          <input
            type="time"
            value={horaConsulta}
            onChange={(e) => setHoraConsulta(e.target.value)}
            disabled
          />
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
              onClick={() => imprimirPrescripcion({ diagnostic, prescripcion, consultaDate })}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
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
              { value: "Presencial", label: "Presencial" },
              { value: "Adomicilio", label: "Adomicilio" },
            ]}
          />
          <div className="form-divider" />
          <div className="form-actions">
            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate(`/patient/${id}`)}
            >
              Cancelar
            </button>
            <Button title="Guardar cambios" onclick={null} type="form-submit-btn" />
          </div>
        </Form>
      </div>
    </>
  );
}
