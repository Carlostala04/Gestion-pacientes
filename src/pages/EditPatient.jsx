import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import "../styles/form.css";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../components/DropDown";
import { usePacienteDetalle } from "../hooks/usePacienteDetalle";
import { useDoctor } from "../hooks/useDoctor";
import { supabase } from "../lib/supabase";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = useDoctor();
  const { patient, loading } = usePacienteDetalle(id);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!patient) return;
    setName(patient.name_patient);
    setLastName(patient.last_name_patient);
    setSecondLastName(patient.second_last_name_patiente);
    setPhone(patient.telefono ?? "");
    setAddress(patient.direccion ?? "");
    setGender(patient.genero ?? "");
    setBirthDate(new Date(patient.birth_date + "T00:00:00"));
  }, [patient]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("paciente")
      .update({
        nombre: name,
        apellido: lastName,
        segundo_apellido: secondLastName,
        telefono: phone,
        direccion: address,
        genero: gender,
        fecha_nacimiento: birthDate.toISOString().split("T")[0],
      })
      .eq("id", id);

    setSaving(false);
    if (!error) navigate(`/patient/${id}`);
    else console.error(error);
  }

  if (loading) {
    return (
      <>
        <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
        <p style={{ padding: "2rem" }}>Cargando paciente...</p>
      </>
    );
  }

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <section className="register-section">
        <div className="form-patient">
          <Form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Primer apellido:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <label>Segundo apellido:</label>
            <input type="text" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} />
            <label>Fecha de nacimiento:</label>
            <Calendar onChange={setBirthDate} value={birthDate} locale="es" />
            <label>Número de teléfono:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label>Dirección:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label>Género:</label>
            <DropDown
              placeholder="Seleccionar género..."
              value={gender}
              onChange={(value) => setGender(value)}
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "femenino",  label: "Femenino"  },
              ]}
            />
            <button type="submit" className="form-submit-btn" disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </Form>
        </div>
        <div className="quicks-access">
          <h4>Accesos rápidos</h4>
          <div>
            <button className="access" onClick={() => navigate(`/patient/${id}`)}>
              Volver al paciente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="access" onClick={() => navigate("/Record")}>
              Ir a historiales
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
