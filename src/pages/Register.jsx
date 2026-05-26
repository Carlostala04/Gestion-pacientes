import React, { useState } from "react";
import Header from "../components/Header";
import Form from "../components/Form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";
import "../styles/form.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Arrow from "../assets/favicon/Arrow";
import DropDown from "../components/DropDown";
import { supabase } from "../lib/supabase";
import { useDoctor } from "../hooks/useDoctor";

export default function Register() {
  const navigate = useNavigate();
  const doctor = useDoctor();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [genero, setGenero] = useState("");
  const [condicion, setCondicion] = useState("");
  const [condicionOtro, setCondicionOtro] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("No hay sesión activa."); setSaving(false); return; }

    const { data: paciente, error: insertError } = await supabase
      .from("paciente")
      .insert({
        id_doctor: user.id,
        nombre,
        apellido,
        segundo_apellido: segundoApellido || null,
        telefono: telefono || null,
        direccion: direccion || null,
        fecha_nacimiento: fechaNacimiento instanceof Date
          ? fechaNacimiento.toISOString().split("T")[0]
          : fechaNacimiento,
        genero,
        fecha_registro: new Date().toISOString().split("T")[0],
      })
      .select("id")
      .single();

    if (insertError) {
      setError("Error al registrar el paciente.");
      console.error(insertError);
      setSaving(false);
      return;
    }

    const slug = condicion === "otro" && condicionOtro.trim() ? "otro" : condicion;
    if (slug) {
      const { data: enf } = await supabase
        .from("enfermedad_cronica")
        .select("id")
        .eq("slug", slug)
        .single();

      if (enf) {
        await supabase.from("paciente_enfermedad").insert({
          id_paciente: paciente.id,
          id_enfermedad: enf.id,
        });
      }
    }

    setSaving(false);
    navigate(`/patient/${paciente.id}`);
  }

  return (
    <>
      <Header user_name={doctor.nombre} user_last_name={doctor.apellido} />
      <section className="register-section">
        <div className="form-patient">
          <Form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Ej: Carlos"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              required
            />
            <label>Primer apellido:</label>
            <input
              type="text"
              placeholder="Ej: Talavera"
              onChange={(e) => setApellido(e.target.value)}
              value={apellido}
              required
            />
            <label>Segundo apellido:</label>
            <input
              type="text"
              placeholder="Ej: López"
              onChange={(e) => setSegundoApellido(e.target.value)}
              value={segundoApellido}
            />
            <label>Fecha de nacimiento:</label>
            <Calendar
              onChange={setFechaNacimiento}
              value={fechaNacimiento}
              locale="es"
            />
            <label>Número de teléfono:</label>
            <input
              type="tel"
              placeholder="Ej: 66778690"
              onChange={(e) => setTelefono(e.target.value)}
              value={telefono}
            />
            <label>Dirección:</label>
            <input
              type="text"
              placeholder="Ej: Barrio San José"
              onChange={(e) => setDireccion(e.target.value)}
              value={direccion}
            />
            <label>Género:</label>
            <DropDown
              placeholder="Seleccionar género..."
              value={genero}
              onChange={(value) => setGenero(value)}
              options={[
                { value: "masculino", label: "Masculino" },
                { value: "femenino",  label: "Femenino"  },
              ]}
            />
            <label>Condición crónica:</label>
            <DropDown
              placeholder="Seleccionar condición..."
              value={condicion}
              onChange={(value) => setCondicion(value)}
              options={[
                { value: "hipertenso", label: "Hipertenso/a"    },
                { value: "diabetico",  label: "Diabético/a"     },
                { value: "asmatico",   label: "Asmático/a"      },
                { value: "cardiaco",   label: "Cardíaco/a"      },
                { value: "renal",      label: "Renal crónico/a" },
                { value: "artritis",   label: "Artritis"        },
                { value: "tiroides",   label: "Tiroides"        },
                { value: "anemico",    label: "Anémico/a"       },
                { value: "alergico",   label: "Alérgico/a"      },
                { value: "otro",       label: "Otro"            },
              ]}
            />
            {condicion === "otro" && (
              <>
                <label>Especificar condición:</label>
                <input
                  type="text"
                  placeholder="Ej: Lupus, Fibromialgia..."
                  onChange={(e) => setCondicionOtro(e.target.value)}
                  value={condicionOtro}
                />
              </>
            )}
            {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}
            <button type="submit" className="form-submit-btn" disabled={saving}>
              {saving ? "Registrando..." : "Registrar paciente"}
            </button>
          </Form>
        </div>
        <div className="quicks-access">
          <h4>Accesos rápidos</h4>
          <div>
            <Button
              title={"Ir al inicio"}
              icon={Arrow}
              onclick={() => navigate("/home")}
              type={"access"}
            />
            <Button
              title={"Ir a Historiales"}
              icon={Arrow}
              onclick={() => navigate("/Record")}
              type={"access"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
