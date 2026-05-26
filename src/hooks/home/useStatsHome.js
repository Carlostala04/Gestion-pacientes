import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export function useStatsHome() {
  const [stats, setStats] = useState({
    pacientesMes: 0,
    consultasHoy: 0,
    pacientesActivos: 0,
    nuevosSemana: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const now = new Date();
      const today = now.toISOString().split("T")[0];
      const primerDiaMes = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString().split("T")[0];
      const haceSieteDias = new Date(now - 7 * 24 * 60 * 60 * 1000)
        .toISOString().split("T")[0];

      const [r1, r2, r3, r4] = await Promise.all([
        supabase
          .from("paciente")
          .select("id", { count: "exact", head: true })
          .eq("id_doctor", user.id)
          .gte("fecha_registro", primerDiaMes),
        supabase
          .from("consulta")
          .select("id", { count: "exact", head: true })
          .eq("id_doctor", user.id)
          .eq("fecha_consulta", today),
        supabase
          .from("paciente")
          .select("id", { count: "exact", head: true })
          .eq("id_doctor", user.id),
        supabase
          .from("paciente")
          .select("id", { count: "exact", head: true })
          .eq("id_doctor", user.id)
          .gte("fecha_registro", haceSieteDias),
      ]);

      setStats({
        pacientesMes: r1.count ?? 0,
        consultasHoy: r2.count ?? 0,
        pacientesActivos: r3.count ?? 0,
        nuevosSemana: r4.count ?? 0,
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  return { stats, loading };
}
