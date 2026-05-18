# MediRecord — Sistema de Gestión de Clínica

Aplicación web para la gestión integral de pacientes en consultorios médicos. Permite a los profesionales de la salud registrar pacientes, visualizar la agenda diaria y monitorear estadísticas clave desde un panel centralizado.

---

## Descripción

MediRecord es un sistema de administración clínica diseñado para simplificar el flujo de trabajo del médico en su consultorio. Desde el dashboard principal se accede al resumen del día: citas agendadas, pacientes recientes, nuevos registros y métricas mensuales. El formulario de registro captura los datos esenciales del paciente con validación integrada y selectores de fecha y género.

---

## Stack tecnológico

 ![Skills](https://skillicons.dev/icons?i=react,vite,js,css,eslint)

| Categoría | Tecnología |
| --------- | --------- |
| UI Framework | React 19 |
| Routing | React Router DOM 6 |
| Build Tool | Vite 8 |
| Selector de fecha | React Calendar / React DatePicker |
| Optimización | React Compiler (Babel preset) |
| Estilos | CSS Modules (vanilla CSS) |
| Linting | ESLint 9 |

## Funcionalidades principales

- **Dashboard** con tarjetas de indicadores: pacientes del mes, consultas del día, pacientes activos y nuevos registros semanales.
- **Agenda del día** con listado de citas ordenadas por hora, nombre del paciente y tipo de consulta.
- **Pacientes recientes** con estado de seguimiento (Nuevo, Seguimiento, Rutina, Urgente).
- **Registro de pacientes** con formulario que incluye datos personales, fecha de nacimiento, teléfono, dirección y género.
- **Saludo dinámico** con hora actual y fecha, adaptado al momento del día (buenos días / tardes / noches).

---

## A quién está orientado

Este proyecto está dirigido a **médicos y personal administrativo de consultorios o clínicas pequeñas** que necesitan una herramienta sencilla y centralizada para gestionar su cartera de pacientes sin depender de sistemas complejos o costosos.

---

## Objetivo

El objetivo principal de MediRecord es digitalizar y ordenar el proceso de atención médica en consultorios que aún trabajan con registros físicos o herramientas genéricas como hojas de cálculo. La aplicación busca reducir el tiempo administrativo del médico, minimizar errores en el registro de datos y ofrecer una visión clara del estado diario del consultorio desde una interfaz moderna e intuitiva.

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

---

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (Header, Form, Button, DropDown, CardList, InfoCards)
├── pages/          # Vistas principales (Home, Register)
├── hooks/          # Custom hooks (reloj, saludo por hora)
├── styles/         # Estilos CSS por componente
├── constants/      # Paleta de colores centralizada
└── assets/         # Íconos SVG e imágenes
```

---

## Estado del proyecto

> En desarrollo activo. Actualmente utiliza datos de ejemplo (mock data). La integración con backend y base de datos forma parte de las próximas etapas.
