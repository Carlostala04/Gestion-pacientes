import { createElement } from "react";
import { pdf } from "@react-pdf/renderer";
import { supabase } from "./supabase";
import PatientPDFDocument from "../components/PatientPDF";

async function fetchAllPatients() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No hay sesion activa.");

  const [patientsRes, doctorRes] = await Promise.all([
    supabase
      .from("paciente")
      .select(`
        id, nombre, apellido, segundo_apellido,
        fecha_nacimiento, fecha_registro, genero, telefono, direccion,
        paciente_enfermedad ( enfermedad_cronica (slug) ),
        consulta (
          id, fecha_consulta, hora_consulta,
          diagnostico, observaciones, prescripcion,
          proxima_cita, hora_proxima_cita,
          tipo_consulta (nombre)
        )
      `)
      .eq("id_doctor", user.id)
      .order("apellido"),
    supabase.from("doctor").select("nombre, apellido").eq("id", user.id).single(),
  ]);

  if (patientsRes.error) throw patientsRes.error;

  const doctor = doctorRes.data;
  const doctorName = doctor ? `${doctor.nombre} ${doctor.apellido}` : "";

  return { patients: patientsRes.data, doctorName };
}

function mapPatient(data) {
  return {
    id: data.id,
    name_patient: data.nombre,
    last_name_patient: data.apellido,
    second_last_name_patiente: data.segundo_apellido ?? "",
    birth_date: data.fecha_nacimiento,
    registration_date: data.fecha_registro,
    genero: data.genero,
    telefono: data.telefono,
    direccion: data.direccion,
    conditions: (data.paciente_enfermedad ?? [])
      .map((pe) => pe.enfermedad_cronica?.slug)
      .filter(Boolean),
    consultations: (data.consulta ?? [])
      .sort((a, b) => new Date(b.fecha_consulta) - new Date(a.fecha_consulta))
      .map((c) => ({
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
  };
}

function safeFileName(patient) {
  const name = patient.last_name_patient + "_" + patient.name_patient;
  const clean = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_");
  return "historial_" + clean + ".pdf";
}

export async function createBackup(onProgress) {
  if (!window.showDirectoryPicker) {
    throw new Error(
      "Tu navegador no soporta esta funcion. Usa Google Chrome o Microsoft Edge."
    );
  }

  const dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
  const { patients, doctorName } = await fetchAllPatients();

  if (patients.length === 0) throw new Error("No hay pacientes registrados para respaldar.");

  let completed = 0;
  for (const rawPatient of patients) {
    const patient = mapPatient(rawPatient);
    const blob = await pdf(
      createElement(PatientPDFDocument, { patient, doctorName })
    ).toBlob();

    const fileName = safeFileName(patient);
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();

    completed++;
    onProgress?.(completed, patients.length);
  }

  return patients.length;
}
