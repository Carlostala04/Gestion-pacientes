export function calculateYearsAsPatient(registrationDate) {
  const today = new Date();
  const reg = new Date(registrationDate);
  let years = today.getFullYear() - reg.getFullYear();
  const m = today.getMonth() - reg.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < reg.getDate())) years--;
  return years < 1 ? "< 1" : years;
}
