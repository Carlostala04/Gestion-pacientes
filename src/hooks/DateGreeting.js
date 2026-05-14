export function getSaludoPorHora(fecha = new Date()) {
  const hora = fecha.getHours();

  if (hora < 12) return "Buenos días";
  if (hora < 18) return "Buenas tardes";
  return "Buenas noches";
}
