import React from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css"
import "../styles/form.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/favicon/Arrow";
import DropDown from "../components/DropDown";

export default function Register() {
  const navegate = useNavigate();
  const [paciente_name, setPaciente_name] = useState("");
  const [paciente_apellido, setPaciente_apellido] = useState("");
  const [paciente_telefono, setPaciente_telefono] = useState("");
  const [paciente_direccion, setPaciente_direccion] = useState("");
  const [paciente_fechan_naciemiento, setPaciente_fecha_nacimiento] = useState(
    new Date(),
  );
  const [paciente_genero, setPaciente_genero] = useState("");
  const [paciente_condicion, setPaciente_condicion] = useState("");
  const [paciente_condicion_otro, setPaciente_condicion_otro] = useState("");
  return (
    <>
      <Header user_name={"Carlos"} user_last_name={"Rodriguez"}/>
      <section className="register-section">
        <div className="form-patient">
          <Form>
            <label>Nombre: </label>
            <input
              type="text"
              placeholder="Ej: Carlos"
              onChange={(e) => setPaciente_name(e.target.value)}
              value={paciente_name}
              required
            />
            <label>Apellido:</label>
            <input
              type="text"
              placeholder="Ej: Talavera"
              onChange={(e) => setPaciente_apellido(e.target.value)}
              value={paciente_apellido}
              required
            />
            <label>Fecha de nacimiento:</label>
            <Calendar
              onChange={(e) => setPaciente_fecha_nacimiento(e.value)}
              value={paciente_fechan_naciemiento}
              dateFormat="dd/mm/yy"
              locale="es"
            />
            <label>Numero de telefono:</label>
            <input
              type="tel"
              placeholder="ej: 66778690"
              onChange={(e) => setPaciente_telefono(e.target.value)}
              value={paciente_telefono}
              required
            />
            <label>Direccion:</label>
            <input
              type="text"
              placeholder="Ej :Barrio san jose"
              onChange={(e) => setPaciente_direccion(e.target.value)}
              value={paciente_direccion}
            />
            <label>Genero:</label>
            <DropDown
              placeholder="Seleccionar genero..."
              value={paciente_genero}
              onChange={(value) => setPaciente_genero(value)}
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "femenino", label: "Femenino" },
              ]}
            />
            <label>Condición crónica:</label>
            <DropDown
              placeholder="Seleccionar condición..."
              value={paciente_condicion}
              onChange={(value) => setPaciente_condicion(value)}
              options={[
                { value: "hipertenso",  label: "Hipertenso/a"     },
                { value: "diabetico",   label: "Diabético/a"      },
                { value: "asmatico",    label: "Asmático/a"       },
                { value: "cardiaco",    label: "Cardíaco/a"       },
                { value: "renal",       label: "Renal crónico/a"  },
                { value: "artritis",    label: "Artritis"         },
                { value: "tiroides",    label: "Tiroides"         },
                { value: "anemico",     label: "Anémico/a"        },
                { value: "alergico",    label: "Alérgico/a"       },
                { value: "otro",        label: "Otro"             },
              ]}
            />
            {paciente_condicion === "otro" && (
              <>
                <label>Especificar condición:</label>
                <input
                  type="text"
                  placeholder="Ej: Lupus, Fibromialgia..."
                  onChange={(e) => setPaciente_condicion_otro(e.target.value)}
                  value={paciente_condicion_otro}
                />
              </>
            )}
            <button type="submit" className="form-submit-btn">
              Registrar paciente
            </button>
          </Form>
        </div>
        <div className="quicks-access">
          <h4>Accesos rapidos</h4>
          <div>
            <Button
              title={"Ir al inicio"}
              icon={Arrow}
              onclick={() => navegate("/home")}
              type={"access"}
            />
            <Button
              title={"Ir a Historiales"}
              icon={Arrow}
              onclick={() => navegate("/Record")}
              type={"access"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
