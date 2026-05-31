import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function getStrength(password) {
  if (!password) return { level: 0, label: "", key: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: "Débil", key: "weak" };
  if (score === 2) return { level: 2, label: "Regular", key: "fair" };
  if (score === 3) return { level: 3, label: "Buena", key: "good" };
  return { level: 4, label: "Fuerte", key: "strong" };
}

function PasswordStrength({ password }) {
  const { level, label, key } = getStrength(password);
  if (!password) return null;
  return (
    <div className="password-strength">
      <div className="strength-bar">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`strength-segment${i <= level ? ` active ${key}` : ""}`} />
        ))}
      </div>
      <span className={`strength-label ${key}`}>{label}</span>
    </div>
  );
}

function LoginFields() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) { setError("Correo o contraseña incorrectos."); return; }
    navigate("/home");
  }

  return (
    <form className="auth-form" onSubmit={handleLogin} noValidate>
      <div className="form-header">
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa tus credenciales para continuar</p>
      </div>
      <div className="fields-group">
        <div className="field">
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            id="login-email"
            type="email"
            placeholder="doctor@clinica.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Contraseña</label>
          <div className="password-wrapper">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <Link to="/forgot-password" className="forgot-link">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
      {error && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
        <div className="divider">o continúa con</div>
        <button type="button" className="btn-google">
          <GoogleIcon />
          Iniciar sesión con Google
        </button>
      </div>
    </form>
  );
}

function RegisterFields() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("especialidad").select("id, nombre").then(({ data }) => {
      if (data?.length) setSpecialties(data);
    });
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let resolvedSpecialtyId = Number(specialtyId) || null;

    if (specialtyId === "otra") {
      if (!customSpecialty.trim()) { setError("Escribe el nombre de la especialidad."); setLoading(false); return; }

      const trimmed = customSpecialty.trim();

      const { data: existing } = await supabase
        .from("especialidad")
        .select("id")
        .ilike("nombre", trimmed)
        .maybeSingle();

      if (existing) {
        resolvedSpecialtyId = existing.id;
      } else {
        const { data: newSpec, error: specError } = await supabase
          .from("especialidad")
          .insert({ nombre: trimmed })
          .select("id")
          .single();
        if (specError) { setError(`Error al guardar la especialidad: ${specError.message}`); setLoading(false); return; }
        resolvedSpecialtyId = newSpec.id;
      }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellido,
          id_especialidad: resolvedSpecialtyId,
        },
      },
    });

    setLoading(false);
    if (error) { setError(error.message); return; }
    navigate("/home");
  }

  return (
    <form className="auth-form" onSubmit={handleRegister} noValidate>
      <div className="form-header">
        <h2>Crea tu cuenta</h2>
        <p>Completa tus datos para registrarte</p>
      </div>
      <div className="fields-group">
        <div className="field-row">
          <div className="field">
            <label htmlFor="reg-name">Nombre</label>
            <input id="reg-name" type="text" placeholder="Juan" autoComplete="given-name" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="reg-lastname">Apellido</label>
            <input id="reg-lastname" type="text" placeholder="García" autoComplete="family-name" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="reg-specialty">Especialidad</label>
          <select id="reg-specialty" value={specialtyId} onChange={(e) => { setSpecialtyId(e.target.value); setCustomSpecialty(""); }} required>
            <option value="" disabled>Selecciona una especialidad</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
            <option value="otra">Otra...</option>
          </select>
          {specialtyId === "otra" && (
            <input
              type="text"
              value={customSpecialty}
              onChange={(e) => setCustomSpecialty(e.target.value)}
              placeholder="Escribe la especialidad"
              autoFocus
              style={{ marginTop: "0.5rem" }}
            />
          )}
        </div>
        <div className="field">
          <label htmlFor="reg-email">Correo electrónico</label>
          <input id="reg-email" type="email" placeholder="doctor@clinica.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="reg-password">Contraseña</label>
          <div className="password-wrapper">
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <PasswordStrength password={password} />
        </div>
      </div>
      {error && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
        <div className="divider">o regístrate con</div>
        <button type="button" className="btn-google">
          <GoogleIcon />
          Registrarse con Google
        </button>
      </div>
    </form>
  );
}

export default function LoginForm({ mode }) {
  return mode === "login" ? <LoginFields /> : <RegisterFields />;
}
