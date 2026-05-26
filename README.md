# MediRecord — Sistema de Gestión de Clínica

Aplicación web para la gestión integral de pacientes en consultorios médicos. Permite a los profesionales de la salud registrar pacientes, llevar historial de consultas, visualizar la agenda diaria y monitorear estadísticas clave desde un panel centralizado.

---

## Stack tecnológico

![Skills](https://skillicons.dev/icons?i=react,vite,js,css,eslint,supabase)

| Categoría | Tecnología |
| --------- | --------- |
| UI Framework | React 19 |
| Routing | React Router DOM 6 |
| Build Tool | Vite |
| Backend / Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth |
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

### Perfil del doctor

- Edición de nombre, apellido y especialidad.
- Cambio de contraseña con indicador de fortaleza.

---

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Button.jsx
│   ├── CardList.jsx
│   ├── DropDown.jsx
│   ├── Form.jsx
│   ├── Header.jsx
│   ├── InfoCards.jsx
│   ├── LoginForm.jsx
│   └── PatientItem.jsx
├── pages/            # Vistas principales
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
├── hooks/            # Custom hooks
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
├── lib/
│   └── supabase.js   # Cliente de Supabase
├── styles/           # CSS por componente y página
└── assets/           # Íconos SVG
```

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Generar build de producción
npm run build
```

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

> En desarrollo activo con integración completa a Supabase como backend y base de datos.
