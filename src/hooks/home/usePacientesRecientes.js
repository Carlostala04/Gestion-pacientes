import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function formatRelative(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const days = Math.round((now - date) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 30) return `Hace ${days} días`;
  return date.toLocaleDateString("es-NI", { day: "2-digit", month: "short" });
}

export function usePacientesRecientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from("consulta")
        .select(`
          id,
          fecha_consulta,
          tipo_consulta (nombre),
          paciente (id, nombre, apellido)
        `)
        .eq("id_doctor", user.id)
        .order("fecha_consulta", { ascending: false })
        .limit(20);

      if (error) { console.error(error); setLoading(false); return; }

      const seen = new Set();
      const recientes = [];
      for (const c of data) {
        if (!seen.has(c.paciente.id)) {
          seen.add(c.paciente.id);
          recientes.push({
            id: c.paciente.id,
            nombre: `${c.paciente.nombre} ${c.paciente.apellido}`,
            iniciales: (c.paciente.nombre[0] + c.paciente.apellido[0]).toUpperCase(),
            tiempo: formatRelative(c.fecha_consulta),
            tipo: c.tipo_consulta?.nombre ?? "",
          });
          if (recientes.length === 4) break;
        }
      }

      setPacientes(recientes);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { pacientes, loading };
}
