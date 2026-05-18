# MediRecord — Sistema de Gestión de Clínica

Aplicación web para la gestión integral de pacientes en consultorios médicos. Permite a los profesionales de la salud registrar pacientes, visualizar la agenda diaria y monitorear estadísticas clave desde un panel centralizado.

---

## Descripción

MediRecord es un sistema de administración clínica diseñado para simplificar el flujo de trabajo del médico en su consultorio. Desde el dashboard principal se accede al resumen del día: citas agendadas, pacientes recientes, nuevos registros y métricas mensuales. El formulario de registro captura los datos esenciales del paciente con validación integrada y selectores de fecha y género.

---

## Stack tecnológico

<!-- ICONOS DE TECNOLOGÍAS -->
<!-- Reemplaza los iconos de abajo usando uno de los recursos al final de esta sección -->

<!-- Ejemplo con Skill Icons (recomendado) -->
<!-- ![Skills](https://skillicons.dev/icons?i=react,vite,js,css,eslint) -->

<!-- Ejemplo con shields.io (un badge por línea) -->
<!-- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) -->
<!-- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) -->

| Categoría | Tecnología |
| --------- | --------- |
| UI Framework | React 19 |
| Routing | React Router DOM 6 |
| Build Tool | Vite 8 |
| Selector de fecha | React Calendar / React DatePicker |
| Optimización | React Compiler (Babel preset) |
| Estilos | CSS Modules (vanilla CSS) |
| Linting | ESLint 9 |

### Recursos para iconos

Hay dos formas populares de agregar iconos de tecnologías en un README de GitHub:

**Opción 1 — Skill Icons** (más fácil, solo una URL)

Visita [skillicons.dev](https://skillicons.dev) y arma tu URL con los nombres de las tecnologías separados por coma:

```md
![Skills](https://skillicons.dev/icons?i=react,vite,js,css,eslint)
```

Resultado: una fila de iconos coloridos y uniformes. Puedes agregar `&theme=light` o `&theme=dark` y `&perline=5` para controlar cuántos van por fila.

**Opción 2 — Shields.io** (más personalizable, un badge por tecnología)

Visita [shields.io](https://shields.io) o copia el patrón directo:

```md
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
```

Los nombres de los logos (`logo=react`, `logo=vite`, etc.) vienen de [Simple Icons](https://simpleicons.org) — busca ahí el nombre exacto de cualquier tecnología.

**Cómo colocarlos:** elige una opción, copia el bloque de markdown, pégalo en el espacio marcado arriba dentro del bloque `<p align="center">` y elimina los comentarios `<!-- -->`.

---

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
