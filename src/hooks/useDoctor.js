import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useDoctor() {
  const [doctor, setDoctor] = useState({ nombre: "", apellido: "" });

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("doctor")
        .select("nombre, apellido")
        .eq("id", user.id)
        .single();

      if (data) setDoctor(data);
    }
    fetchData();
  }, []);

  return doctor;
}
