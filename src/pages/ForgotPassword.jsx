import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/login.css";

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function MailSentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function FormStep({ onSend }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    if (resetError) { setError("No se pudo enviar el correo. Verifica el email."); return; }
    onSend(email.trim());
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>Recupera tu contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un enlace para restablecerla</p>
      </div>
      <div className="fields-group">
        <div className="field">
          <label htmlFor="forgot-email">Correo electrónico</label>
          <input
            id="forgot-email"
            type="email"
            placeholder="doctor@clinica.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
        <Link to="/" className="back-to-login">
          <ArrowLeftIcon />
          Volver al inicio de sesión
        </Link>
      </div>
    </form>
  );
}

function SuccessStep({ email }) {
  return (
    <div className="auth-form">
      <div className="success-icon-wrapper">
        <MailSentIcon />
      </div>
      <div className="form-header">
        <h2>Revisa tu correo</h2>
        <p>
          Enviamos el enlace de recuperación a <strong>{email}</strong>. Úsalo para
          restablecer tu contraseña.
        </p>
      </div>
      <p className="spam-hint">
        ¿No lo ves? Revisa tu carpeta de spam o correo no deseado.
      </p>
      <Link to="/" className="btn-primary back-to-login-btn">
        Volver al inicio de sesión
      </Link>
    </div>
  );
}

export default function ForgotPassword() {
  const [sentTo, setSentTo] = useState(null);

  return (
    <div className="login-page">
      <aside className="decorative-panel">
        <div className="panel-brand">
          <h1>MediRecord</h1>
          <span>Sistema de gestión de clínica</span>
        </div>
        <div className="panel-quote">
          <span className="quotation-mark">"</span>
          <p>La seguridad de tus datos es nuestra prioridad.</p>
        </div>
        <p className="panel-footer">© 2025 MediRecord. Todos los derechos reservados.</p>
      </aside>

      <section className="form-section">
        <div className="form-wrapper form-wrapper--narrow">
          {sentTo ? (
            <SuccessStep email={sentTo} />
          ) : (
            <FormStep onSend={setSentTo} />
          )}
        </div>
      </section>
    </div>
  );
}
