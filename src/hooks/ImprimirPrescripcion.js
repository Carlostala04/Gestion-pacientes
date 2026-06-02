export function imprimirPrescripcion({ diagnostic, prescripcion, consultaDate }) {
  const fecha =
    consultaDate ??
    new Date().toLocaleDateString("es-NI", { dateStyle: "full" });

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Prescripción Médica</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1a1a18; padding: 48px; max-width: 680px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 2px solid #3f8d9b; margin-bottom: 28px; }
    .brand { font-size: 22px; font-weight: 700; color: #3f8d9b; }
    .brand-sub { font-size: 12px; color: #888; margin-top: 2px; }
    .date { font-size: 13px; color: #555; text-align: right; }
    .section-title { font-size: 10px; font-weight: 700; color: #3f8d9b; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; }
    .content { font-size: 14px; line-height: 1.6; color: #2d3748; white-space: pre-wrap; }
    .block { margin-bottom: 24px; }
    .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 12px; color: #888; }
    .firma-linea { width: 160px; border-top: 1px solid #555; margin-bottom: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <div><div class="brand">MediRecord</div><div class="brand-sub">Sistema de gestión clínica</div></div>
    <div class="date">${fecha}</div>
  </div>
  ${diagnostic ? `<div class="block"><div class="section-title">Diagnóstico</div><div class="content">${diagnostic}</div></div>` : ""}
  <div class="block"><div class="section-title">Prescripción médica</div><div class="content">${prescripcion}</div></div>
  <div class="footer">
    <div>MediRecord — Gestión Clínica</div>
    <div><div class="firma-linea"></div><div>Dr. Carlos Rodríguez</div><div>Médico General</div></div>
  </div>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(iframe);

  iframe.contentDocument.open();
  iframe.contentDocument.write(html);
  iframe.contentDocument.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  setTimeout(() => document.body.removeChild(iframe), 1000);
}
