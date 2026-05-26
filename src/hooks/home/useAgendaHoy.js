import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const COLORS = ["green", "blue", "brown"];

export function useAgendaHoy() {
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("consulta")
        .select(`
          id,
          hora_proxima_cita,
          tipo_consulta (nombre),
          paciente (nombre, apellido)
        `)
        .eq("id_doctor", user.id)
        .eq("proxima_cita", today)
        .order("hora_proxima_cita", { ascending: true });

      if (error) { console.error(error); setLoading(false); return; }

      setAgenda(
        data.map((c, i) => ({
          id: c.id,
          hora: c.hora_proxima_cita?.slice(0, 5) ?? "--:--",
          nombre: `${c.paciente.nombre} ${c.paciente.apellido}`,
          tipo: c.tipo_consulta?.nombre ?? "Consulta",
          color: COLORS[i % COLORS.length],
        }))
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  return { agenda, loading };
}
