import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import "../styles/login.css";
import "../styles/user.css";

function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
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

export default function User() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? "");

      const [doctorRes, specialtiesRes] = await Promise.all([
        supabase.from("doctor").select("nombre, apellido, id_especialidad").eq("id", user.id).single(),
        supabase.from("especialidad").select("id, nombre"),
      ]);

      if (doctorRes.data) {
        setName(doctorRes.data.nombre ?? "");
        setLastName(doctorRes.data.apellido ?? "");
        setSpecialtyId(String(doctorRes.data.id_especialidad ?? ""));
      }
      if (specialtiesRes.data) setSpecialties(specialtiesRes.data);
      setLoading(false);
    }
    loadData();
  }, []);

  const displaySpecialty =
    specialtyId === "otra"
      ? customSpecialty || "Otra"
      : specialties.find((s) => String(s.id) === specialtyId)?.nombre ?? "";
  const initials = (name.trim()[0] || "") + (lastName.trim()[0] || "");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("No hay sesión activa."); setSaving(false); return; }

    let resolvedSpecialtyId = Number(specialtyId) || null;

    if (specialtyId === "otra") {
      if (!customSpecialty.trim()) { setError("Escribe el nombre de la especialidad."); setSaving(false); return; }

      const trimmed = customSpecialty.trim();

      const { data: existing } = await supabase
        .from("especialidad")
        .select("id, nombre")
        .ilike("nombre", trimmed)
        .maybeSingle();

      if (existing) {
        resolvedSpecialtyId = existing.id;
        setSpecialties((prev) =>
          prev.some((s) => s.id === existing.id) ? prev : [...prev, existing]
        );
        setSpecialtyId(String(existing.id));
        setCustomSpecialty("");
      } else {
        const { data: newSpec, error: specError } = await supabase
          .from("especialidad")
          .insert({ nombre: trimmed })
          .select("id")
          .single();
        if (specError) {
          setError(`Error al guardar la especialidad: ${specError.message}`);
          setSaving(false);
          return;
        }
        resolvedSpecialtyId = newSpec.id;
        setSpecialties((prev) => [...prev, { id: newSpec.id, nombre: trimmed }]);
        setSpecialtyId(String(newSpec.id));
        setCustomSpecialty("");
      }
    }

    const { error: doctorError } = await supabase
      .from("doctor")
      .update({ nombre: name, apellido: lastName, id_especialidad: resolvedSpecialtyId })
      .eq("id", user.id);

    if (doctorError) { setError("Error al guardar los datos."); setSaving(false); return; }

    if (password) {
      const { error: authError } = await supabase.auth.updateUser({ password });
      if (authError) { setError("Error al cambiar la contraseña."); setSaving(false); return; }
    }

    setSaving(false);
    navigate(-1);
  }

  if (loading) {
    return (
      <>
        <Header user_name="" user_last_name="" />
        <p style={{ padding: "2rem" }}>Cargando perfil...</p>
      </>
    );
  }

  return (
    <div className="user-page-layout">
      <Header user_name={name} user_last_name={lastName} />
      <main className="user-page-content">
        <aside className="profile-card">
          <div className="profile-card-banner" />
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{initials.toUpperCase()}</div>
          </div>
          <div className="profile-info">
            <p className="profile-name">DR. {name} {lastName}</p>
            <span className="profile-rol">{displaySpecialty || "Sin especialidad"}</span>
            <span className="profile-email">{email}</span>
          </div>
        </aside>

        <section className="edit-section">
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-header">
              <h2>Editar perfil</h2>
              <p>Actualiza tu información personal</p>
            </div>
            <div className="fields-group">
              <div className="field-row">
                <div className="field">
                  <label htmlFor="edit-name">Nombre</label>
                  <input
                    id="edit-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan"
                    autoComplete="given-name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="edit-lastname">Apellido</label>
                  <input
                    id="edit-lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="García"
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="edit-specialty">Especialidad</label>
                <select
                  id="edit-specialty"
                  value={specialtyId}
                  onChange={(e) => { setSpecialtyId(e.target.value); setCustomSpecialty(""); }}
                >
                  <option value="" disabled>Selecciona una especialidad</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={String(s.id)}>{s.nombre}</option>
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
                <label htmlFor="edit-email">Correo electrónico</label>
                <input
                  id="edit-email"
                  type="email"
                  value={email}
                  disabled
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="edit-password">
                  Nueva contraseña{" "}
                  <span className="optional-label">(opcional)</span>
                </label>
                <div className="password-wrapper">
                  <input
                    id="edit-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Deja vacío para no cambiar"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>
            </div>
            {error && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>}
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
