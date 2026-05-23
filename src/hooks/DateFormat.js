export function FormatDate(fecha, date_style) {
  const formatedDate = new Date(fecha).toLocaleDateString("es-NI", {
    dateStyle: date_style,
  });
  return formatedDate;
}
