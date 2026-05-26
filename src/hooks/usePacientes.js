import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from("paciente")
        .select(`
          id,
          nombre,
          apellido,
          segundo_apellido,
          fecha_nacimiento,
          consulta (fecha_consulta)
        `)
        .eq("id_doctor", user.id)
        .order("nombre");

      if (error) { console.error(error); setLoading(false); return; }

      setPacientes(
        data.map((p) => {
          const fechas = (p.consulta ?? []).map((c) => c.fecha_consulta);
          const ultima = fechas.sort((a, b) => new Date(b) - new Date(a))[0] ?? null;
          return {
            id: p.id,
            name_patient: p.nombre,
            last_name_patient: p.apellido,
            second_last_name_patiente: p.segundo_apellido,
            birth_date: p.fecha_nacimiento,
            last_visit_date: ultima,
          };
        })
      );
      setLoading(false);
    }
    fetchData();
  }, []);

  return { pacientes, loading };
}
