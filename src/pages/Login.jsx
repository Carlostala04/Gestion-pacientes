import { useState } from "react";
import LoginForm from "../components/LoginForm";
import "../styles/login.css";

const QUOTES = {
  login: "Cada paciente importa. Cada dato, también.",
  register: "Tu práctica médica, organizada desde el primer día.",
};

export default function Login() {
  const [mode, setMode] = useState("login");

  return (
    <div className="login-page">
      <aside className="decorative-panel">
        <div className="panel-brand">
          <h1>MediRecord</h1>
          <span>Sistema de gestión de clínica</span>
        </div>
        <div className="panel-quote">
          <span className="quotation-mark">"</span>
          <p>{QUOTES[mode]}</p>
        </div>
        <p className="panel-footer">© 2025 MediRecord. Todos los derechos reservados.</p>
      </aside>

      <section className="form-section">
        <div className="form-wrapper">
          <div className="toggle-control">
            <button
              type="button"
              className={`toggle-btn${mode === "login" ? " active" : ""}`}
              onClick={() => setMode("login")}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              className={`toggle-btn${mode === "register" ? " active" : ""}`}
              onClick={() => setMode("register")}
            >
              Registrarse
            </button>
          </div>
          <LoginForm mode={mode} onSwitch={setMode} />
        </div>
      </section>
    </div>
  );
}
