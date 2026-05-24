export function formatDateDetail(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-NI", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
