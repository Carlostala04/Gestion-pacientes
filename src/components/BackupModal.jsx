import { useState } from "react";
import { createBackup } from "../lib/backup";
import "../styles/backupModal.css";

const STATE = { idle: "idle", running: "running", done: "done", error: "error" };

export default function BackupModal({ onClose }) {
  const [status, setStatus] = useState(STATE.idle);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleStart() {
    setStatus(STATE.running);
    setProgress({ done: 0, total: 0 });
    setErrorMsg("");
    try {
      const total = await createBackup((done, total) =>
        setProgress({ done, total })
      );
      setProgress({ done: total, total });
      setStatus(STATE.done);
    } catch (err) {
      if (err?.name === "AbortError") {
        setStatus(STATE.idle);
        return;
      }
      setErrorMsg(err?.message ?? "Error desconocido.");
      setStatus(STATE.error);
    }
  }

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className="backup-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="backup-modal">
        <div className="backup-modal-header">
          <div className="backup-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <div>
            <h3 className="backup-title">Crear respaldo</h3>
            <p className="backup-subtitle">Exporta el historial de todos tus pacientes en PDF</p>
          </div>
        </div>

        {status === STATE.idle && (
          <>
            <div className="backup-info">
              <div className="backup-info-item">
                <span className="backup-info-dot" />
                <span>Se generará un PDF por cada paciente con sus datos, condiciones crónicas y todas sus consultas</span>
              </div>
              <div className="backup-info-item">
                <span className="backup-info-dot" />
                <span>Podrás elegir la carpeta destino, incluyendo un disco duro externo</span>
              </div>
              <div className="backup-info-item">
                <span className="backup-info-dot" />
                <span>Requiere Google Chrome o Microsoft Edge</span>
              </div>
            </div>
            <div className="backup-actions">
              <button className="backup-btn-primary" onClick={handleStart}>
                Seleccionar carpeta y exportar
              </button>
              <button className="backup-btn-cancel" onClick={onClose}>Cancelar</button>
            </div>
          </>
        )}

        {status === STATE.running && (
          <div className="backup-progress-section">
            <p className="backup-progress-label">
              Generando PDFs… {progress.done} de {progress.total}
            </p>
            <div className="backup-progress-bar-track">
              <div className="backup-progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <p className="backup-progress-pct">{pct}%</p>
          </div>
        )}

        {status === STATE.done && (
          <>
            <div className="backup-result backup-result--success">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p>Se exportaron <strong>{progress.total} historiales</strong> correctamente.</p>
            </div>
            <div className="backup-actions">
              <button className="backup-btn-primary" onClick={onClose}>Listo</button>
            </div>
          </>
        )}

        {status === STATE.error && (
          <>
            <div className="backup-result backup-result--error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>{errorMsg}</p>
            </div>
            <div className="backup-actions">
              <button className="backup-btn-primary" onClick={() => setStatus(STATE.idle)}>Reintentar</button>
              <button className="backup-btn-cancel" onClick={onClose}>Cerrar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
