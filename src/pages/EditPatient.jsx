import React from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import "../styles/form.css";
import { useNavigate, useParams } from "react-router-dom";
import DropDown from "../components/DropDown";

const patientsData = [
  {
    id: 1,
    name_patient: "Carlos",
    last_name_patient: "López",
    second_last_name_patiente: "Herrera",
    birth_date: "1990-03-15",
    phone: "88223344",
    address: "Barrio San José",
    gender: "masculino",
  },
  {
    id: 2,
    name_patient: "María",
    last_name_patient: "González",
    second_last_name_patiente: "Vega",
    birth_date: "1985-07-22",
    phone: "77114455",
    address: "Colonia Centroamérica",
    gender: "femenino",
  },
  {
    id: 3,
    name_patient: "Andrés",
    last_name_patient: "Martínez",
    second_last_name_patiente: "Ruiz",
    birth_date: "2001-11-08",
    phone: "55667788",
    address: "Reparto Schick",
    gender: "masculino",
  },
  {
    id: 4,
    name_patient: "Sofía",
    last_name_patient: "Ramírez",
    second_last_name_patiente: "Castro",
    birth_date: "1998-01-30",
    phone: "83991122",
    address: "Las Brisas",
    gender: "femenino",
  },
];

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = patientsData.find((p) => p.id === Number(id)) ?? patientsData[0];

  const [name, setName] = useState(patient.name_patient);
  const [lastName, setLastName] = useState(patient.last_name_patient);
  const [secondLastName, setSecondLastName] = useState(patient.second_last_name_patiente);
  const [phone, setPhone] = useState(patient.phone);
  const [address, setAddress] = useState(patient.address);
  const [gender, setGender] = useState(patient.gender);
  const [birthDate, setBirthDate] = useState(new Date(patient.birth_date + "T00:00:00"));

  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"} />
      <section className="register-section">
        <div className="form-patient">
          <Form>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Primer apellido:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Segundo apellido:</label>
            <input
              type="text"
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
            />
            <label>Fecha de nacimiento:</label>
            <Calendar
              onChange={setBirthDate}
              value={birthDate}
              locale="es"
            />
            <label>Número de teléfono:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Dirección:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Género:</label>
            <DropDown
              placeholder="Seleccionar género..."
              value={gender}
              onChange={(value) => setGender(value)}
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "femenino", label: "Femenino" },
              ]}
            />
            <button type="submit" className="form-submit-btn">
              Guardar cambios
            </button>
          </Form>
        </div>
        <div className="quicks-access">
          <h4>Accesos rápidos</h4>
          <div>
            <button
              className="access"
              onClick={() => navigate(`/patient/${patient.id}`)}
            >
              Volver al paciente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              className="access"
              onClick={() => navigate("/Record")}
            >
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
