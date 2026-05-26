import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function usePacienteDetalle(id) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const { data, error } = await supabase
        .from("paciente")
        .select(`
          id,
          nombre,
          apellido,
          segundo_apellido,
          fecha_nacimiento,
          fecha_registro,
          genero,
          telefono,
          direccion,
          paciente_enfermedad (
            enfermedad_cronica (slug)
          ),
          consulta (
            id,
            fecha_consulta,
            hora_consulta,
            diagnostico,
            observaciones,
            prescripcion,
            proxima_cita,
            hora_proxima_cita,
            tipo_consulta (nombre)
          )
        `)
        .eq("id", id)
        .single();

      if (error) { console.error(error); setLoading(false); return; }

      setPatient({
        id: data.id,
        name_patient: data.nombre,
        last_name_patient: data.apellido,
        second_last_name_patiente: data.segundo_apellido ?? "",
        birth_date: data.fecha_nacimiento,
        registration_date: data.fecha_registro,
        genero: data.genero,
        telefono: data.telefono,
        direccion: data.direccion,
        conditions: (data.paciente_enfermedad ?? []).map(
          (pe) => pe.enfermedad_cronica?.slug
        ).filter(Boolean),
        consultations: (data.consulta ?? []).map((c) => ({
          id: c.id,
          date: c.fecha_consulta,
          time: c.hora_consulta?.slice(0, 5) ?? "",
          diagnosis: c.diagnostico,
          observations: c.observaciones,
          prescripcion: c.prescripcion,
          nextDate: c.proxima_cita,
          nextTime: c.hora_proxima_cita?.slice(0, 5) ?? null,
          type: c.tipo_consulta?.nombre ?? "",
        })),
      });
      setLoading(false);
    }
    fetchData();
  }, [id]);

  return { patient, loading };
}
