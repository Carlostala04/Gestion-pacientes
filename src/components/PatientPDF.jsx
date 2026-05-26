import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const CONDITION_LABELS = {
  hipertenso: "Hipertenso/a",
  diabetico: "Diabético/a",
  asmatico: "Asmático/a",
  cardiaco: "Cardíaco/a",
  renal: "Renal crónico/a",
  artritis: "Artritis",
  tiroides: "Tiroides",
  anemico: "Anémico/a",
  alergico: "Alérgico/a",
  otro: "Otro",
};

function calcAge(birth) {
  const today = new Date();
  const b = new Date(birth);
  let age = today.getFullYear() - b.getFullYear();
  if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate())) age--;
  return age;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#222", backgroundColor: "#fff" },

  header: { borderBottom: "2px solid #3b82f6", paddingBottom: 12, marginBottom: 20 },
  headerTitle: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#1e40af" },
  headerSub: { fontSize: 9, color: "#6b7280", marginTop: 2 },

  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 11, fontFamily: "Helvetica-Bold", color: "#1e40af",
    borderBottom: "1px solid #dbeafe", paddingBottom: 4, marginBottom: 8,
  },

  infoGrid: { flexDirection: "row", flexWrap: "wrap" },
  infoItem: { width: "50%", marginBottom: 8, paddingRight: 8 },
  infoLabel: { fontFamily: "Helvetica-Bold", color: "#6b7280", fontSize: 8 },
  infoValue: { color: "#111827", fontSize: 10, marginTop: 2 },

  conditionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  conditionBadge: {
    backgroundColor: "#eff6ff", border: "1px solid #bfdbfe",
    borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8,
    fontSize: 9, color: "#1e40af", marginRight: 6, marginBottom: 4,
  },
  noConditions: { fontSize: 9, color: "#9ca3af" },

  consultCard: {
    backgroundColor: "#f9fafb", border: "1px solid #e5e7eb",
    borderRadius: 6, padding: 12, marginBottom: 10,
  },
  consultHeader: {
    flexDirection: "row", justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb", paddingBottom: 6, marginBottom: 8,
  },
  consultDate: { fontFamily: "Helvetica-Bold", fontSize: 10, color: "#1e40af" },
  consultType: {
    fontSize: 9, color: "#6b7280", backgroundColor: "#e5e7eb",
    borderRadius: 8, paddingVertical: 2, paddingHorizontal: 7,
  },
  fieldLabel: {
    fontFamily: "Helvetica-Bold", fontSize: 8, color: "#6b7280",
    marginTop: 6, marginBottom: 2,
  },
  fieldValue: { fontSize: 9, color: "#374151", lineHeight: 1.5 },

  nextAppt: {
    backgroundColor: "#ecfdf5", border: "1px solid #a7f3d0",
    borderRadius: 4, padding: 6, marginTop: 8,
  },
  nextApptText: { fontSize: 9, color: "#065f46" },

  noConsults: { fontSize: 9, color: "#9ca3af", textAlign: "center", paddingVertical: 16 },

  footer: {
    position: "absolute", bottom: 24, left: 40, right: 40,
    flexDirection: "row", justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb", paddingTop: 8,
  },
  footerText: { fontSize: 8, color: "#9ca3af" },
});

export default function PatientPDFDocument({ patient, doctorName }) {
  const fullName = [patient.name_patient, patient.last_name_patient, patient.second_last_name_patiente]
    .filter(Boolean).join(" ");
  const age = patient.birth_date ? calcAge(patient.birth_date) : null;
  const today = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerTitle}>MediRecord</Text>
          <Text style={s.headerSub}>
            Historial clínico — Generado el {today}
            {doctorName ? `  |  Dr. ${doctorName}` : ""}
          </Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Datos del paciente</Text>
          <View style={s.infoGrid}>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>NOMBRE COMPLETO</Text>
              <Text style={s.infoValue}>{fullName}</Text>
            </View>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>FECHA DE NACIMIENTO</Text>
              <Text style={s.infoValue}>
                {formatDate(patient.birth_date)}{age !== null ? `  (${age} años)` : ""}
              </Text>
            </View>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>GÉNERO</Text>
              <Text style={s.infoValue}>{patient.genero ?? "—"}</Text>
            </View>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>TELÉFONO</Text>
              <Text style={s.infoValue}>{patient.telefono ?? "—"}</Text>
            </View>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>DIRECCIÓN</Text>
              <Text style={s.infoValue}>{patient.direccion ?? "—"}</Text>
            </View>
            <View style={s.infoItem}>
              <Text style={s.infoLabel}>FECHA DE REGISTRO</Text>
              <Text style={s.infoValue}>{formatDate(patient.registration_date)}</Text>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Condiciones crónicas</Text>
          {patient.conditions.length > 0 ? (
            <View style={s.conditionsRow}>
              {patient.conditions.map((slug) => (
                <Text key={slug} style={s.conditionBadge}>{CONDITION_LABELS[slug] ?? slug}</Text>
              ))}
            </View>
          ) : (
            <Text style={s.noConditions}>Sin condiciones crónicas registradas</Text>
          )}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>
            Historial de consultas ({patient.consultations.length})
          </Text>
          {patient.consultations.length === 0 ? (
            <Text style={s.noConsults}>Sin consultas registradas</Text>
          ) : (
            patient.consultations.map((c) => (
              <View key={c.id} style={s.consultCard} wrap={false}>
                <View style={s.consultHeader}>
                  <Text style={s.consultDate}>
                    {formatDate(c.date)}{c.time ? `   ${c.time} hrs` : ""}
                  </Text>
                  <Text style={s.consultType}>{c.type || "Consulta"}</Text>
                </View>

                <Text style={s.fieldLabel}>DIAGNÓSTICO</Text>
                <Text style={s.fieldValue}>{c.diagnosis || "—"}</Text>

                {c.observations ? (
                  <>
                    <Text style={s.fieldLabel}>OBSERVACIONES</Text>
                    <Text style={s.fieldValue}>{c.observations}</Text>
                  </>
                ) : null}

                {c.prescripcion ? (
                  <>
                    <Text style={s.fieldLabel}>PRESCRIPCIÓN</Text>
                    <Text style={s.fieldValue}>{c.prescripcion}</Text>
                  </>
                ) : null}

                {c.nextDate ? (
                  <View style={s.nextAppt}>
                    <Text style={s.nextApptText}>
                      Próxima cita: {formatDate(c.nextDate)}
                      {c.nextTime ? `  a las ${c.nextTime} hrs` : ""}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))
          )}
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>MediRecord — {fullName}</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          } />
        </View>
      </Page>
    </Document>
  );
}
