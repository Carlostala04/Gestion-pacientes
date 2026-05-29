# MediRecord — Sistema de Gestión de Clínica 
<p align="center">
  <img src="/public/icon.ico" width="400" alt="Descripción de la imagen">
</p>

Aplicación de **escritorio** para la gestión integral de pacientes en consultorios médicos. Permite a los profesionales de la salud registrar pacientes, llevar historial de consultas, visualizar la agenda diaria, exportar expedientes en PDF y monitorear estadísticas clave desde un panel centralizado.

---

## Stack tecnológico

![Skills](https://skillicons.dev/icons?i=react,vite,js,ts,css,supabase,electron)

| Categoría | Tecnología |
| --------- | --------- |
| UI Framework | React 19 |
| Routing | React Router DOM 6 |
| Build Tool | Vite 8 (Rolldown) |
| Backend / Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
| Desktop | Electron 42 + electron-builder |
| Generación de PDF | @react-pdf/renderer |
| Selector de fecha | React Calendar / React DatePicker |
| Optimización | React Compiler (Babel preset) |
| Estilos | CSS vanilla con variables globales |
| Linting | ESLint 9 |

---

## Funcionalidades

### Dashboard

- Tarjetas de indicadores: pacientes del mes, consultas del día, pacientes activos y nuevos registros semanales.
- Agenda del día con citas ordenadas por hora, nombre del paciente y tipo de consulta.
- Pacientes recientes con fecha relativa de última visita (Hoy, Ayer, Hace X días).
- Saludo dinámico con hora actual y fecha adaptada al momento del día.

### Autenticación

- Registro de doctor con nombre, apellido y especialidad.
- Inicio de sesión con email y contraseña.
- Recuperación de contraseña por email.
- Sesión protegida con rutas públicas y privadas.

### Gestión de pacientes

- Registro de pacientes con datos personales, fecha de nacimiento, teléfono, dirección, género y condición crónica.
- Listado completo con búsqueda por nombre y filtros (recientes, A-Z, Z-A, antiguos).
- Perfil del paciente con edad calculada, años como paciente y tags de condiciones crónicas.

### Historial de consultas

- Registro de nuevas consultas con diagnóstico, observaciones, prescripción, tipo de consulta y próxima cita.
- Timeline cronológico por paciente con diagnóstico, observaciones, prescripción y próxima cita agendada.
- Edición de consultas existentes.
- Impresión de prescripciones en formato clínico.

### Exportación de expedientes en PDF

- Generación de expediente completo del paciente en formato PDF clínico.
- Incluye datos personales, condiciones crónicas, historial de consultas y prescripciones.
- Descarga directa desde el perfil del paciente.

### Backup y exportación de datos

- Modal de backup para exportar datos del consultorio.
- Exportación en formato PDF lista para archivar o imprimir.

### Perfil del doctor

- Edición de nombre, apellido y especialidad.
- Cambio de contraseña con indicador de fortaleza.

---

## Aplicación de escritorio (Electron)

MediRecord corre como aplicación nativa de Windows gracias a Electron 42.

- Ventana optimizada: 1280×800 (mínimo 960×600).
- Barra de menú oculta para una interfaz limpia.
- Instalador NSIS con directorio de instalación personalizable.
- Icono de aplicación incluido (`public/icon.ico`).

---

## Estructura del proyecto

```text
src/
├── components/           # Componentes reutilizables
│   ├── BackupModal.jsx   # Modal de backup y exportación
│   ├── Button.jsx
│   ├── CardList.jsx
│   ├── DropDown.jsx
│   ├── Form.jsx
│   ├── Header.jsx
│   ├── InfoCards.jsx
│   ├── PatientItem.jsx
│   └── PatientPDF.jsx    # Generador de expediente PDF
├── pages/                # Vistas principales
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Record.jsx
│   ├── PatientDeatils.jsx
│   ├── RegisterConsulta.jsx
│   ├── EditPatient.jsx
│   ├── EditConsulta.jsx
│   ├── ForgotPassword.jsx
│   └── User.jsx
├── hooks/                # Custom hooks
│   ├── home/
│   │   ├── useAgendaHoy.js
│   │   ├── usePacientesRecientes.js
│   │   └── useStatsHome.js
│   ├── useDoctor.js
│   ├── usePacientes.js
│   ├── usePacienteDetalle.js
│   ├── CalculateAge.js
│   ├── CalculateYearsAsPatient.js
│   ├── DateFormat.js
│   ├── DateGreeting.js
│   ├── FormatDateDetail.js
│   ├── ImprimirPrescripcion.js
│   └── Reloj.js
├── constants/
│   └── Colors.ts         # Sistema de colores de la app
├── lib/
│   ├── backup.js         # Lógica de backup y exportación PDF
│   └── supabase.js       # Cliente de Supabase
├── styles/               # CSS por componente y página
└── assets/               # Íconos SVG y recursos visuales
electron/
└── main.js               # Proceso principal de Electron
```

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (web)
npm run dev

# Iniciar app en modo escritorio (Electron + Vite)
npm run electron:dev

# Generar build de producción (instalador Windows)
npm run electron:build

# Generar build web
npm run build
```

El instalador se genera en la carpeta `release/`.

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

> Usa la **anon key** (no la service_role key) para mantener las políticas de seguridad RLS activas.

---

## A quién está orientado

Médicos y personal administrativo de consultorios o clínicas pequeñas que necesitan una herramienta sencilla y centralizada para gestionar su cartera de pacientes sin depender de sistemas complejos o costosos.

---

## Estado del proyecto

> En desarrollo activo con integración completa a Supabase como backend y base de datos, y distribución como aplicación de escritorio nativa para Windows.
